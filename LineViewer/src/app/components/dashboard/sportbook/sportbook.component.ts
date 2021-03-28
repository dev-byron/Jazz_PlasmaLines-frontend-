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
    // console.log(window.innerHeight);
    // console.log(window.innerHeight - 130);
    this.loadingData = true;
    this.sportbookSections = [];
    this.stopAutoScroll = false;
  }

  ngAfterViewInit() {
    this.openLoadingModal();
    this.setSubscribers();
  }

  ngOnDestroy(): void {
    this.unsubscribeRooms();
  }

  checkSectionOnDisplay() {
    let gamesToDisplay = 8;
    let paginationNumber = 0;
    let jumpToNewSection = true;
    let allGames: Game[] = [];
    let diplayingGames: Game[] = [];
    let sectionIndex = 0;

    interval(this.plasmaLineConfig.screenTime * 1000).subscribe(() => {
      if (this.plasmaLineConfig && this.sportbookSections && this.sportbookSections.length > 0) {
        if (jumpToNewSection) {
          this.sectionOnDisplay = { ...this.sportbookSections[sectionIndex] };
          this.sectionOnDisplay.schedules = this.sectionOnDisplay.schedules.filter(x => x.games.length > 0);
          jumpToNewSection = false;
          allGames = this.sectionOnDisplay.schedules.map(x => x.games)
            .reduce(function (pre, cur) {
              return pre.concat(cur);
            })
            .map((e) => e);

            sectionIndex = sectionIndex < this.sportbookSections.length - 1 ? sectionIndex + 1 : 0;
        }

        const paginationIndex: number = ((paginationNumber) * gamesToDisplay);
        diplayingGames = allGames.slice(paginationIndex, (paginationIndex + gamesToDisplay));

        const schedules = [...this.sectionOnDisplay.schedules];
        this.schedulesOnDisplay = schedules.map(function(schedule, index) {
          let scheduleCopy = {...schedule};
          scheduleCopy.games = schedule.games.filter(x => diplayingGames.find(y => y.id == x.id));
          return scheduleCopy.games.length > 0 ? scheduleCopy : null;    
        }).filter(x => x != null);


        if ((paginationIndex + gamesToDisplay) <= allGames.length) {
          paginationNumber++;
        }
        else {
          paginationNumber = 0;
          jumpToNewSection = true;
        }
      };
    });
    

    setTimeout(() => {
      this.closeLoadingModal();
    }, this.plasmaLineConfig.screenTime * 1000);
  }


  checkSectionOnDisplayTest() {
    let gamesToDisplay = 8;
    let paginationNumber = 0;
    let jumpToNewSection = true;
    let allGames: Game[] = [];
    let diplayingGames: Game[] = [];
    let sectionIndex = 0;

    interval(this.plasmaLineConfig.screenTime * 1000).subscribe(() => {
      if (this.plasmaLineConfig && this.sportbookSections && this.sportbookSections.length > 0) {
        if (jumpToNewSection) {
          this.sectionOnDisplay = { ...this.sportbookSections[sectionIndex] };
          this.sectionOnDisplay.schedules = this.sectionOnDisplay.schedules.filter(x => x.games.length > 0);
          jumpToNewSection = false;
          allGames = this.sectionOnDisplay.schedules.map(x => x.games)
            .reduce(function (pre, cur) {
              return pre.concat(cur);
            })
            .map((e) => e);
            sectionIndex = sectionIndex < this.sportbookSections.length - 1 ? sectionIndex + 1 : 0;
        }

        const paginationIndex: number = ((paginationNumber) * gamesToDisplay);
        diplayingGames = allGames.slice(paginationIndex, (paginationIndex + gamesToDisplay));

        const schedules = [...this.sectionOnDisplay.schedules];
        this.schedulesOnDisplay = schedules.map(function(schedule, index) {
          let scheduleCopy = {...schedule};
          scheduleCopy.games = schedule.games.filter(x => diplayingGames.find(y => y.id == x.id));
          return scheduleCopy.games.length > 0 ? scheduleCopy : null;    
        }).filter(x => x != null);


        if ((paginationIndex + gamesToDisplay) <= allGames.length) {
          paginationNumber++;
        }
        else {
          paginationNumber = 0;
          jumpToNewSection = true;
        }
      };
    });
    

    setTimeout(() => {
      this.closeLoadingModal();
    }, this.plasmaLineConfig.screenTime * 1000);
  }

  getScheduleType(section: Schedule) {
    if (section.title.toLowerCase().includes("futures") || section.title.toLowerCase().includes("odds to win")) {
      return 1;
    }
    else if (section.title.toLowerCase().includes("team totals")) {
      return 2;
    }
    else if(section.sport.toLowerCase().includes("soc")) {
      return 3;
    }
    else {
      return 4;
    }
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

  private setSubscribers() {
    if (this.code) {
      this.configurationService.getByCode(this.code).subscribe(plasmaLineConfig => {
        if (plasmaLineConfig) {
          this.plasmaLineConfig = plasmaLineConfig;
          this.configureView(this.plasmaLineConfig);
          this.getAdvertisingImages(this.plasmaLineConfig);
          this.checkSectionOnDisplay();
          this.configureSocketRooms(this.plasmaLineConfig);
        }
      });

      this.eventAggregator.featuredSchedules.subscribe(featuredSchedule => {
        if (featuredSchedule != null && this.plasmaLineConfig) {
          this.filterSportbookSections(featuredSchedule.schedules, this.plasmaLineConfig.sections);
        }
      });
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

  private filterSportbookSections(allSchedules: Schedule[], subscribedSections: PlasmaSection[]) {
    if (allSchedules && subscribedSections) {
      subscribedSections.forEach(subscribedSection => {
        subscribedSection.events.forEach(subscribedEvent => {
          const section = {
            sport: subscribedEvent.sport,
            division: subscribedEvent.division,
            bannerUrl: subscribedSection.bannerUrl,
            schedules: []
          } as SportbookSection;
          subscribedEvent.titles.forEach(subscribedTitle => {
            var schedules = allSchedules.find(x => x.sport == section.sport && x.division == section.division && x.title == subscribedTitle);
            if (schedules) {
              section.schedules.push(schedules);
            }
          });
          if (!this.sportbookSections.find(x => x.sport == section.sport && x.division == section.division)) {
            this.sportbookSections.push(section);
          }
          else {
            const sportbookSection = this.sportbookSections.find(x => x.sport == section.sport && x.division == section.division);
            if (sportbookSection.schedules.length == 0) {
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
