import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmealPage } from './addmeal.page';

describe('AddmealPage', () => {
  let component: AddmealPage;
  let fixture: ComponentFixture<AddmealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
