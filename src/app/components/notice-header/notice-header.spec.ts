import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeHeader } from './notice-header';

describe('NoticeHeader', () => {
  let component: NoticeHeader;
  let fixture: ComponentFixture<NoticeHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
