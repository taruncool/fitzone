import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterfoodPage } from './filterfood.page';

describe('FilterfoodPage', () => {
  let component: FilterfoodPage;
  let fixture: ComponentFixture<FilterfoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterfoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterfoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
