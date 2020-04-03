import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstpopupPage } from './instpopup.page';

describe('InstpopupPage', () => {
  let component: InstpopupPage;
  let fixture: ComponentFixture<InstpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
