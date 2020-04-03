import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimerpopupPage } from './timerpopup.page';

describe('TimerpopupPage', () => {
  let component: TimerpopupPage;
  let fixture: ComponentFixture<TimerpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimerpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
