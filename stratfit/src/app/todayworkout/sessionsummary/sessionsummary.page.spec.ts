import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SessionsummaryPage } from './sessionsummary.page';

describe('SessionsummaryPage', () => {
  let component: SessionsummaryPage;
  let fixture: ComponentFixture<SessionsummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionsummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
