import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-notice-header',
  imports: [MatInputModule, MatToolbar, MatIconModule, MatButtonModule, ],
  templateUrl: './notice-header.html',
  styleUrl: './notice-header.scss'
})
export class NoticeHeader {

}
