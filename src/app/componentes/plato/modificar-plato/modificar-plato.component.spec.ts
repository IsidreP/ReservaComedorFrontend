import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPlatoComponent } from './modificar-plato.component';

describe('ModificarPlatoComponent', () => {
  let component: ModificarPlatoComponent;
  let fixture: ComponentFixture<ModificarPlatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPlatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
