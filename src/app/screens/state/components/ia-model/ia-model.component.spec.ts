import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaModelComponent } from './ia-model.component';

describe('IaModelComponent', () => {
  let component: IaModelComponent;
  let fixture: ComponentFixture<IaModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IaModelComponent]
    });
    fixture = TestBed.createComponent(IaModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
