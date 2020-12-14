import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FatlevelPage } from './fatlevel.page';

describe('FatlevelPage', () => {
  let component: FatlevelPage;
  let fixture: ComponentFixture<FatlevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FatlevelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FatlevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
