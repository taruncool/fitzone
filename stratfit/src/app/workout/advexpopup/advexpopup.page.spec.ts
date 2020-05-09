import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvexpopupPage } from './advexpopup.page';

describe('AdvexpopupPage', () => {
  let component: AdvexpopupPage;
  let fixture: ComponentFixture<AdvexpopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvexpopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvexpopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
