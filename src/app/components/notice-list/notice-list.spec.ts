import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeList } from './notice-list';

describe('NoticeList', () => {
  let component: NoticeList;
  let fixture: ComponentFixture<NoticeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
