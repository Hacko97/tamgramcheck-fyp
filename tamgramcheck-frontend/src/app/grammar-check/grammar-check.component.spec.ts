import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarCheckComponent } from './grammar-check.component';

describe('GrammarCheckComponent', () => {
  let component: GrammarCheckComponent;
  let fixture: ComponentFixture<GrammarCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrammarCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
