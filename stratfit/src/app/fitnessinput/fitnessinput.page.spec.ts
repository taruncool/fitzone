import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FitnessinputPage } from './fitnessinput.page';

describe('FitnessinputPage', () => {
  let component: FitnessinputPage;
  let fixture: ComponentFixture<FitnessinputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessinputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FitnessinputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
