import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WtcalpopupPage } from './wtcalpopup.page';

describe('WtcalpopupPage', () => {
  let component: WtcalpopupPage;
  let fixture: ComponentFixture<WtcalpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WtcalpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WtcalpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
