import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialListsComponent } from './tutorial-lists.component';

describe('TutorialListsComponent', () => {
  let component: TutorialListsComponent;
  let fixture: ComponentFixture<TutorialListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
