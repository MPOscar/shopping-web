import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'ms-social-section',
  templateUrl: './social-section.component.html',
  styleUrls: ['./social-section.component.scss']
})
export class SocialSectionComponent implements AfterViewInit {
  @ViewChild('twitterDiv') twitterDiv: ElementRef;
  public twitterWidth = 430;

  constructor() {
  }

  ngAfterViewInit(): void {
    // Init Instagram
    // @ts-ignore
    instgrm.Embeds.process();

    // Init Twitter
    // @ts-ignore
    twttr.widgets.load();

    this.twitterWidth = this.twitterDiv.nativeElement.offsetWidth;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.twitterWidth = this.twitterDiv.nativeElement.offsetWidth;
  }
}
