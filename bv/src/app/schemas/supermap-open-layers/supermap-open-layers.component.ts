import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ReplaySubject, Subject} from 'rxjs';
import {Collection, Feature, Map, View} from 'ol';
import {Coordinate, createStringXY} from 'ol/coordinate';
import {defaults as DefaultControls, MousePosition} from 'ol/control';
import proj4 from 'proj4';
// import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import {register} from 'ol/proj/proj4';
import {get as GetProjection, useGeographic} from 'ol/proj'
import {Extent} from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {Icon, Style} from 'ol/style';
import {Point} from 'ol/geom';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Translate} from 'ol/interaction';

@Component({
  selector: 'app-supermap-open-layers',
  templateUrl: './supermap-open-layers.component.html',
  styleUrls: ['./supermap-open-layers.component.css']
})
export class SupermapOpenLayersComponent implements OnInit, AfterViewInit {

  showLink = false;
  shown = true;
  addressData = new ReplaySubject(1);
  coordinatesData = new ReplaySubject(1);
  Coordinates: {lat: number, lng: number};


  mapProperties = {zoom: 2, lat: 41, lng: 65 };
  startPosition = { lat: 41, lng: 65 };
  lt = 0;
  lg = 0;
  markers: any[] = [
  ];


// @ts-ignore
  @Input() reloadSubj: Subject = false;
// @ts-ignore
  @Input() forcedShown = false;
// @ts-ignore
  @Input() routerData;
// @ts-ignore
  @Input() currentData: Subject;
// @ts-ignore
  @Input() downloadedData: Subject;


  @Input() center: Coordinate;
  @Input() zoom: number;
  view: View;
  projection: Projection;
  extent: Extent = [-20026376.39, -20048966.10,
    20026376.39, 20048966.10];
  map: Map;
  // layer: TileLayer;
  @Output() mapReady = new EventEmitter<Map>();
  mousePositionControl;

  constructor(private zone: NgZone,
              private cd: ChangeDetectorRef,
              private yService: RequestsService) { }


  ngAfterViewInit():void {
    if (! this.map) {
      this.zone.runOutsideAngular(() => this.initMap())
    }
    setTimeout(()=>this.mapReady.emit(this.map));




  }

  private initMap(): void{
    proj4.defs("EPSG:4326");
    useGeographic();
    register(proj4)
    this.projection = GetProjection("EPSG:4326");
    // this.projection.setExtent(this.extent);
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
      projection: this.projection,
    });

    this.mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
    });

// console.log(this.center);
    const coord1 = [this.center[0] * 1, this.center[1] * 1];
    // const coord2 = [this.center[0] * 1 + 0.11, this.center[1] * 1 + 0.11];
    //
    // const lineStyle = new Style({
    //   stroke: new Stroke({ color: '#ffcc33', width: 3 })
    // });
    const styleMarker = new Style({
      image: new Icon({
        scale: .7, anchor: [0.5, 1],
        src: '../../../assets/icons/location-pin.png'
      })
    });
    // location-pin.png
    const marker1 = new Point(coord1);
    const featureMarker1 = new Feature(marker1);
    // const marker2 = new Point(coord2);
    // const featureMarker2 = new Feature(marker2);

    // const line = new LineString([coord1, coord2]);
    // const lineFeature = new Feature(line);

    // const vector = new VectorLayer({
    //   source: new VectorSource({
    //     features: [lineFeature, featureMarker1, featureMarker2]
    //   }),
    //   style: [lineStyle, styleMarker]
    // });

    const vector = new VectorLayer({
      source: new VectorSource({
        features: [ featureMarker1 ]
      }),
      style: [styleMarker]
    });





    this.map = new Map({
      layers: [new TileLayer({
        source: new OSM({})
      }), vector ],
      target: 'map',
      view: this.view,
      controls: DefaultControls({attribution: false, rotateOptions: { autoHide: true }})
        // .extend([this.mousePositionControl])
    });

    // vector.de

    // var map = new ol.Map({
    //   target: 'map',
    //   layers: [new ol.layer.Tile({ source: new ol.source.OSM() }), vector],
    //   view: new ol.View({ center: coord1, zoom: 5 })
    // });

    const translate1 = new Translate({
      features: new Collection([featureMarker1])
    });
    // var translate2 = new Translate({
    //   features: new Collection([featureMarker2])
    // });


    if (this.routerData && this.routerData.editable) {
      this.map.addInteraction(translate1);
      this.showLink = true;
    }
    // map.addInteraction(translate2);

    let coordMarker1;
    let coordMarker2;
    translate1.on('translatestart', evt => {
      coordMarker1 = marker1.getCoordinates();

      console.log(coordMarker1);
    });
    translate1.on('translateend', evt => {
      coordMarker1 = marker1.getCoordinates();

      console.log(coordMarker1);
      const event = {lat: coordMarker1[1], lng: coordMarker1[0]};
      this.coordinatesData.next(event);
      if (this.currentData) {
        this.currentData.next(event);
      }
    });
    // translate1.on('translating', function (evt) {
    //   marker1.setCoordinates(coordMarker2);
    // });
    // translate2.on('translatestart', function (evt) {
    //   coordMarker1 = marker1.getCoordinates();
    // });
    // translate2.on('translating', function (evt) {
    //   line.setCoordinates([coordMarker1, evt.coordinate]);
    //   marker1.setCoordinates(coordMarker1);
    // });

    // this.map.on('pointermove', function(e) {
    //   if (e.dragging) return;
    //   console.log(e);
    //   const hit = e.map.hasFeatureAtPixel(e.map.getEventPixel(e.originalEvent));
    //   e.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    // });
  }


  ngOnInit(): void {

  }













