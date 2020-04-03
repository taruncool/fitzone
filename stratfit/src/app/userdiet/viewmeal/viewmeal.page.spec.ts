import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewmealPage } from './viewmeal.page';

describe('ViewmealPage', () => {
  let component: ViewmealPage;
  let fixture: ComponentFixture<ViewmealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewmealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
