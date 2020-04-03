import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MorerepsPage } from './morereps.page';

describe('MorerepsPage', () => {
  let component: MorerepsPage;
  let fixture: ComponentFixture<MorerepsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorerepsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MorerepsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
