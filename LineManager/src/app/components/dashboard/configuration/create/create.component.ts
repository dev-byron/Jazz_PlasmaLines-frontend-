import { Component, OnInit } from '@angular/core';
import { Sport } from '../../../../models/sport.model';
import { ConfigurationLinesService } from '../../../../services/configuration-lines.service';
import { TreeviewItem } from 'ngx-treeview';
import { TimeZones } from '../../../../data/time-zones';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../../../models/section.model';
import { Event } from '../../../../models/event.model';
import { NbDialogService } from '@nebular/theme';
import { ImageManageModalComponent } from '../../../utils/modals/image-manager/image-manager-modal.component';
import { ConfigurationLine } from '../../../../models/configuration-line.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectedViewType: number;
  selectedLineType: number;
  selectedViewTheme: number;
  timeZoneId: number;
  modelIsValid: boolean;
  isSubmitting: boolean;
  editCode: string;

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

  firstForm: FormGroup;
  
  constructor(private configService: ConfigurationLinesService, 
             private router: Router, 
             private route: ActivatedRoute,
             private dialogService: NbDialogService,
             private fb: FormBuilder) { }

  ngOnInit(): void {
    this.selectedViewType = 1;
    this.selectedLineType = 1;
    this.selectedViewTheme = 1;
    this.timeZoneId = 5;
    this.selectedSections = [];
    this.modelIsValid = false;

    this.configService.getSportsAsTree().subscribe(res => {
      this.sportsAsTree = res;
      this.formatSportsIntoTree(this.sportsAsTree);
      this.route.paramMap.subscribe(params => {
        this.editCode = params.get("code");
        if (this.editCode) {
          this.configService.getByCode(this.editCode).subscribe(res => {
            if (res) {
              this.fillUpdateConfiguration(res);
            } else {
              this.redirectoToDashboard();
            }
          });
        }
      })
    });

    this.setForms();
  }

  setForms() {
    this.firstForm = this.fb.group({
      name: ['', Validators.required],
      lineType:  ['1', Validators.required],
      viewType:  ['', Validators.required],
      viewTheme: ['', Validators.required],
      timeZone: ['', Validators.required]
    });
    this.firstForm.controls['lineType'].setValue('d', {onlySelf: true});
    this.firstForm.controls['viewType'].setValue('h', {onlySelf: true});
    this.firstForm.controls['viewTheme'].setValue('l', {onlySelf: true});
    this.firstForm.controls['timeZone'].setValue(this.timeZoneId, {onlySelf: true});
  }

  onSelectedChange(selectedTitles: string[]): void {
    this.updateSelectedItems(selectedTitles);
  }

  updateSelectedItems($event) {
    this.updatetSelectedSections();
   
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
        code: this.editCode ? this.editCode : "",
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

  updatetSelectedSections() {
    var tmpSections = [];
    this.getSelectedItems().forEach(item => {
      var oldSection = this.selectedSections.find(x => x.name === item.value);
      const section = {
        name: item.value,
        bannerUrl: oldSection ? oldSection.bannerUrl : '',
        advertisingUrl:  oldSection ? oldSection.advertisingUrl : '',
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
      tmpSections.push(section);
    });
    this.selectedSections = tmpSections; 
    this.modelIsValid = this.selectedSections.length > 0;

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

  private fillUpdateConfiguration(configurationLine: ConfigurationLine) {
    if (configurationLine) {
      this.selectedViewType = configurationLine.viewType == 'h' ? 1 : 2;
      this.selectedLineType = configurationLine.lineType == 'd' ? 1 : 2;
      this.timeZoneId = parseInt(configurationLine.time);

      configurationLine.sections.forEach(section => {
        var index = this.items.findIndex(x => x.value.trim() == section.name.trim());
        if (index > -1) {
          section.events.forEach(event => {
            var eventIndex = this.items[index].children.findIndex(x => x.value.trim() == event.division);
            if (eventIndex > -1) {
              event.titles.forEach(title => {
                var indexTitle = this.items[index].children[eventIndex].children.findIndex(x => x.value.trim() == title.trim());
                if (indexTitle > -1) {
                  this.items[index].children[eventIndex].children[indexTitle].checked = true;
                } else {
                  this.items[index].children[eventIndex].children.push(this.getNewTitleChild(title, true));
                }
                this.items[index].children[eventIndex].checked = undefined;
                this.items[index].children[eventIndex].collapsed = false;
                this.items[index].checked = undefined;
                this.items[index].collapsed = false;
              });
            }
            
          });
        }
      })
    }
    this.updatetSelectedSections();
    configurationLine.sections.forEach(section => {
      var selected = this.selectedSections.find(x => x.name === section.name);
      if (selected) { 
        selected.advertisingUrl = section.advertisingUrl;
        selected.bannerUrl = section.bannerUrl;
      }
    });
  }

  getNewTitleChild(title: string, checked: boolean) {
    const titleTree = new TreeviewItem({
      text: title,
      value: title,
      checked: checked,
      collapsed: true,
    });
    return titleTree;
  }


  private redirectoToDashboard(): void {
    this.router.navigate(['manager']);
  }

}
