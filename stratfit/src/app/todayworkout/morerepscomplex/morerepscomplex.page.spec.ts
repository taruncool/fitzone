import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MorerepscomplexPage } from './morerepscomplex.page';

describe('MorerepscomplexPage', () => {
  let component: MorerepscomplexPage;
  let fixture: ComponentFixture<MorerepscomplexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorerepscomplexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MorerepscomplexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
