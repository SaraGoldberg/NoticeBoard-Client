import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

import { Notice, NoticeFilterData } from '../../models/notice.model';

@Component({
  selector: 'app-notice-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSliderModule,
  ],
  templateUrl: './notice-filter.html',
  styleUrl: './notice-filter.scss',
})
export class NoticeFilter {
  @Input() categories: { name: string; count: number }[] = [];
  @Input() initialFilter?: NoticeFilterData | null = null;

  @Output() filterChange = new EventEmitter<NoticeFilterData>();

  model: NoticeFilterData = {
    text: '',
    categories: [],
    author: '',
    isActive: null,
    minPriority: null,
    maxPriority: null,
  };

  activeSelect: boolean | null = null;

  ngOnInit() {
    if (this.initialFilter) {
      this.model = { ...this.model, ...this.initialFilter };
      this.activeSelect = this.model.isActive ?? null;
    }
  }

  emitChange() {
    this.filterChange.emit({ ...this.model });
  }

  onActiveChange(v: boolean | null) {
    this.model.isActive = v;
    // this.emitChange();
  }

  reset() {
    this.model = {
      text: '',
      categories: [],
      author: '',
      isActive: null,
      minPriority: null,
      maxPriority: null,
    };
    this.activeSelect = null;
    this.emitChange();
  }

  apply() {
    this.model.isActive = this.activeSelect;
    this.filterChange.emit({ ...this.model });
  }
}
