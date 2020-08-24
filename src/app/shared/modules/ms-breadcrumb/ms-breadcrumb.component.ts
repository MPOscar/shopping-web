import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ms-breadcrumb',
  templateUrl: './ms-breadcrumb.component.html',
  styleUrls: ['./ms-breadcrumb.component.scss']
})
export class MsBreadcrumbComponent implements OnInit {
  public path: Array<String> = [];

  @Input() steps: Array<string> = ["Home","Release Calendar"]

  constructor() { }

  ngOnInit() {
    this.path.push('Home');
    this.path.push('Short Name');
    this.path.push('Looooooooooooooong Name');
    this.path.push('Last Step');
  }

}
