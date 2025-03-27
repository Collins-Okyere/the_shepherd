import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { MediaUploadService } from './media-upload.service';

@Component({
  selector: 'app-media-upload',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss'],
})
export class MediaUploadComponent {

  config:any = { isOpen: false};
  imageChangedEvent: Event | null = null;
  defaultImage:any = this.config.image
  croppedImage: SafeUrl = this.defaultImage;
  upload = false    


  constructor(private sanitizer: DomSanitizer, private mediaService: MediaUploadService) {}

  ngOnInit(): void {
    this.mediaService.modalState$.subscribe((conf: any) => {
      this.config = conf || { isOpen: false };
      this.croppedImage = this.config.image
    });
  }

  cancelEvent() {
    this.config = {};
    this.closeModal()
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.upload = true
  }

  imageCropped(event: ImageCroppedEvent): void {
    if (event.objectUrl) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    } else {
      this.croppedImage = '';
    }
  }

  imageLoaded(image: LoadedImage): void {
    // Show cropper
  }

  cropperReady(): void {
    // Cropper ready
  }

  loadImageFailed(): void {
    // Show message
  }
  
  saveItem(): void {
    this.upload = false;
    if (this.config.okAction) {
      this.config.okAction(this.croppedImage ?? this.defaultImage);
    }
    this.closeModal();
  }
  

  closeModal() {
    this.config = { isOpen: false};
    this.mediaService.closeModal();
  }

}
