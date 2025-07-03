import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuImgComponent } from './menu-img.component';

describe('MenuImgComponent', () => {
  let component: MenuImgComponent;
  let fixture: ComponentFixture<MenuImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
