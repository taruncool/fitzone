import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressbarPage } from './progressbar.page';

describe('ProgressbarPage', () => {
  let component: ProgressbarPage;
  let fixture: ComponentFixture<ProgressbarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressbarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
