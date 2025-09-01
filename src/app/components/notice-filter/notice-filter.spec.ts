import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeFilter } from './notice-filter';

describe('NoticeFilter', () => {
  let component: NoticeFilter;
  let fixture: ComponentFixture<NoticeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
