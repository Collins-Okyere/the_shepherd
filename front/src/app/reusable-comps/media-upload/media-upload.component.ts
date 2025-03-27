import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage, OutputFormat } from 'ngx-image-cropper';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { LocalDbService } from '../../services/local-db.service';

@Component({
  selector: 'app-media-upload',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss'],
})
export class MediaUploadComponent {

  // @Output() imageUploaded = new EventEmitter<string>(); // Emits base64 image on upload
  // @Input() aspectRatio: number = 1;
  // @Input() format: OutputFormat = 'png';
  // imageChangedEvent: any = null; // Holds the file input event
  // croppedImage: string | null = null; // Stores the cropped image

  // constructor() {}
  
  // /** Handles file selection */
  // onFileChange(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   if (target.files && target.files.length > 0) {
  //     this.imageChangedEvent = event;
  //     console.log('File selected:', target.files[0]); // Debugging
  //   }
  // }

  // /** Handles image cropping */
  // imageCropped(event: ImageCroppedEvent): void {
  //   console.log('Cropping Event:', event); // Debugging
  //   this.croppedImage = event.base64 || ''; // Assign cropped image
  // }

  // /** Resets the image selection & cropping */
  // resetImage(): void {
  //   this.imageChangedEvent = null;
  //   this.croppedImage = null;
  // }

  // /** Uploads the cropped image */
  // uploadImage(): void {
  //   if (this.croppedImage) {
  //     console.log('Uploading Image:', this.croppedImage);
  //     this.imageUploaded.emit(this.croppedImage);
  //   } else {
  //     console.warn('No image selected');
  //   }
  // }


  @Input() imagePickerData:any = {
    showModal: true,
    componentName: '',
    modalTitle: '',
    avatar: this.nonDB.avatar
  };
  theme: string = 'indigo';
  @Output() saveEvent = new EventEmitter<SafeUrl | string>();
  @Output() closeModalEvent = new EventEmitter<void>();
  imageChangedEvent: Event | null = null;
  defaultImage:any = this.nonDB.avatar
  croppedImage: SafeUrl = this.defaultImage;
  upload = false


  constructor(private sanitizer: DomSanitizer, private readonly nonDB: LocalDbService) {}

  ngOnInit() {
  }

  cancelEvent() {
    this.closeModalEvent.emit();
    this.imagePickerData = {};
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
    this.saveEvent.emit(this.croppedImage || this.defaultImage);
  }

  cancelItem(): void {
    this.closeModalEvent.emit();
  }

}
