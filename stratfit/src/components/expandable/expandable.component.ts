import { Component, OnInit, Renderer,ViewChild,ElementRef, Input } from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {
  @ViewChild('expandWrapper', {read: ElementRef,static: false }) expandWrapper;
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;

  currentHeight:number=0;
  constructor(public renderer: Renderer) {

  }
  ngAfterViewInit(){
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', 'auto');   
  }
  ngOnInit() {}

}
