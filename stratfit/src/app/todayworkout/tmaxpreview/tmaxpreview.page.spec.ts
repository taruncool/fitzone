import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TmaxpreviewPage } from './tmaxpreview.page';

describe('TmaxpreviewPage', () => {
  let component: TmaxpreviewPage;
  let fixture: ComponentFixture<TmaxpreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmaxpreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TmaxpreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
