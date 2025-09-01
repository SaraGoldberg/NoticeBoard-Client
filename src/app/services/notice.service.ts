import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Notice, NoticeCreateDto, NoticeUpdateDto } from '../models/notice.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private readonly apiUrl = 'https://localhost:7186/api/notices';
  private noticesSubject = new BehaviorSubject<Notice[]>([]);
  public notices$ = this.noticesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // קבלת כל המודעות הפעילות
  getActiveNotices(lat?: number, lng?: number): Observable<Notice[]> {
    let params = new HttpParams();
    if (lat !== undefined && lng !== undefined) {
      params = params.set('lat', lat.toString()).set('lng', lng.toString());
    }
    return this.http.get<Notice[]>(this.apiUrl, { params });
  }

  // קבלת כל המודעות
  getAllNotices(lat?: number, lng?: number): Observable<Notice[]> {
    let params = new HttpParams();
    if (lat !== undefined && lng !== undefined) {
      params = params.set('lat', lat.toString()).set('lng', lng.toString());
    }
    return this.http.get<Notice[]>(`${this.apiUrl}/all`, { params });
  }

  // קבלת מודעה ספציפית
  getNoticeById(id: number): Observable<Notice> {
    return this.http.get<Notice>(`${this.apiUrl}/${id}`);
  }

  // חיפוש מודעות
  searchNotices(searchTerm: string, lat?: number, lng?: number): Observable<Notice[]> {
    let params = new HttpParams().set('q', searchTerm);
    if (lat !== undefined && lng !== undefined) {
      params = params.set('lat', lat.toString()).set('lng', lng.toString());
    }
    
    return this.http.get<Notice[]>(`${this.apiUrl}/search`, { params });
  }

  // קבלת מודעות לפי קטגוריה
  getNoticesByCategory(category: string): Observable<Notice[]> {
    return this.http.get<Notice[]>(`${this.apiUrl}/category/${category}`);
  }

  // קבלת מודעות סמוכות
  getNearbyNotices(lat: number, lng: number, radius: number = 10): Observable<Notice[]> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('radius', radius.toString());
    
    return this.http.get<Notice[]>(`${this.apiUrl}/nearby`, { params });
  }

  // קבלת קטגוריות
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  // יצירת מודעה
  createNotice(notice: NoticeCreateDto): Observable<Notice> {
    debugger
    return this.http.post<Notice>(this.apiUrl, notice);
  }

  // עדכון מודעה
  updateNotice(id: number, notice: NoticeUpdateDto): Observable<Notice> {
    return this.http.put<Notice>(`${this.apiUrl}/${id}`, notice);
  }

  // מחיקת מודעה
  deleteNotice(id: number): Observable<void> {
    debugger
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // עדכון המודעות ב-Subject
  refreshNotices(lat?: number, lng?: number): void {
    this.getActiveNotices(lat, lng).subscribe(notices => {
      this.noticesSubject.next(notices);
    });
  }
}
