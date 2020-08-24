import { Component, Input, OnInit } from '@angular/core';
import {MsRoutingService} from '../../../../../routing/services/ms-routing-service';

@Component({
  selector: 'ms-most-popular-shops',
  templateUrl: './most-popular-shops.component.html',
  styleUrls: ['./most-popular-shops.component.scss']
})
export class MostPopularShopsComponent implements OnInit {

  @Input() shops: Array<any>;

  constructor(private routingService: MsRoutingService) { }

  ngOnInit() {
  }

  getRoute(name) {
    return this.routingService.getRouterName(name);
  }
}
