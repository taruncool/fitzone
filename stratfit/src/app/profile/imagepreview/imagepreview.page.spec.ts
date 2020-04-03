import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagepreviewPage } from './imagepreview.page';

describe('ImagepreviewPage', () => {
  let component: ImagepreviewPage;
  let fixture: ComponentFixture<ImagepreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagepreviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagepreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
