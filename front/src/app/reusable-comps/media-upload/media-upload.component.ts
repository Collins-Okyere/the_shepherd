import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperComponent, OutputFormat } from 'ngx-image-cropper';

@Component({
  selector: 'app-media-upload',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss'],
})
export class MediaUploadComponent {
  
  @Output() imageUploaded = new EventEmitter<string>(); // Emits base64 image on upload
  @Input() aspectRatio: number = 1; 
  @Input() format: OutputFormat = 'png'; 

  imageChangedEvent: any = '';
  croppedImage: string = '';

  // Handle file input change
  onFileChange(event: Event): void {
    this.imageChangedEvent = event;
  }

  // Handle image cropping
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64!;
  }

  // Reset image selection
  resetImage(): void {
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

  // Upload function
  uploadImage(): void {
    if (this.croppedImage) {
      console.log('Uploading Image:', this.croppedImage);
      this.imageUploaded.emit(this.croppedImage);
    } else {
      console.warn('No image selected');
    }

  }

}
