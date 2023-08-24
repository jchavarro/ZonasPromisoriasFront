import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstateComponent } from './detailstate.component';

describe('DetailstateComponent', () => {
  let component: DetailstateComponent;
  let fixture: ComponentFixture<DetailstateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailstateComponent]
    });
    fixture = TestBed.createComponent(DetailstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
