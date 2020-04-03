import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanpreviewPage } from './planpreview.page';

describe('PlanpreviewPage', () => {
  let component: PlanpreviewPage;
  let fixture: ComponentFixture<PlanpreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanpreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanpreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
