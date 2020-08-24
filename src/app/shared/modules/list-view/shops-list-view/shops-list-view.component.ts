import { Component, Input, OnInit } from '@angular/core';
import { Shop } from 'src/app/moresneakers-web/modules/ms-shops/models/shops';
import {MsRoutingService} from '../../../../routing/services/ms-routing-service';

@Component({
  selector: 'ms-shops-list-view',
  templateUrl: './shops-list-view.component.html',
  styleUrls: ['./shops-list-view.component.scss']
})
export class ShopsListViewComponent implements OnInit {
  @Input() itemsToShow: Array<Shop>;

  @Input() buttonText: string;

  public items: Array<Shop> = [];

  constructor(private routingService: MsRoutingService) {
  }

  ngOnInit() {
    this.items = this.itemsToShow;

    if (this.buttonText == null || this.buttonText === '') {
      this.buttonText = 'SHOP DETAILS';
    }
  }

  getRoute(name) {
    return this.routingService.getRouterName(name);
  }
}
