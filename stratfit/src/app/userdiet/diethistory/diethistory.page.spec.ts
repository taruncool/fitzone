import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiethistoryPage } from './diethistory.page';

describe('DiethistoryPage', () => {
  let component: DiethistoryPage;
  let fixture: ComponentFixture<DiethistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiethistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiethistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
