import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewappuserComponent } from './viewappuser.component';

describe('ViewappuserComponent', () => {
  let component: ViewappuserComponent;
  let fixture: ComponentFixture<ViewappuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewappuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewappuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
