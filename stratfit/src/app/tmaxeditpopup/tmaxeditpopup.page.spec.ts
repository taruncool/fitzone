import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TmaxeditpopupPage } from './tmaxeditpopup.page';

describe('TmaxeditpopupPage', () => {
  let component: TmaxeditpopupPage;
  let fixture: ComponentFixture<TmaxeditpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmaxeditpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TmaxeditpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
