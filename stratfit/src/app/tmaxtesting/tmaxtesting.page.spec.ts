import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TmaxtestingPage } from './tmaxtesting.page';

describe('TmaxtestingPage', () => {
  let component: TmaxtestingPage;
  let fixture: ComponentFixture<TmaxtestingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmaxtestingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TmaxtestingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
