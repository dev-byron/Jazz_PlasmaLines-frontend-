import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ImageManagerService } from '../../../../services/images-manager.service';

@Component({
  selector: 'nb-name-prompt',
  templateUrl: './image-manager-modal.component.html',
  styleUrls: ['./image-manager-modal.component.scss']
})
export class ImageManageModalComponent implements OnInit {
  type: string;
  sectionName: string;
  imageUrl: string;
  resolutionMessage: string;
  isBanner: boolean;
  isAdvertising: boolean;
  selectedFiles: FileList;
  folderName: string;
  urlAfterSave: string;
  isSubmitting: boolean;

  constructor(protected dialogRef: NbDialogRef<ImageManageModalComponent>, private imagesService: ImageManagerService) {
  }

  ngOnInit() {
    if (this.type == 'banner') {
      this.isBanner = true;
      this.resolutionMessage = '1920x150'
      this.folderName = 'banner';
      if (this.imageUrl == '') {
        this.imageUrl = "https://via.placeholder.com/1920x150";
      }
    } else {
      this.isAdvertising = true;
      this.resolutionMessage = '800x600'
      this.folderName = 'advertising';
      if (this.imageUrl == '') {
        this.imageUrl = "https://via.placeholder.com/800x600";
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  async upload() {
      this.isSubmitting = true;
      const file = this.selectedFiles.item(0);
      const fileName = this.generateGuid() + '.' + this.getFileExtension(file.name);
      const data = await this.imagesService.uploadFile(file, this.folderName, fileName);
      if(data) {
        this.isSubmitting = false;
        this.dialogRef.close(data.Location);
      }
    }
    
    selectFile(event) {
      if (event.target.files && event.target.files[0]) {
        this.selectedFiles = event.target.files;
        var reader = new FileReader();
        reader.onload = (event:any) => {
         this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    generateGuid(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    getFileExtension(fileName) {
      return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
    }
}