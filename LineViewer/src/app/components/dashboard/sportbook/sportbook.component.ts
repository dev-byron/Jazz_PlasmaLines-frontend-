import { Component, OnInit } from '@angular/core';
import { PlasmaLine } from '../../../models/plasma-line.model';
import { PlasmaSection } from '../../../models/plasma-section.model';
import { Room } from '../../../models/rooms.model';
import { Schedule } from '../../../models/schedule.model';
import { SportbookSection } from '../../../models/sportbook-section.model';
import { PlasmaLineConfigurationService } from '../../../services/component/plasma-line-configuration.service';
import { SocketService } from '../../../services/sockets/socket.service';
import { EventAggregator } from '../../../services/utils/event-aggregator';

@Component({
  selector: 'ngx-sportbook',
  templateUrl: './sportbook.component.html',
  styleUrls: ['./sportbook.component.scss']
})
export class SportBookComponent implements OnInit {
  sections = [];
  plasmaLine: PlasmaLine;
  rooms: Room[];
  sportbookSections: SportbookSection[];


  loadingData: boolean;

  constructor(private eventAggregator: EventAggregator,
    private socketService: SocketService,
    private plasmaLineConfigurationService: PlasmaLineConfigurationService) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.sportbookSections = [];

    this.setSubscribers();
  }

  ngOnDestroy(): void {
    if (this.rooms.length > 0) {
      this.socketService.closeSocketConnection(this.rooms);
    }
  }

  private setSubscribers() {
    this.plasmaLineConfigurationService.getByCode("AH65RS").subscribe(plasmaLineConfig => {
      if (plasmaLineConfig) { 
        this.plasmaLine = plasmaLineConfig;
        this.configureSocketRooms(this.plasmaLine);
      }
    });

    this.eventAggregator.featuredSchedules.subscribe(featuredSchedule => {
      if (featuredSchedule != null) {
        console.log(featuredSchedule);
        this.filterSportbookSections(featuredSchedule.schedules, this.plasmaLine.sections);
      }
    });
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
    if (allSchedules && subscribedSections) {
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
          console.log(section);
          console.log('section');
        });
      });
    }
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

}
