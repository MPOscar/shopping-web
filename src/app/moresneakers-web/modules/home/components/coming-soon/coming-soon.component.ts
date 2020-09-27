import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
//
import {ReleasesService} from '../../../ms-releases/services/releases.service';

@Component({
  selector: 'ms-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit, AfterViewInit {
  public comingItems: Array<any> = [];

  public cardHover: Array<boolean> = [];

  public imgHeigth: 100;

  constructor(
    public releasesService: ReleasesService,
    private elem: ElementRef
  ) {
  }

  ngOnInit() {
    this.releasesService.getReleasesCommingSoon(true).subscribe(response => {
       this.comingItems = response.data;
     });

    for (let item of this.comingItems) {
      this.cardHover.push(false);
    }
  }

  ngAfterViewInit(){
    // you'll get your through 'elements' below code
    this.setWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setWidth();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.setWidth();
  }

  public setWidth() {
    const elements = this.elem.nativeElement.querySelectorAll('.img-coming-soon');
    if (elements.length > 0) {
      this.imgHeigth = elements[0].width;
    }
  }
  public mouseEnter(index: number) {
    this.cardHover[index] = true;
  }

  public mouseLeave(index: number) {
    this.cardHover[index] = false;
  }

  public buttonBgColor(index: number): string {
    return this.cardHover[index] ? 'black' : 'transparent';
  }

  public textColor(index: number): string {
    return this.cardHover[index] ? 'white' : 'black';
  }

  public bodyBgColor(index: number): string {
    return this.cardHover[index] ? 'rgb(245, 245, 245)' : 'rgb(236, 236, 224)';
  }
}
