import { Component, OnInit } from '@angular/core';
import { MapService } from './service/map.service';
import { AppService } from '../app.service';
import * as mapboxgl from 'mapbox-gl';
import { interval } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  coordinates : Array<Array<number>> = [];
  geoDataList : Array<any> = [];
  marker;
  mapData;
  minValue = 0;
  maxValue = 100;
  value = new FormControl(0);
  step = 1;
  startTime;
  endTime;
  index : number = 0; 

  constructor(private mapService : MapService,
              private appService : AppService) { }

  ngOnInit() {
      this.mapService.buildMap();

      this.mapService.map.on('load', ()=> {

        this.appService.getData().subscribe((result:any)=>{

          this.geoDataList = result;
          this.startTime = this.geoDataList[0].date * 1000;
          this.endTime = this.geoDataList[this.geoDataList.length-1].date * 1000;

          this.getCoordinateList(this.geoDataList);
          this.getMapData();
          this.moveMarker();
           
      })
    })
  } 

  getCoordinateList(geoDataList){
    geoDataList.forEach(val=>{
      let subArr : Array<number> = [];
      subArr.push(Number(val.siteCoordinates.longitude));
      subArr.push(Number(val.siteCoordinates.latitude));
      this.coordinates.push(subArr);
      this.maxValue = this.coordinates.length;
    })
  }

  getMapData(){
    this.mapData = {
      type: "FeatureCollection",
      features: [
      {
          type: "Feature",
          geometry: {
              type: "LineString",
              coordinates: this.coordinates
          }
      }]
    }
    this.mapData.features[0].geometry.coordinates = [this.coordinates[0]];
    this.mapService.map.addSource('trace', { type: 'geojson', data: this.mapData });
    this.mapService.map.addLayer({
      'id': 'trace',
      'type': 'line',
      'source': 'trace',
      'paint': {
      'line-color': 'orange',
      'line-opacity': 0.75,
      'line-width': 2
      }
      });
      this.marker = new mapboxgl.Marker({color:'orange'})
          .setLngLat(this.coordinates[0])
          .addTo(this.mapService.map);
      // setup the viewport
     this.mapService.map.jumpTo({ 'center': this.coordinates[0], 'zoom': 18 });
     this.mapService.map.setPitch(30);
  }

  moveMarker(){
    interval(1000).
      subscribe((x) => {
        if (this.index < this.coordinates.length) {
          this.value.setValue(this.index);
          this.startTime = this.geoDataList[this.index].date * 1000;
          this.mapData.features[0].geometry.coordinates.push(this.coordinates[this.index]);
          this.marker.setLngLat(this.coordinates[this.index])
          this.mapService.map.getSource('trace').setData(this.mapData);
          this.index++;
        } 
       });
  }

  shiftTime(){
    this.index = this.value.value;
    this.startTime = this.geoDataList[this.index].date * 1000;
    this.mapData.features[0].geometry.coordinates = this.coordinates.slice(0,this.index);
    this.marker.setLngLat(this.coordinates[this.index])
    this.mapService.map.getSource('trace').setData(this.mapData);
  }
}
