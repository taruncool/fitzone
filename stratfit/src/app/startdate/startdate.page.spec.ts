import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartdatePage } from './startdate.page';

describe('StartdatePage', () => {
  let component: StartdatePage;
  let fixture: ComponentFixture<StartdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
