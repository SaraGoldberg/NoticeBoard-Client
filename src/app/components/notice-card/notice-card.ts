import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notice } from '../../models/notice.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notice-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './notice-card.html',
  styleUrl: './notice-card.scss'
})

export class NoticeCard {
  @Input() notice!: Notice;
  @Output() edit = new EventEmitter<Notice>();
  @Output() delete = new EventEmitter<number>();

  getCategoryColor(category: string): string {
  switch (category) {
    case 'Sales': return 'red';
    case 'Events': return 'blue';
    case 'Lost & Found': return 'orange';
    case 'Health & Fitness': return 'green';
    case 'Tech': return 'purple';
    default: return 'gray';
  }
}
}
