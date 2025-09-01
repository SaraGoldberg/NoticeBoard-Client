import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  Notice,
  NoticeCreateDto,
  NoticeFilterData,
} from '../../models/notice.model';
import { NoticeService } from '../../services/notice.service';
import { NoticeCard } from '../notice-card/notice-card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { NoticeFilter } from '../notice-filter/notice-filter';
import { MatDialog } from '@angular/material/dialog';
import { NoticeForm } from '../notice-form/notice-form';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LocationFilter } from '../location-filter/location-filter';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-notice-list',
  imports: [
    NgxMasonryModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    NoticeCard,
    NoticeFilter,
    MatIconModule,
    MatButtonModule,
    LocationFilter,
  ],
  templateUrl: './notice-list.html',
  styleUrl: './notice-list.scss',
})
export class NoticeList {
  notices: Notice[] = [];
  editingNotice: Notice | null = null;
  filteredNotices: Notice[] = [];
  categories: { name: string; count: number }[] = [];

  constructor(
    private noticeService: NoticeService,
    private locationService: LocationService,
    private dialog: MatDialog
  ) {
    this.loadNotices();
  }

  loadNotices() {
    this.noticeService.getAllNotices().subscribe((data) => {
      this.notices = data;
      this.filteredNotices = data;
      this.updateCategoryCounts();
    });
  }

  updateCategoryCounts() {
    const map = new Map<string, number>();
    for (const notice of this.notices) {
      const cat = notice.category || 'Uncategorized';
      map.set(cat, (map.get(cat) || 0) + 1);
    }
    this.categories = Array.from(map.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }

  onFilterChanged(filters: NoticeFilterData) {
    this.filteredNotices = this.notices.filter((n) => {
      debugger;
      if (
        filters.text &&
        !n.title.toLowerCase().includes(filters.text.toLowerCase()) &&
        !n.content.toLowerCase().includes(filters.text.toLowerCase())
      )
        return false;
      if (
        filters.categories?.length &&
        !filters.categories.some((c) => c.name === n.category)
      )
        return false;
      if (filters.author && n.author !== filters.author) return false;
      if (filters.isActive !== null && n.isActive !== filters.isActive)
        return false;
      if (filters.minPriority != null && n.priority < filters.minPriority)
        return false;
      if (filters.maxPriority != null && n.priority > filters.maxPriority)
        return false;
      return true;
    });
  }
  clearFilterByLocation() {
    this.filteredNotices = this.notices;
  }
  
  filterByLocation(params: {
    latitude: number;
    longitude: number;
    distance: number;
  }) {
    this.filteredNotices = this.notices.filter((notice) => {
      if (!notice.location) return false;

      const distanceToNotice = this.locationService.calculateDistance(
        params.latitude,
        params.longitude,
        notice.location.latitude,
        notice.location.longitude
      );

      return distanceToNotice <= params.distance;
    });
  }

  openCreateDialog(notice?: NoticeCreateDto) {
    var dialogRef;
    if (notice) {
      dialogRef = this.dialog.open(NoticeForm, {
        data: { notice },
        width: '700px',
      });
    } else {
      dialogRef = this.dialog.open(NoticeForm, {
        width: '700px',
      });
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (notice) {
          // this.updateNotice(result);
        } else {
          this.addNotice(result);
        }
      }
    });
  }

  addNotice(notice: NoticeCreateDto) {
    this.noticeService.createNotice(notice).subscribe((newNotice) => {
      this.notices.push(newNotice);
      this.updateCategoryCounts();
    });
  }

  editNotice(notice: NoticeCreateDto) {
    this.openCreateDialog(notice);
  }

  deleteNotice(id: number) {
    this.noticeService.deleteNotice(id).subscribe(() => {
      debugger;
      this.loadNotices();
    });
  }
}
