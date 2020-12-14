import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BmicalculatorPage } from './bmicalculator.page';

describe('BmicalculatorPage', () => {
  let component: BmicalculatorPage;
  let fixture: ComponentFixture<BmicalculatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmicalculatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BmicalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
