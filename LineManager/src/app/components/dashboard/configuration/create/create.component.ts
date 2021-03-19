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
  selectedViewType: string;
  selectedLineType: string;
  selectedViewTheme: string;
  timeZoneId: number;
  modelIsValid: boolean;
  isSubmitting: boolean;
  isFormTwoValid: boolean;
  
  showCustomUpdateScreenTime: boolean;
  customShowAdvertisingTime: boolean;

  editCode: string;

  timeZones: TimeZones = new TimeZones();

  config = {
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500,
  };

  updateScreenConfig = [
    {id: 1, text: "20 segundos", time: 20},
    {id: 2, text: "30 segundos", time: 30},
    {id: 3, text: "40 segundos", time: 40},
    {id: 3, text: "Otro", time: 0},
  ];

  updateAdvertisingConfig = [
    {id: 1, text: "5 minutos", time: 300},
    {id: 2, text: "10 minutos", time: 600},
    {id: 3, text: "20 minutos", time: 1200},
    {id: 3, text: "Otro", time: 0},
  ];

  sportsAsTree: Sport[];
  items: TreeviewItem[] = [];
  selectedSections: Section[];

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private configService: ConfigurationLinesService, 
             private router: Router, 
             private route: ActivatedRoute,
             private dialogService: NbDialogService,
             private fb: FormBuilder) { }

  ngOnInit(): void {
    this.selectedViewType = 'v';
    this.selectedLineType = 'd';
    this.selectedViewTheme = 'l';
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
    this.firstForm.controls['lineType'].setValue(this.selectedLineType, {onlySelf: true});
    this.firstForm.controls['viewType'].setValue(this.selectedViewType, {onlySelf: true});
    this.firstForm.controls['viewTheme'].setValue(this.selectedViewTheme, {onlySelf: true});
    this.firstForm.controls['timeZone'].setValue(this.timeZoneId, {onlySelf: true});


    this.secondForm = this.fb.group({
      category: ['', Validators.required],
    });
    this.secondForm.controls['category'].setValue('1', {onlySelf: true});
   
    this.thirdForm =  this.fb.group({
      updateScreenTime: ['', Validators.required],
      customUpdateScreenTime: [''],
      showAdvertisingTime: ['', Validators.required],
      customShowAdvertisingTime: [''],
    });

    this.onFormChanges();
  }

  onFormChanges() {
    this.secondForm.controls['category'].valueChanges.subscribe(val => {
      if (val == '1') {
        this.config.hasFilter = true;
        this.enableTreeChecboxes(this.items);
        this.isFormTwoValid = this.getSelectedItems().length > 0;
      } else {
        this.config.hasFilter = false;
        this.disableTreeChecboxes(this.items);
        this.isFormTwoValid = true;
      }
    });

    this.thirdForm.controls['updateScreenTime'].valueChanges.subscribe(val => {
      if (val == 0) {
        this.showCustomUpdateScreenTime = true;
      } else {
        this.showCustomUpdateScreenTime = false;
      }
    });

    this.thirdForm.controls['showAdvertisingTime'].valueChanges.subscribe(val => {
      if (val == 0) {
        this.customShowAdvertisingTime = true;
      } else {
        this.customShowAdvertisingTime = false;
      }
    });
    
  }

  enableTreeChecboxes(items: TreeviewItem[]) {
    items.forEach(item => {
      if (item.children && item.children.length > 0) {
        this.enableTreeChecboxes(item.children);
      }
      item.disabled = false;
    });
  }

  disableTreeChecboxes(items: TreeviewItem[]) {
    items.forEach(item => {
      if (item.children && item.children.length > 0) {
        this.enableTreeChecboxes(item.children);
      }
      item.disabled = true;
    });
  }

  onSelectedChange(selectedTitles: string[]): void {
    this.updateSelectedItems(selectedTitles);
  }

  updateSelectedItems($event) {
    this.updatetSelectedSections();
    this.isFormTwoValid = this.getSelectedItems().length > 0;
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
        viewType: this.selectedViewType,
        lineType: this.selectedLineType ,
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
      this.selectedViewType = configurationLine.viewType ;
      this.selectedLineType = configurationLine.lineType;
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
