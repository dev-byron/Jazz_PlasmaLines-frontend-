import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationLine } from '../../../models/configuration-line.model';
import { ConfigurationLinesService } from '../../../services/configuration-lines.service';
import { TimeZones } from '../../../data/time-zones';
import { NbDialogService } from '@nebular/theme';
import { DeleteConfirmationModalComponent } from '../../utils/modals/delete-confirmation/delete-confirmation-modal.component';

@Component({
  selector: 'ngx-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {
  models: ConfigurationLine[];
  timeZones: TimeZones = new TimeZones();
  
  constructor(private service: ConfigurationLinesService,  
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialogService: NbDialogService) {}
  
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.service.getAll().subscribe(res => {
      console.log(res);
      this.models = res.sort((val1, val2)=> {return new Date(val2.createdDate).getTime() - new 
        Date(val1.createdDate).getTime()})
    });
  }

  getViewType(type): string {
    return type === 'v' ? 'Vertical' : 'Horizontal';
  }

  getLineType(type): string {
    return type === 'a' ? 'American' : 'Decimal';
  }

  getTimeZone(timeZoneId) {
    return this.timeZones.getTimeZoneList().find(x => x.id == timeZoneId).gmtAdjustment;
  }
 
  addNew() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute});
  }

  edit(code) {
    this.router.navigate(['edit', code ], {relativeTo: this.activatedRoute});
  }

  delete(id) {
    const deleteModal = this.dialogService.open(DeleteConfirmationModalComponent);
    deleteModal.onClose.subscribe(res => {
      if (res) {
        this.service.delete(id).subscribe(() => {
          this.loadAll();
        })
      }
    });
  }


}