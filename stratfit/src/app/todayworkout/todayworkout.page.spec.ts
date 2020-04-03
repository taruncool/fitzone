import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodayworkoutPage } from './todayworkout.page';

describe('TodayworkoutPage', () => {
  let component: TodayworkoutPage;
  let fixture: ComponentFixture<TodayworkoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayworkoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodayworkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
