import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddweightbmiPage } from './addweightbmi.page';

describe('AddweightbmiPage', () => {
  let component: AddweightbmiPage;
  let fixture: ComponentFixture<AddweightbmiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddweightbmiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddweightbmiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
