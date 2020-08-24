import {Component, OnInit} from '@angular/core';
//
import {ReleasesService} from '../../../ms-releases/services/releases.service';

@Component({
  selector: 'ms-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  public comingItems: Array<any> = [];

  public cardHover: Array<boolean> = [];

  constructor(public releasesService: ReleasesService) {
  }

  ngOnInit() {
    this.releasesService.getReleasesCommingSoon(true).subscribe(response => {
       this.comingItems = response.data;
     });

    for (let item of this.comingItems) {
      this.cardHover.push(false);
    }

    // this.comingItems = [
    //   {
    //     'id': '6ea4a1d5-6226-4112-b260-4882e561011d',
    //     'createdAt': '2019-01-14T01:10:39.000Z',
    //     'updatedAt': '2019-01-14T15:10:36.000Z',
    //     'sku': 'AQ9758-300',
    //     'name': 'Nike Air Force 1 Utility Mid ‘Spruce Fog’',
    //     'description': '',
    //     'images': [{
    //       'id': 'bfc77712-6a13-4523-8930-c466c42d163b',
    //       'createdAt': '2019-01-14T15:10:31.000Z',
    //       'updatedAt': '2019-01-14T15:10:31.000Z',
    //       'fileName': null,
    //       'imgUrl': 'assets/images/moc-images/home/coming-soon-adidas-nitron.png'
    //     }],
    //     'mainImage': 'assets/images/moc-images/home/coming-soon-adidas-nitron.png',
    //     'releaseDate': '2019-01-27T23:00:00.000Z',
    //     'color': 'green',
    //     'hot': false,
    //     'customized': false,
    //     'priceUSD': 170,
    //     'priceGBP': 23,
    //     'priceEUR': 23,
    //     'gender': 'm',
    //     'styleId': '8c70854e-ad35-4d9e-b4d0-d4584a91ef80',
    //     'brandId': 'a5a50cea-fc2d-4249-8b5a-a657feba70f5'
    //   },
    //   {
    //     'id': '703a510f-8687-4501-b82f-83920f1491d9',
    //     'createdAt': '2019-01-10T16:45:46.000Z',
    //     'updatedAt': '2019-01-14T15:17:09.000Z',
    //     'sku': 'Ao2441-800',
    //     'name': 'Nike Air Force 1 07 LV8 Realtree ‘Desert Camo’',
    //     'description': '',
    //     'images': [{
    //       'id': '24af7659-2ae4-4dc8-af54-f85e43e17e93',
    //       'createdAt': '2019-01-14T15:16:52.000Z',
    //       'updatedAt': '2019-01-14T15:16:52.000Z',
    //       'fileName': null,
    //       'imgUrl': 'assets/images/moc-images/home/coming-soon-black-god.png'
    //     }, {
    //       'id': 'cd608fb6-ec9c-40c7-b563-d0a1bc58ebd3',
    //       'createdAt': '2019-01-14T15:17:09.000Z',
    //       'updatedAt': '2019-01-14T15:17:09.000Z',
    //       'fileName': null,
    //       'imgUrl': 'assets/images/moc-images/home/coming-soon-black-god.png'
    //     }],
    //     'mainImage': 'assets/images/moc-images/home/coming-soon-black-god.png',
    //     'releaseDate': '2019-02-03T05:00:00.000Z',
    //     'color': 'blue,orange',
    //     'hot': false,
    //     'customized': false,
    //     'priceUSD': 100,
    //     'priceGBP': 23,
    //     'priceEUR': 23,
    //     'styleId': '8c70854e-ad35-4d9e-b4d0-d4584a91ef80',
    //     'brandId': 'a5a50cea-fc2d-4249-8b5a-a657feba70f5'
    //   },
    //   {
    //     'id': '6ea4a1d5-6226-4112-b260-4882e561011d',
    //     'createdAt': '2019-01-14T01:10:39.000Z',
    //     'updatedAt': '2019-01-14T15:10:36.000Z',
    //     'sku': 'AQ9758-300',
    //     'name': 'Nike Air Force 1 Utility Mid ‘Spruce Fog’',
    //     'description': '',
    //     'images': [{
    //       'id': 'bfc77712-6a13-4523-8930-c466c42d163b',
    //       'createdAt': '2019-01-14T15:10:31.000Z',
    //       'updatedAt': '2019-01-14T15:10:31.000Z',
    //       'fileName': null,
    //       'imgUrl': 'assets/images/moc-images/home/coming-soon-nike-360.png'
    //     }],
    //     'mainImage': 'assets/images/moc-images/home/coming-soon-nike-360.png',
    //     'releaseDate': '2019-01-27T23:00:00.000Z',
    //     'color': 'green',
    //     'hot': false,
    //     'customized': false,
    //     'priceUSD': 170,
    //     'priceGBP': 23,
    //     'priceEUR': 23,
    //     'gender': 'm',
    //     'styleId': '8c70854e-ad35-4d9e-b4d0-d4584a91ef80',
    //     'brandId': 'a5a50cea-fc2d-4249-8b5a-a657feba70f5'
    //   },
    //   {
    //     'id': '703a510f-8687-4501-b82f-83920f1491d9',
    //     'createdAt': '2019-01-10T16:45:46.000Z',
    //     'updatedAt': '2019-01-14T15:17:09.000Z',
    //     'sku': 'Ao2441-800',
    //     'name': 'Nike Air Force 1 07 LV8 Realtree ‘Desert Camo’',
    //     'description': '',
    //     'images': [{
    //       'id': '24af7659-2ae4-4dc8-af54-f85e43e17e93',
    //       'createdAt': '2019-01-14T15:16:52.000Z',
    //       'updatedAt': '2019-01-14T15:16:52.000Z',
    //       'fileName': null,
    //       'imgUrl': 'assets/images/moc-images/home/coming-soon-fenix-fire.png'
    //     }, {
    //       'id': 'cd608fb6-ec9c-40c7-b563-d0a1bc58ebd3',
    //       'createdAt': '2019-01-14T15:17:09.000Z',
    //       'updatedAt': '2019-01-14T15:17:09.000Z',
    //       'fileName': null,
    //       'imgUrl': 'assets/images/moc-images/home/coming-soon-fenix-fire.png'
    //     }],
    //     'mainImage': 'assets/images/moc-images/home/coming-soon-fenix-fire.png',
    //     'releaseDate': '2019-02-03T05:00:00.000Z',
    //     'color': 'blue,orange',
    //     'hot': false,
    //     'customized': false,
    //     'priceUSD': 100,
    //     'priceGBP': 23,
    //     'priceEUR': 23,
    //     'styleId': '8c70854e-ad35-4d9e-b4d0-d4584a91ef80',
    //     'brandId': 'a5a50cea-fc2d-4249-8b5a-a657feba70f5'
    //   }
    // ];
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
