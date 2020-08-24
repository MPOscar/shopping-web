import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { ShopsService } from '../../services/shops.service';
import { Shop } from '../../models/shops';
import { Subscription } from 'rxjs';
import {MsRoutingService} from '../../../../../routing/services/ms-routing-service';


@Component({
  selector: 'ms-shops-letter-table',
  templateUrl: './shops-letter-table.component.html',
  styleUrls: ['./shops-letter-table.component.scss']
})
export class ShopsLetterTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input() shops: Array<any>;

  letters: Array<string> = [];

  localIDForLinks: Array<string> = [];

  shopsByLetter: Array<Array<any>> = [];

  shippingCountries: string;

  asciiOfA: number;

  asciiOfZ: number;

  subscriptions: Subscription[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public shopsService: ShopsService,
    private routingService: MsRoutingService) {
  }

  ngOnInit() {
    let utilStr = 'A';
    this.asciiOfA = utilStr.charCodeAt(0);
    utilStr = 'Z';
    this.asciiOfZ = utilStr.charCodeAt(0);


    this.shippingCountries = this.activatedRoute.snapshot.queryParams.shippingCountries;

    this.createShopsByLetter();
    this.generateLetters();
    this.generateLocalIdForLinks();

    this.groupShopsByLetter();

    //this.generateMocShops();
  }

  ngOnChanges(): void {
    this.groupShopsByLetter();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private createShopsByLetter() {
    // Create empty subarrays
    for (let i = this.asciiOfA; i <= this.asciiOfZ; ++i) {
      this.shopsByLetter.push([]);
    }
    // One more for other characters
    this.shopsByLetter.push([]);
  }

  private groupShopsByLetterClean() {

    this.shops.forEach(shop => {
      const letter = shop.name.toUpperCase().charCodeAt(0);

      let pos = letter - this.asciiOfA;

      // if is not a letter then insert at the end
      if (letter < this.asciiOfA || letter > this.asciiOfZ) {
        pos = this.shopsByLetter.length - 1;
      }

      this.shopsByLetter[pos] = [];
    });
  }

  private groupShopsByLetter() {
    this.cleanShopsByLetter();
    this.shops.forEach(shop => {
      const letter = shop.name.toUpperCase().charCodeAt(0);

        let pos = letter - this.asciiOfA;

        // if is not a letter then insert at the end
        if (letter < this.asciiOfA || letter > this.asciiOfZ) {
          pos = this.shopsByLetter.length - 1;
        }

        this.shopsByLetter[pos].push(shop);

      });
  }

  private cleanShopsByLetter() {
    this.shopsByLetter.forEach((item, index) => {
      this.shopsByLetter[index] = [];
    });
  }

  private generateLetters() {
    for (let letter = this.asciiOfA; letter <= this.asciiOfZ; ++letter) {
      const c = String.fromCharCode(letter);

      this.letters.push(c);
    }

    // One more special Tag
    this.letters.push('OTHER');
  }

  private generateLocalIdForLinks() {
    for (let letter = this.asciiOfA; letter <= this.asciiOfZ; ++letter) {
      const c = String.fromCharCode(letter);

      this.localIDForLinks.push('id' + c);
    }

    this.localIDForLinks.push('id' + 'Special');
  }

  private generateMocShops() {

    for (let letter = this.asciiOfA; letter <= this.asciiOfZ; ++letter) {

      if (letter % 3 === 0) {

        const c = String.fromCharCode(letter);

        this.shops.push({
          name: c + ' Sneakers Shop 1',
          mainImage: 'assets/images/images-server/imgr0eh4jjqwghnil.jpg',
          link: '#'
        });

        this.shops.push({
          name: c + ' Sneakers Shop 2',
          mainImage: 'assets/images/images-server/imgr0e6yajq8poocw.jpg',
          link: '#'
        });

        this.shops.push({
          name: c + ' Sneakers Shop 3',
          mainImage: 'assets/images/images-server/imgr0eh4jjqwgtlh1.jpg',
          link: '#'
        });

        this.shops.push({
          name: c + ' Sneakers Shop 4',
          mainImage: 'assets/images/images-server/imgr0e6qwjqpdmkj9.jpg',
          link: '#'
        });

        this.shops.push({
          name: c + ' Sneakers Shop 3',
          mainImage: 'assets/images/images-server/imgr0eh4jjqwgtlh1.jpg',
          link: '#'
        });

        this.shops.push({
          name: c + ' Sneakers Shop 4',
          mainImage: 'assets/images/images-server/imgr0e6qwjqpdmkj9.jpg',
          link: '#'
        });

      }
    }

  }

  getRoute(name) {
    return this.routingService.getRouterName(name);
  }
}
