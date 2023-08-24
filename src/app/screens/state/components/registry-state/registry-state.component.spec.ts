import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryStateComponent } from './registry-state.component';

describe('RegistryStateComponent', () => {
  let component: RegistryStateComponent;
  let fixture: ComponentFixture<RegistryStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistryStateComponent]
    });
    fixture = TestBed.createComponent(RegistryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
