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

  sections = [];
  plasmaLineConfig: PlasmaLineConfig;
  viewConfig: ViewConfig = {
    viewType: ViewTypeEnum.Horizontal,
    lineType: LineTypeEnum.Decimal
  } as ViewConfig;

  viewTypeEnum = ViewTypeEnum;

  rooms: Room[];
  sportbookSections: SportbookSection[];
  loadingData: boolean;
  deletedFirst = false;
  counter = 0;

  // necesito dos arreglos diferentes, uno para vizualizar la vara y otro que es es socket que va a actualizar lo que esta en pantalla si es necesario
  constructor(private eventAggregator: EventAggregator,
    private socketService: SocketService,
    private configurationService: ConfigurationService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadingData = true;
    this.sportbookSections = [];
  }

  ngAfterViewInit() {
    this.openLoadingModal();
    this.setSubscribers();
  }

  ngOnDestroy(): void {
    this.unsubscribeRooms();
  }

  push($event) {
    if (this.sportbookSections.length > 0) {
      const sportbookSection: SportbookSection = this.sportbookSections[this.counter];
      this.sportbookSections.push(sportbookSection);
      this.counter++;
    }
  }

  pop($event) {
    //this.sportbookSections.shift();
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
          this.configureSocketRooms(this.plasmaLineConfig);
          this.configureView(this.plasmaLineConfig);
        }
      });

      this.eventAggregator.featuredSchedules.subscribe(featuredSchedule => {
        if (featuredSchedule != null && this.plasmaLineConfig) {
          this.filterSportbookSections(featuredSchedule.schedules, this.plasmaLineConfig.sections);
        }
      });
    }
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

  private configureView(plasmaLineConfig: PlasmaLineConfig) {
    this.viewConfig = {
      viewType: (plasmaLineConfig.viewType == 'v' ? ViewTypeEnum.Vertical : ViewTypeEnum.Horizontal),
      lineType: (plasmaLineConfig.lineType == 'a' ? LineTypeEnum.American : LineTypeEnum.Decimal),
      time: plasmaLineConfig.time
    } as ViewConfig;
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
              if(sportbookSection.schedules.length == 0) {
                sportbookSection.schedules = section.schedules;
              }
           }
        });
      });
    }
    this.closeLoadingModal();
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
      backdrop : 'static',
      keyboard : false
};
    this.modalReference = this.modalService.open(this.loadingInfoModal, ngbModalOptions);
  }

  closeLoadingModal() {
    if (this.modalReference) {
      this.modalReference.close();
    }
  }

}
