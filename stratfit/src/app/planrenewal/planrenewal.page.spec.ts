import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanrenewalPage } from './planrenewal.page';

describe('PlanrenewalPage', () => {
  let component: PlanrenewalPage;
  let fixture: ComponentFixture<PlanrenewalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanrenewalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanrenewalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
