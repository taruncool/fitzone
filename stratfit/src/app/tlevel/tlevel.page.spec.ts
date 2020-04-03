import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TlevelPage } from './tlevel.page';

describe('TlevelPage', () => {
  let component: TlevelPage;
  let fixture: ComponentFixture<TlevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TlevelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TlevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
