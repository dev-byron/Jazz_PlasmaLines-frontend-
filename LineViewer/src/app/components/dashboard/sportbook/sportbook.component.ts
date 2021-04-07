import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PlasmaLineConfig } from '../../../models/plasma-line.model';
import { PlasmaSection } from '../../../models/plasma-section.model';
import { Room } from '../../../models/rooms.model';
import { Schedule } from '../../../models/schedule.model';
import { SportbookSection } from '../../../models/sportbook-section.model';
import { ConfigurationService } from '../../../services/component/configuration.service';
import { SocketService } from '../../../services/sockets/socket.service';
import { EventAggregator } from '../../../services/utils/event-aggregator';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewConfig } from '../../../models/view-config.model';
import { ViewTypeEnum } from '../../../models/viewType.enum';
import { LineTypeEnum } from '../../../models/lineType.enum';
import { interval } from 'rxjs';
import { Game } from '../../../models/game.model';
import { Advertising } from '../../../models/advertising.model';

@Component({
  selector: 'ngx-sportbook',
  templateUrl: './sportbook.component.html',
  styleUrls: ['./sportbook.component.scss']
})
export class SportBookComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  code: string;

  @ViewChild('content') loadingInfoModal: NgbModalRef;
  modalReference = null;
  stopAutoScroll: boolean;

  sections = [];
  plasmaLineConfig: PlasmaLineConfig;
  viewConfig: ViewConfig = {
    viewType: ViewTypeEnum.Horizontal,
    lineType: LineTypeEnum.Decimal,
    theme: 'd'
  } as ViewConfig;

  viewTypeEnum = ViewTypeEnum;
  advertisingImages: Advertising[];
  advertisingEvery: number;
  rooms: Room[];
  sportbookSections: SportbookSection[];
  loadingData: boolean;
  deletedFirst = false;
  counter = 0;
  timeZoneId: number;
  displayNoSectionError: boolean;

  sectionOnDisplay: SportbookSection = null;
  scheduleOnDisplay: Schedule = null;
  schedulesOnDisplay: Schedule[] = null;
  gamesOnDisplay: Game[] = [];

  // necesito dos arreglos diferentes, uno para vizualizar la vara y otro que es es socket que va a actualizar lo que esta en pantalla si es necesario
  constructor(private eventAggregator: EventAggregator,
    private socketService: SocketService,
    private configurationService: ConfigurationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.sportbookSections = [];
    this.stopAutoScroll = false;
  }

  ngAfterViewInit() {
    this.openLoadingModal();
    this.initLinesConfiguration();
  }

  ngOnDestroy(): void {
    this.unsubscribeRooms();
  }

  setupdateSectionInterval() {
    let jumpToNewSection = true;
    let allGames: Game[] = [];
    let diplayingGames: Game[] = [];
    let sectionIndex = 0;
    let lastGameIndex = 0; 
    
    interval(this.plasmaLineConfig.screenTime * 1000).subscribe(() => {
      const containerHeight = window.innerHeight - 170;
      let availableSpace = containerHeight;
      if (this.plasmaLineConfig && this.sportbookSections && this.sportbookSections.length > 0) {
        if (jumpToNewSection) {
          this.sectionOnDisplay = { ...this.sportbookSections[sectionIndex] };
          this.sectionOnDisplay.schedules = this.sectionOnDisplay.schedules.filter(x => x.games.length > 0);
          if (this.sectionOnDisplay.schedules && this.sectionOnDisplay.schedules.length > 0) {
            allGames = this.sectionOnDisplay.schedules.map(x => x.games)
            .reduce(function (pre, cur) {
              return pre.concat(cur);
            })
            .map((e) => e);
            sectionIndex = sectionIndex < this.sportbookSections.length - 1 ? sectionIndex + 1 : 0;
            lastGameIndex = 0;
            lastGameId = allGames[0].id;
            jumpToNewSection = false;
            }
        }
        var breakLoop = false;
        var gamesToDisplay = 0;
        var scheduleId = 0;
        var counter = lastGameIndex;
        do {
          var game = allGames[counter];
          if (game) {
            var lastGameId = game.id;
            var schedule = this.sectionOnDisplay.schedules.find(x => x.games.find(y => y.id == lastGameId));
            if (schedule) {
              if ((scheduleId !== schedule.id))  {
                scheduleId = schedule.id;
                availableSpace = availableSpace - 80;
              }
            }
          }
          else {
            breakLoop = true;
          }
          
          if (availableSpace < 0) {
            breakLoop = true;
          } 
  
          if (!breakLoop) {
            availableSpace = availableSpace - (allGames[counter].participants.length * 35.1);
            if (availableSpace > 0) {
              gamesToDisplay++;
              counter++;
            } else {
                breakLoop = true;
            }
          }
        } while (!breakLoop);
        
        diplayingGames = allGames.slice(lastGameIndex, (lastGameIndex + gamesToDisplay));
        lastGameIndex = (lastGameIndex + gamesToDisplay);
        
        const schedules = [...this.sectionOnDisplay.schedules];
        this.schedulesOnDisplay = schedules.map(function(schedule, index) {
          let scheduleCopy = {...schedule};
          scheduleCopy.games = schedule.games.filter(x => diplayingGames.find(y => y.id == x.id));
          return scheduleCopy.games.length > 0 ? scheduleCopy : null;    
        }).filter(x => x != null);
  
        if (lastGameIndex + 1 >= allGames.length) {
          jumpToNewSection = true;
        }
  
        this.closeLoadingModal();
      };
    });
  }

  stopScroll($event) {
    this.stopAutoScroll = !this.stopAutoScroll;
  }

  displaySection(section: SportbookSection) {
    return section && section.schedules && section.schedules.length > 0;
  }

  private unsubscribeRooms() {
    if (this.rooms && this.rooms.length > 0) {
      this.socketService.closeSocketConnection(this.rooms);
    }
  }

  private initLinesConfiguration() {
    if (this.code) {
      this.configurationService.getByCode(this.code).subscribe(plasmaLineConfig => {
        if (plasmaLineConfig) {
          this.plasmaLineConfig = plasmaLineConfig;
          this.configurationService.getInitialSchedules(this.code).subscribe(() => {});
          this.configureView(this.plasmaLineConfig);
          this.getAdvertisingImages(this.plasmaLineConfig);
          this.setSubscribers(this.plasmaLineConfig);
          this.setupdateSectionInterval();
        }
      });
      this.eventAggregator.featuredSchedules.subscribe(featuredSchedule => {
        if (featuredSchedule && this.plasmaLineConfig) {
          this.filterSportbookSections(featuredSchedule.schedules, this.plasmaLineConfig.sections, this.plasmaLineConfig.showOnlyNextEvents);
        }
      });
    }
  }

  private setSubscribers(plasmaLineConfig: PlasmaLineConfig) {
    if (plasmaLineConfig) {
      this.configureSocketRooms(this.plasmaLineConfig);
    }
  }

  private getAdvertisingImages(plasmaLineConfig: PlasmaLineConfig) {
    this.advertisingImages = [];
    this.advertisingImages = plasmaLineConfig.advertisings;
    this.advertisingEvery = plasmaLineConfig.advertisingLapseTime;
  }

  private configureSocketRooms(plasmaLineConfig: PlasmaLineConfig) {
    if (plasmaLineConfig) {
      this.rooms = this.getRoomsFromLineConfig(plasmaLineConfig);
      if (this.rooms.length > 0) {
        this.unsubscribeRooms();
        this.socketService.setupSocketRooms(this.rooms);
      }
    }
  }

  private filterSportbookSections(allSchedules: Schedule[], subscribedSections: PlasmaSection[], showOnlyNextEvents: boolean) {
    if (subscribedSections) {
      subscribedSections.forEach(subscribedSection => {
        subscribedSection.events.forEach(subscribedEvent => {
          const section = {
            sport: subscribedEvent.sport,
            division: subscribedEvent.division,
            bannerUrl: subscribedSection.bannerUrl,
            schedules: []
          } as SportbookSection;
       
          if (allSchedules) {
            if (showOnlyNextEvents) {
              section.schedules = section.schedules.concat(allSchedules);
            } else {
              subscribedEvent.titles.forEach(subscribedTitle => {
             
                var schedules = allSchedules.find(x => x.sport == section.sport && x.division == section.division && x.title == subscribedTitle);
                if (schedules) {
                  section.schedules.push(schedules);
                }
              });
            }
          }
          if (showOnlyNextEvents && section.schedules.length == 0) {
            this.displayNoSectionError = true;
          } else {
            this.displayNoSectionError = false;
          }

          if (section.schedules.length > 0 || showOnlyNextEvents) {
            if (!this.sportbookSections.find(x => x.sport == section.sport && x.division == section.division)) {
              this.sportbookSections.push(section);
            }
            else {
              const sportbookSection = this.sportbookSections.find(x => x.sport == section.sport && x.division == section.division);
                sportbookSection.schedules = section.schedules;
            }
          } 
        });
      });
    }
  }


  private getRoomsFromLineConfig(plasmaLineConfig: PlasmaLineConfig) {
    const newRooms: Room[] = [];
    if (plasmaLineConfig && plasmaLineConfig.sections) {
      plasmaLineConfig.sections.forEach(section => {
        section.events.forEach(event => {
          const room = {
            name: event.sport + ':' + event.division
          }
          newRooms.push(room);
        });
      });
    }
    return newRooms;
  }

  openLoadingModal() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalReference = this.modalService.open(this.loadingInfoModal, ngbModalOptions);
  }

  closeLoadingModal() {
    if (this.modalReference) {
      this.modalReference.close();
    }
  }

  private configureView(plasmaLineConfig: PlasmaLineConfig) {
    this.viewConfig = {
      viewType: (plasmaLineConfig.viewType == 'v' ? ViewTypeEnum.Vertical : ViewTypeEnum.Horizontal),
      lineType: (plasmaLineConfig.lineType == 'a' ? LineTypeEnum.American : LineTypeEnum.Decimal),
      theme: plasmaLineConfig.viewTheme,
      timeZoneId: plasmaLineConfig.time
    } as ViewConfig;

    if (plasmaLineConfig.viewTheme == 'd') {
      document.body.style.background = '#191919';
    } else {
      document.body.style.background = '#D8D9DD';
    }
  }

}


  // checkSectionOnDisplay() {
  //   let gamesToDisplay = 8;
  //   let paginationNumber = 0;
  //   let jumpToNewSection = true;
  //   let allGames: Game[] = [];
  //   let diplayingGames: Game[] = [];
  //   let sectionIndex = 0;

  //   interval(this.plasmaLineConfig.screenTime * 1000).subscribe(() => {
  //     if (this.plasmaLineConfig && this.sportbookSections && this.sportbookSections.length > 0) {
  //       if (jumpToNewSection) {
  //         this.sectionOnDisplay = { ...this.sportbookSections[sectionIndex] };
  //         this.sectionOnDisplay.schedules = this.sectionOnDisplay.schedules.filter(x => x.games.length > 0);
  //         jumpToNewSection = false;
  //         allGames = this.sectionOnDisplay.schedules.map(x => x.games)
  //           .reduce(function (pre, cur) {
  //             return pre.concat(cur);
  //           })
  //           .map((e) => e);

  //           sectionIndex = sectionIndex < this.sportbookSections.length - 1 ? sectionIndex + 1 : 0;
  //       }

  //       const paginationIndex: number = ((paginationNumber) * gamesToDisplay);
  //       diplayingGames = allGames.slice(paginationIndex, (paginationIndex + gamesToDisplay));

  //       const schedules = [...this.sectionOnDisplay.schedules];
  //       this.schedulesOnDisplay = schedules.map(function(schedule, index) {
  //         let scheduleCopy = {...schedule};
  //         scheduleCopy.games = schedule.games.filter(x => diplayingGames.find(y => y.id == x.id));
  //         return scheduleCopy.games.length > 0 ? scheduleCopy : null;    
  //       }).filter(x => x != null);


  //       if ((paginationIndex + gamesToDisplay) <= allGames.length) {
  //         paginationNumber++;
  //       }
  //       else {
  //         paginationNumber = 0;
  //         jumpToNewSection = true;
  //       }
  //     };
  //   });
    

  //   setTimeout(() => {
  //     this.closeLoadingModal();
  //   }, this.plasmaLineConfig.screenTime * 1000);
  // }