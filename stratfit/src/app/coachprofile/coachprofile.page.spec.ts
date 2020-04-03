import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoachprofilePage } from './coachprofile.page';

describe('CoachprofilePage', () => {
  let component: CoachprofilePage;
  let fixture: ComponentFixture<CoachprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoachprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
