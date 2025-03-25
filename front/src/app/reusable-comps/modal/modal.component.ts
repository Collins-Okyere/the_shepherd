import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef, ComponentRef, ElementRef, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { MediaUploadComponent } from '../media-upload/media-upload.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('modalContainer', { static: false }) modalContainer!: ElementRef;

  config: any = { isOpen: false };
  currentComponent: any = null; // Default to null

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe((conf: any) => {
      this.config = conf || { isOpen: false };
      this.currentComponent = this.config.component || null; // ✅ Directly assign the component
    });
  }

  closeModal() {
    this.config.isOpen = false;
    this.currentComponent = null; // Reset component when closing
    this.modalService.closeModal();
  }

  onOutsideClick(event: Event) {
    if (!this.modalContainer.nativeElement.contains(event.target as Node)) {
      this.closeModal();
    }
  }
}
