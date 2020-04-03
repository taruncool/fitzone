import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TmaxPage } from './tmax.page';

describe('TmaxPage', () => {
  let component: TmaxPage;
  let fixture: ComponentFixture<TmaxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmaxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TmaxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
