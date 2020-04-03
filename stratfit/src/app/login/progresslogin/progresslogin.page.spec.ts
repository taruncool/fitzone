import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressloginPage } from './progresslogin.page';

describe('ProgressloginPage', () => {
  let component: ProgressloginPage;
  let fixture: ComponentFixture<ProgressloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
