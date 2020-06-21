import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewappadminComponent } from './viewappadmin.component';

describe('ViewappadminComponent', () => {
  let component: ViewappadminComponent;
  let fixture: ComponentFixture<ViewappadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewappadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewappadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