//   addressData = new ReplaySubject(1);
//   coordinatesData = new ReplaySubject(1);
//   Coordinates: {lat: number, lng: number};
//
//
//   mapProperties = {zoom: 2, lat: 41, lng: 65 };
//   startPosition = { lat: 41, lng: 65 };
//   lt = 0;
//   lg = 0;
//   markers: any[] = [
//   ];
//   constructor(private yService: RequestsService) {
//
//   }
//
// // @ts-ignore
//   @Input() forcedShown = false;
// // @ts-ignore
//   @Input() routerData;
// // @ts-ignore
//   @Input() currentData: Subject;
//
//   ngOnInit() {
//   }
//
  markerDragEnd($event) {
    if (!this.routerData.editable) {
      return;
    }
    const event = {lat: $event.coords.lat, lng: $event.coords.lng};
    console.log($event);
    this.coordinatesData.next(event);
    if (this.currentData) {
      this.currentData.next(event);
    }
  }
//
  public placeMarker($event) {
    if (!this.routerData.editable) {
      return;
    }

    // var layer = new ol.layer.Vector({
    //   source: new ol.source.Vector({
    //     features: [
    //       new ol.Feature({
    //         geometry: new ol.geom.Point(ol.proj.fromLonLat([4.35247, 50.84673]))
    //       })
    //     ]
    //   })
    // });
    // map.addLayer(layer);


//     this.coordinatesData.next($event);
//
//     // console.log($event.lat);
//     console.log(this.routerData);
//     const newMarker = {
//       lat: $event.lat,
//       lng: $event.lng,
//       draggable: this.routerData.editable
//     };
//     this.markers.pop();
//     this.markers.push(newMarker);
//     this.yService.geoByCoordinates($event).subscribe((data => {
// // @ts-ignore
//       if (data.address.GeoObjectCollection.featureMember.length) {
// // @ts-ignore
//         this.addressData.next(data.address.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components);
// // @ts-ignore
//       } else if (data.locality.GeoObjectCollection.featureMember.length) {
// // @ts-ignore
//         this.addressData.next(data.locality.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components);
//       } else {
//         this.addressData.next([]);
//       }
//     }));
  }
  placeDownloadedMarker($event) {
    this.coordinatesData.next($event);
    // console.log($event.lat);
    console.log(this.routerData);
    const newMarker = {
      lat: $event.lat,
      lng: $event.lng,
      draggable: this.routerData.editable
    };
    this.markers.pop();
    this.markers.push(newMarker);
    if (this.currentData) {
      this.currentData.next(newMarker);
    }
  }
  getCountriesArray() {
  }
  getMarkerAddress() {
    return this.addressData;
  }
  getMarkerCoordinates() {
    return this.coordinatesData;
  }
  getCoordinates() {

  }

  removeMarker() {
    this.markers.pop();

    const newMarker = {
      lat: null,
      lng: null,
    };

    this.currentData.next(newMarker);
  }
  setZoom(zoom, lt, lg) {
    // this.lt = '0';
    // this.lg = '0';
    this.mapProperties.zoom = zoom;
    this.mapProperties.lat = lt * 1;
    this.mapProperties.lng = lg * 1;
  }
}
