import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltercountryPage } from './filtercountry.page';

describe('FiltercountryPage', () => {
  let component: FiltercountryPage;
  let fixture: ComponentFixture<FiltercountryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltercountryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltercountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
