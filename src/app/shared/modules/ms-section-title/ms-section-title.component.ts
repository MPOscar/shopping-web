import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ms-section-title',
  templateUrl: './ms-section-title.component.html',
  styleUrls: ['./ms-section-title.component.scss']
})
export class MsSectionTitleComponent implements OnInit {
  @Input() title = '';
  @Input() titleItalic = '';

  constructor() { }

  ngOnInit() {
  }

}
