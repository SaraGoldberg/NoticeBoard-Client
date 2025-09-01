import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LocationService } from '../../services/location.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-location-filter',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
  ],
  templateUrl: './location-filter.html',
  styleUrl: './location-filter.scss',
})
export class LocationFilter {
  @ViewChild('addressInput') addressInput!: ElementRef<HTMLInputElement>;
  @Output() search = new EventEmitter<{
    latitude: number;
    longitude: number;
    distance: number;
  }>();
  @Output() clear = new EventEmitter();

  query = '';
  distance: number = 5;
  autocomplete!: google.maps.places.Autocomplete;
  queryLatLng: { lat: number; lng: number } | undefined;

  constructor(
    private locationService: LocationService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      { types: ['address'] }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete.getPlace();
        if (place.geometry?.location) {
          this.queryLatLng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          debugger;
          this.emitSearch();
        }
      });
    });
  }

  searchAddress() {
    debugger;
    if (this.queryLatLng) {
      this.emitSearch();
    }
  }

  onDistanceChange(newDistance: number) {
    this.distance = newDistance;
    if (this.queryLatLng) {
      this.emitSearch(); 
    }
  }

  useMyLocation() {
    this.locationService
      .getCurrentLocation()
      .then((loc) => {
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat: loc.latitude, lng: loc.longitude };
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            this.ngZone.run(() => {
              this.query = results[0].formatted_address;
              this.queryLatLng = {
                lat: loc.latitude,
                lng: loc.longitude,
              };
              debugger;
              this.emitSearch();
              // this.useCurrentLocation.emit({
              //   latitude: loc.latitude,
              //   longitude: loc.longitude,
              //   distance: this.distance,
              // });
            });
          }
        });
      })
      .catch((err) => console.error(err));
  }

  clearQuery() {
    this.query = '';
    this.queryLatLng = undefined;
    this.clear.emit();
  }

  private emitSearch() {
    if (this.queryLatLng) {
      this.search.emit({
        latitude: this.queryLatLng.lat,
        longitude: this.queryLatLng.lng,
        distance: this.distance,
      });
    }
  }
}
