import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlateweightsPage } from './plateweights.page';

describe('PlateweightsPage', () => {
  let component: PlateweightsPage;
  let fixture: ComponentFixture<PlateweightsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateweightsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlateweightsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
