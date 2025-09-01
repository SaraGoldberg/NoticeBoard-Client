import { Component, Inject, NgZone, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { NoticeCreateDto } from '../../models/notice.model';
import { NoticeService } from '../../services/notice.service';

@Component({
  selector: 'app-notice-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule, MatDialogActions, MatDialogModule, GoogleMapsModule
  ],
  templateUrl: './notice-form.html',
  styleUrls: ['./notice-form.scss'],
})
export class NoticeForm {
  notice?: NoticeCreateDto;
  categories: string[] = [];
  title = '';

  center = { lat: 32.0853, lng: 34.7818 };
  zoom = 12;

  @ViewChild('addressInput') addressInput!: ElementRef<HTMLInputElement>;
  autocomplete!: google.maps.places.Autocomplete;

  constructor(
    private noticeService: NoticeService,
    private dialogRef: MatDialogRef<NoticeForm>,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data?: { notice?: NoticeCreateDto }
  ) {}

  ngOnInit() {
    this.noticeService.getCategories().subscribe(data => this.categories = data);

    this.notice = this.data?.notice ?? {
      title: '', content: '', author: '', priority: 1, category: '',
      location: { latitude: 32.0853, longitude: 34.7818, address: '' }
    };

    this.title = this.data?.notice ? `Edit ${this.data.notice.title} Notice` : 'Create New Notice';
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, { types: ['address'] });
    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;
        this.notice!.location = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address || ''
        };
        this.center = { lat: this.notice!.location.latitude, lng: this.notice!.location.longitude };
      });
    });
  }

  setLocation(event: google.maps.MapMouseEvent) {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        this.ngZone.run(() => {
          this.notice!.location = {
            latitude: lat,
            longitude: lng,
            address: results[0].formatted_address
          };
          this.center = { lat, lng };
        });
      }
    });
  }
  markerDragged(event: google.maps.MapMouseEvent) {
  if (!event.latLng) return;

  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === 'OK' && results && results[0]) {
      this.ngZone.run(() => {
        this.notice!.location = {
          latitude: lat,
          longitude: lng,
          address: results[0].formatted_address
        };
        this.center = { lat, lng };
      });
    }
  });
}

  submit() { this.dialogRef.close(this.notice); }
  cancel() { this.dialogRef.close(); }
}
