import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealtimingsPage } from './mealtimings.page';

describe('MealtimingsPage', () => {
  let component: MealtimingsPage;
  let fixture: ComponentFixture<MealtimingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealtimingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealtimingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
