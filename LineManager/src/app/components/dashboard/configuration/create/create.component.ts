import { Component, OnInit } from '@angular/core';
import { Sport } from '../../../../models/sport.model';
import { ConfigurationLinesService } from '../../../../services/configuration-lines.service';
import { TreeviewItem } from 'ngx-treeview';
import { TimeZones } from '../../../../data/time-zones';
import { Router } from '@angular/router';
import { Section } from '../../../../models/section.model';
import { Event } from '../../../../models/event.model';
import { NbDialogService } from '@nebular/theme';
import { ImageManageModalComponent } from '../../utils/modals/image-manager/image-manager-modal.component';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  selectedViewType: number;
  selectedLineType: number;
  timeZoneId: number;
  modelIsValid: boolean;
  isSubmitting: boolean;

  timeZones: TimeZones = new TimeZones();
  config = {
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500,
  };

  sportsAsTree: Sport[];
  items: TreeviewItem[] = [];
  selectedSections: Section[];

  constructor(private configService: ConfigurationLinesService, private router: Router, 
             private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.selectedViewType = 1;
    this.selectedLineType = 1;
    this.timeZoneId = 5;
    this.selectedSections = [];
    this.modelIsValid = false;

    this.configService.getSportsAsTree().subscribe(res => {
      this.sportsAsTree = res;
      this.formatSportsIntoTree(this.sportsAsTree);
    });
  }

  onSelectedChange(selectedTitles: string[]): void {
    this.updateSelectedItems(selectedTitles);
  }

  updateSelectedItems($event) {
    this.updatetSelectedSections();
    this.modelIsValid = this.selectedSections.length > 0;
  }

  getSelectedItems(): TreeviewItem[] {
    return this.items.filter(x => x.checked || x.checked === undefined);
  }

  getSelectedChild(treeviewItem: TreeviewItem): TreeviewItem[] {
    return treeviewItem.children.filter(x => x.checked || x.checked === undefined);
  }

  getSelectedTimeZone() {
    return this.timeZones.getTimeZoneList().find(x => x.id === this.timeZoneId);
  }

  submit() {
    this.isSubmitting = true;
    var model = {};
    const timeZone = this.getSelectedTimeZone();
    if (this.modelIsValid) {
      model = {
        code: "",
        viewType: this.selectedViewType == 1 ? 'h': 'v',
        lineType: this.selectedLineType == 1 ? 'd': 'a' ,
        time: timeZone.id,
        createdDate: "",
        sections: this.selectedSections
      }
      this.configService.save(model).subscribe(res => {
        this.isSubmitting = false;
        this.redirectoToDashboard();
      });
    }
  }

  cancel() {
    this.redirectoToDashboard();
  }
  
  private redirectoToDashboard(): void {
    this.router.navigate(['manager']);
  }

  updatetSelectedSections() {
    this.selectedSections = [];
    this.getSelectedItems().forEach(item => {
      const section = {
        name: item.value,
        bannerUrl: '',
        advertisingUrl: '',
        events: []
      } as Section;
      const children = item.children.filter(x => x.checked || x.checked === undefined);
      children.forEach(child => {
        const titles = child.children.filter(x => x.checked).map(x => x.value);
        const event = {
          sport: item.value,
          division: child.value,
          titles: titles
        } as Event;
        section.events.push(event);
      });
      this.selectedSections.push(section);
    });
  }

  formatSportsIntoTree(sports: Sport[]) {
    if (sports) {
      sports.forEach(sport => {
        const sportTreeChildren = [];
        sport.divisions.forEach(function (division) {
          const divisionTreeChildren = [];
          division.titles.forEach(function (title) {
            const titleTree = new TreeviewItem({
              text: title.name,
              value: title.name,
              checked: false,
              collapsed: true,
            });
            if (!divisionTreeChildren.find(x => x.value == titleTree.value)) {
              divisionTreeChildren.push(titleTree);
            }
          }, this);
          const divisionTree = new TreeviewItem({
            text: division.name,
            value: division.name,
            checked: false,
            collapsed: true,
            children: divisionTreeChildren
          });
          sportTreeChildren.push(divisionTree);
        }, this);
        const sportTree = new TreeviewItem({
          text: sport.name,
          value: sport.name,
          checked: false,
          collapsed: true,
          children: sportTreeChildren
        });
        this.items.push(sportTree);
      });
    }
  }

  addAdvertisingForAll() {
    const imageManager = this.dialogService.open(ImageManageModalComponent, {
      context: {
        type: 'advertising',
        sectionName: '',
        imageUrl: ''
      } 
    });
    imageManager.onClose.subscribe(res => {
      if (res) {
        this.selectedSections.forEach(section => {
          section.advertisingUrl = res;
        });
      }
    });
  }

  manageBanner(section: Section) {
    const imageManager = this.dialogService.open(ImageManageModalComponent, {
      context: {
        type: 'banner',
        sectionName: section.name,
        imageUrl: section.bannerUrl
      } 
    });
    imageManager.onClose.subscribe(res => {
      if (res) {
        section.bannerUrl = res;
      }
    });
  }

  manageAdvertising(section: Section) {
    const imageManager =  this.dialogService.open(ImageManageModalComponent, {
      context: {
        type: 'advertising',
        sectionName: section.name,
        imageUrl: section.advertisingUrl
      } 
    })
    imageManager.onClose.subscribe(res => {
      if (res) {
        section.advertisingUrl = res;
      }
    });
  }

}
