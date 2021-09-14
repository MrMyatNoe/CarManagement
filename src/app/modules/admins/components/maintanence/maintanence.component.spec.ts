import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanenceComponent } from './maintanence.component';

describe('MaintanenceComponent', () => {
  let component: MaintanenceComponent;
  let fixture: ComponentFixture<MaintanenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintanenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintanenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
