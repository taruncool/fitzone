import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DietprofilePage } from './dietprofile.page';

describe('DietprofilePage', () => {
  let component: DietprofilePage;
  let fixture: ComponentFixture<DietprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DietprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
