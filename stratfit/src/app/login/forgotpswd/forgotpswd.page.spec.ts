import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgotpswdPage } from './forgotpswd.page';

describe('ForgotpswdPage', () => {
  let component: ForgotpswdPage;
  let fixture: ComponentFixture<ForgotpswdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpswdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotpswdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
