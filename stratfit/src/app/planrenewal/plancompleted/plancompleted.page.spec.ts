import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlancompletedPage } from './plancompleted.page';

describe('PlancompletedPage', () => {
  let component: PlancompletedPage;
  let fixture: ComponentFixture<PlancompletedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlancompletedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlancompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
