import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExcpreviewPage } from './excpreview.page';

describe('ExcpreviewPage', () => {
  let component: ExcpreviewPage;
  let fixture: ComponentFixture<ExcpreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcpreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExcpreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
