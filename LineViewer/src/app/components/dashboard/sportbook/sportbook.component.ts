import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PlasmaLine } from '../../../models/plasma-line.model';
import { PlasmaSection } from '../../../models/plasma-section.model';
import { Room } from '../../../models/rooms.model';
import { Schedule } from '../../../models/schedule.model';
import { SportbookSection } from '../../../models/sportbook-section.model';
import { ConfigurationService } from '../../../services/component/configuration.service';
import { SocketService } from '../../../services/sockets/socket.service';
import { EventAggregator } from '../../../services/utils/event-aggregator';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-sportbook',
  templateUrl: './sportbook.component.html',
  styleUrls: ['./sportbook.component.scss']
})
export class SportBookComponent implements OnInit, AfterViewInit {
  @Input()
  code: string;

  @ViewChild('content') loadingInfoModal: NgbModalRef;
  modalReference = null;    

  sections = [];
  plasmaLine: PlasmaLine;
  rooms: Room[];
  sportbookSections: SportbookSection[];
  lastPushed: number = 0;
  loadingData: boolean;


  constructor(private eventAggregator: EventAggregator,
    private socketService: SocketService,
    private configurationService: ConfigurationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.sportbookSections = [];
  }

  ngAfterViewInit() {
    this.openLoadingModal();
    this.setSubscribers();
  }

  ngOnDestroy(): void {
    if (this.rooms && this.rooms.length > 0) {
      this.socketService.closeSocketConnection(this.rooms);
    }
  }

  push($event) {
    if (this.sportbookSections.length > 0) {
      const sportbookSection: SportbookSection = this.sportbookSections[this.lastPushed];
      this.sportbookSections.push(sportbookSection);
      this.lastPushed += 1;
    }
  }
  
  pop($event) {
    console.log('pop');
  }

  private setSubscribers() {
    if (this.code) {
      this.configurationService.getByCode(this.code).subscribe(plasmaLineConfig => {
        if (plasmaLineConfig) { 
          this.plasmaLine = plasmaLineConfig;
          this.configureSocketRooms(this.plasmaLine);
        }
      });
  
      this.eventAggregator.featuredSchedules.subscribe(featuredSchedule => {
        if (featuredSchedule != null && this.plasmaLine) {
          this.filterSportbookSections(featuredSchedule.schedules, this.plasmaLine.sections);
        }
      });
    }
  }

  private configureSocketRooms(plasmaLineConfig: PlasmaLine) {
    if (plasmaLineConfig) {
      this.rooms = this.getRoomsFromLineConfig(plasmaLineConfig);
      if (this.rooms.length > 0) {
        this.socketService.setupSocketRooms(this.rooms);
      }
    }
  }

  private filterSportbookSections(allSchedules: Schedule[], subscribedSections: PlasmaSection[]) {
    if (allSchedules && subscribedSections && this.sportbookSections.length == 0) {
      subscribedSections.forEach(subscribedSection => {
        subscribedSection.events.forEach(subscribedEvent => {
          const section = {
            sport: subscribedEvent.sport,
            division: subscribedEvent.division,
            schedules: []
          } as SportbookSection;
          subscribedEvent.titles.forEach(subscribedTitle => {
            section.schedules.push(allSchedules.find(x => x.sport == section.sport && x.division == section.division && x.title == subscribedTitle));
          });
          this.sportbookSections.push(section);
        });
      });
    }
    this.closeLoadingModal();
  }

  private getRoomsFromLineConfig(plasmaLineConfig: PlasmaLine) {
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
    this.modalReference = this.modalService.open(this.loadingInfoModal);
  }

  closeLoadingModal() {
    if (this.modalReference) {
      this.modalReference.close();
    }
   }


}
