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
import { DeleteConfirmationModalComponent } from '../../../utils/modals/delete-confirmation/delete-confirmation-modal.component';
import { Advertising } from '../../../../models/advertising-model';
import { TokenStorageService } from '../../../../services/token-storage.service';

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
  advertisings: Advertising[];
  nextEventsSection: Section[];

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private configService: ConfigurationLinesService, 
             private router: Router, 
             private route: ActivatedRoute,
             private dialogService: NbDialogService,
             private tokenStorage: TokenStorageService,
             private fb: FormBuilder) { }

  ngOnInit(): void {
    this.selectedViewType = 'h';
    this.selectedLineType = 'a';
    this.selectedViewTheme = 'd';
    this.timeZoneId = 5;
    this.selectedSections = [];
    this.advertisings = [];
    this.modelIsValid = false;

    this.nextEventsSection = [
      {
        name: 'Próximos Eventos',
        bannerUrl: '',
        events: [
          {
            sport: 'all',
            division: 'all',
            titles: []
          }
        ]
      } as Section
    ];

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

  updateFormsSelect(configuration: ConfigurationLine): void {
    this.timeZoneId = parseInt(configuration.time);
    this.firstForm.controls['name'].setValue(configuration.name, {onlySelf: true});
    this.firstForm.controls['lineType'].setValue(configuration.lineType, {onlySelf: false});
    this.firstForm.controls['viewType'].setValue(configuration.viewType, {onlySelf: false});
    this.firstForm.controls['viewTheme'].setValue(configuration.viewTheme, {onlySelf: false});
    this.firstForm.controls['timeZone'].setValue(parseInt(configuration.time), {onlySelf: false});

    if (configuration.showOnlyNextEvents) {
      this.secondForm.controls['category'].setValue('2', {onlySelf: false});
      this.selectedSections = configuration.sections;
      this.modelIsValid = true;
    } else {
      this.secondForm.controls['category'].setValue('1', {onlySelf: false});
    }
    this.isFormTwoValid = true;

    if (this.updateScreenConfig.findIndex(x=> x.time == configuration.screenTime) >= 0) {
      this.thirdForm.controls['updateScreenTime'].setValue(configuration.screenTime, {onlySelf: false});
      this.showCustomUpdateScreenTime = false;
    } else {
      this.thirdForm.controls['updateScreenTime'].setValue(0, {onlySelf: false});
      this.thirdForm.controls['customUpdateScreenTime'].setValue(configuration.screenTime, {onlySelf: false});
      this.showCustomUpdateScreenTime = true;
    }

    if (this.updateAdvertisingConfig.findIndex(x=> x.time == configuration.advertisingLapseTime) >= 0) {
      this.thirdForm.controls['showAdvertisingTime'].setValue(configuration.advertisingLapseTime, {onlySelf: false});
      this.customShowAdvertisingTime = false;
    } else {
      this.thirdForm.controls['showAdvertisingTime'].setValue(0, {onlySelf: false});
      this.thirdForm.controls['customShowAdvertisingTime'].setValue(configuration.advertisingLapseTime, {onlySelf: false});
      this.customShowAdvertisingTime = true;
    }
    this.advertisings = configuration.advertisings;
  }

  onFormChanges() {
    this.secondForm.controls['category'].valueChanges.subscribe(val => {
      if (val == 1) {
        this.config.hasFilter = true;
        this.enableTreeCheckboxes(this.items);
        this.isFormTwoValid = this.getSelectedItems().length > 0;
        this.modelIsValid = this.selectedSections.length > 0;
      } else {
        this.config.hasFilter = false;
        this.disableTreeCheckboxes(this.items);
        this.isFormTwoValid = true;
        this.modelIsValid = true;
      }
    });

    this.thirdForm.controls['updateScreenTime'].valueChanges.subscribe(val => {
      if (val == 0) {
        this.showCustomUpdateScreenTime = true;
        this.thirdForm.controls['customUpdateScreenTime'].setValidators(Validators.required);
      } else {
        this.showCustomUpdateScreenTime = false;
        this.thirdForm.controls['customUpdateScreenTime'].clearValidators();
      }
    });

    this.thirdForm.controls['showAdvertisingTime'].valueChanges.subscribe(val => {
      if (val == 0) {
        this.customShowAdvertisingTime = true;
        this.thirdForm.controls['customShowAdvertisingTime'].setValidators(Validators.required);
      } else {
        this.customShowAdvertisingTime = false;
        this.thirdForm.controls['customShowAdvertisingTime'].clearValidators();
      }
    });
  }


  enableTreeCheckboxes(items: TreeviewItem[]) {
    items.forEach(item => {
      if (item.children && item.children.length > 0) {
        this.enableTreeCheckboxes(item.children);
      }
      item.disabled = false;
    });
  }

  //check bug with disable
  disableTreeCheckboxes(items: TreeviewItem[]) {
    items.forEach(item => {
      if (item.children && item.children.length > 0) {
        this.enableTreeCheckboxes(item.children);
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
    var showOnlyNextEvents = !this.config.hasFilter;
    if (showOnlyNextEvents)  {
      this.selectedSections = this.nextEventsSection;
    }
    var model = {};
    if (this.modelIsValid) {
      model = {
        code: this.editCode ? this.editCode : "",
        name: this.firstForm.controls['name'].value,
        viewType: this.firstForm.controls['viewType'].value,
        lineType: this.firstForm.controls['lineType'].value,
        viewTheme: this.firstForm.controls['viewTheme'].value,
        time:  this.firstForm.controls['timeZone'].value,
        createdDate: new Date().toDateString(),
        createdBy: this.getUserId(),
        showOnlyNextEvents: showOnlyNextEvents,
        screenTime: this.getUpdateScreenTime(),
        advertisingLapseTime: this.getAdvertisingLapseTime(),
        advertisings: this.advertisings,
        sections: this.selectedSections
      }

      this.configService.save(model).subscribe(res => {
        this.isSubmitting = false;
        this.redirectoToDashboard();
      });

    }
  }

  private getUpdateScreenTime(): number {
    const time = this.thirdForm.controls['updateScreenTime'].value !== 0 ? 
      this.thirdForm.controls['updateScreenTime'].value : 
      this.thirdForm.controls['customUpdateScreenTime'].value;
    return time;
  }

  private getAdvertisingLapseTime() : number {
    const time = this.thirdForm.controls['showAdvertisingTime'].value !== 0 ? 
      this.thirdForm.controls['showAdvertisingTime'].value : 
      this.thirdForm.controls['customShowAdvertisingTime'].value;
   return time;
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

  private fillUpdateConfiguration(configurationLine: ConfigurationLine) {
    if (configurationLine) {
      this.updateFormsSelect(configurationLine);
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
  
  private getUserId() {
    return this.tokenStorage.getUser().id;
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

  deleteBanner(section: Section) {
    const deleteModal = this.dialogService.open(DeleteConfirmationModalComponent);
    deleteModal.onClose.subscribe(res => {
      if (res) {
        section.bannerUrl = '';
      }
    });
  }

  manageAdvertising() {
    const imageManager =  this.dialogService.open(ImageManageModalComponent, {
      context: {
        type: 'advertising',
        sectionName: '',
        imageUrl: ''
      } 
    })
    imageManager.onClose.subscribe(res => {
      if (res) {
        this.advertisings.push({
          imageUrl: res
        } as Advertising);
      }
    });
  }

  deleteAdvertising(advertising: Advertising) {
    const deleteModal = this.dialogService.open(DeleteConfirmationModalComponent);
    deleteModal.onClose.subscribe(res => {
      if (res) {
        const index = this.advertisings.findIndex(x => x.imageUrl === advertising.imageUrl);
        this.advertisings.splice(index, 1);
      }
    });
  }

  hasBanner(section: Section) {
    return section.bannerUrl !== '';
  }



}
