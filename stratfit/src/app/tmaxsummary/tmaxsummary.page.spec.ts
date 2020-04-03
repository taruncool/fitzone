import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TmaxsummaryPage } from './tmaxsummary.page';

describe('TmaxsummaryPage', () => {
  let component: TmaxsummaryPage;
  let fixture: ComponentFixture<TmaxsummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmaxsummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TmaxsummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
