import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Shop} from '../../models/shops';

declare var ol: any;

@Component({
  selector: 'ms-single-shop-map',
  templateUrl: './single-shop-map.component.html',
  styleUrls: ['./single-shop-map.component.scss']
})
export class SingleShopMapComponent implements OnInit, AfterViewInit {

  @Input() shop: Shop;

  latitude = 48.86820;
  longitude = 2.36186;

  map: any;

  constructor() {
  }

  ngOnInit() {
    this.latitude = this.shop.lat;
    this.longitude = this.shop.lon;
    this.generateMap();
  }

  private generateMap() {
    const style = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.9],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'assets/images/marker-blue.png',
        scale: 0.1
      })
    });

    const marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([this.longitude, this.latitude])
      ),
    });

    const vectorSource = new ol.source.Vector({
      features: [marker]
    });

    const markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: style
    });

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        markerVectorLayer
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 16
      })
    });
  }

  ngAfterViewInit() {
    this.map.setTarget('map');
  }

}
