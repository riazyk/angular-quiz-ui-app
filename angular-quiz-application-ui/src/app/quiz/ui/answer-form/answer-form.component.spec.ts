import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerFormComponent } from './answer-form.component';

describe('AnswerFormComponent', () => {
  let component: AnswerFormComponent;
  let fixture: ComponentFixture<AnswerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnswerFormComponent]
    });
    fixture = TestBed.createComponent(AnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
