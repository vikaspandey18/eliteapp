import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivity } from './view-activity';

describe('ViewActivity', () => {
  let component: ViewActivity;
  let fixture: ComponentFixture<ViewActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
