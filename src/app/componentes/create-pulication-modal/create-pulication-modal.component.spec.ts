import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePulicationModalComponent } from './create-pulication-modal.component';

describe('CreatePulicationModalComponent', () => {
  let component: CreatePulicationModalComponent;
  let fixture: ComponentFixture<CreatePulicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePulicationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePulicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
