import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowexercisePage } from './showexercise.page';

describe('ShowexercisePage', () => {
  let component: ShowexercisePage;
  let fixture: ComponentFixture<ShowexercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowexercisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowexercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
