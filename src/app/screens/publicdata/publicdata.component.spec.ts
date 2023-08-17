import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicdataComponent } from './publicdata.component';

describe('PublicdataComponent', () => {
  let component: PublicdataComponent;
  let fixture: ComponentFixture<PublicdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicdataComponent]
    });
    fixture = TestBed.createComponent(PublicdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
