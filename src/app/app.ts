import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoticeList } from './components/notice-list/notice-list';
import { NoticeCard } from './components/notice-card/notice-card';
import { NoticeFilter } from './components/notice-filter/notice-filter';
import { NoticeHeader } from './components/notice-header/notice-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NoticeList, NoticeHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected title = 'noticeboard-client';
}
