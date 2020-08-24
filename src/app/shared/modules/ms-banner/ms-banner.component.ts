import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ms-banner',
  templateUrl: './ms-banner.component.html',
  styleUrls: ['./ms-banner.component.scss']
})
export class MsBannerComponent implements OnInit {

  @Input() isBrand: boolean = false;

  @Input() title = '';
  @Input() titleItalic = '';
  @Input() subtitleLine1 = '';
  @Input() subtitleLine2 = '';

  @Input() textTitle = '';
  @Input() text = '';

  @Input() imageUrl = '';

  @Input() backgroundImage = '';

  @Input() color = 'white';

  constructor() { }

  ngOnInit() {
  }
}
