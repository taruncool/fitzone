import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupverifyPage } from './signupverify.page';

describe('SignupverifyPage', () => {
  let component: SignupverifyPage;
  let fixture: ComponentFixture<SignupverifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupverifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupverifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
