import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalalPolicyComponent } from './halal-policy.component';

describe('HalalPolicyComponent', () => {
  let component: HalalPolicyComponent;
  let fixture: ComponentFixture<HalalPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalalPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalalPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
