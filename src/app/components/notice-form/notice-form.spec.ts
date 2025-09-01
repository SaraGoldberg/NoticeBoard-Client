import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeForm } from './notice-form';

describe('NoticeForm', () => {
  let component: NoticeForm;
  let fixture: ComponentFixture<NoticeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
