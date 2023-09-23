import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProareasComponent } from './proareas.component';

describe('ProareasComponent', () => {
  let component: ProareasComponent;
  let fixture: ComponentFixture<ProareasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProareasComponent]
    });
    fixture = TestBed.createComponent(ProareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
