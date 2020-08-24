import { Component, Input, OnInit } from '@angular/core';
import { Shop } from 'src/app/moresneakers-web/modules/ms-shops/models/shops';
import {MsRoutingService} from '../../../../routing/services/ms-routing-service';

@Component({
  selector: 'ms-collection-shops-list-view',
  templateUrl: './collection-shops-list-view.component.html',
  styleUrls: ['./collection-shops-list-view.component.scss']
})
export class CollectionShopsListViewComponent implements OnInit {
  @Input() itemsToShow: Array<any>;

  @Input() buttonText: string;

  @Input() showDetails = true;

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
