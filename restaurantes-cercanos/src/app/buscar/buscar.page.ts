import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { HttpClient } from '@angular/common/http';

declare var L: any; // Declarar la variable L de Leaflet

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {
  latitude!: number; // Usando el operador de aserción de asignación definitiva
  longitude!: number; // Usando el operador de aserción de asignación definitiva
  map: any;
  restaurantes: any[] = [];
  error: string = '';

  constructor(
    private geolocation: Geolocation,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Geolocalización obtenida:', resp.coords);
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.loadMap();
      this.buscarRestaurantes();
    }).catch((error) => {
      console.error('Error obteniendo la geolocalización', error);
      this.error = 'No se pudo obtener la ubicación. Por favor, habilita la geolocalización en tu dispositivo.';
    });
  }

  loadMap() {
    if (!this.latitude || !this.longitude) {
      console.error('Coordenadas no disponibles');
      return;
    }
    console.log('Cargando mapa en:', this.latitude, this.longitude);
    this.map = L.map('map').setView([this.latitude, this.longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    L.marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Tu ubicación')
      .openPopup();
  }

  buscarRestaurantes() {
    console.log('Buscando restaurantes...');
    const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:1000,${this.latitude},${this.longitude})["amenity"="restaurant"];out;`;
    
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log('Respuesta de la API:', data);
        this.restaurantes = data.elements;
        this.mostrarRestaurantesEnMapa();
      },
      error => {
        console.error('Error al buscar restaurantes:', error);
        this.error = 'No se pudieron cargar los restaurantes. Por favor, inténtalo de nuevo.';
      }
    );
  }

  mostrarRestaurantesEnMapa() {
    console.log('Mostrando', this.restaurantes.length, 'restaurantes en el mapa');
    this.restaurantes.forEach(restaurante => {
      const marker = L.marker([restaurante.lat, restaurante.lon]).addTo(this.map);
      marker.bindPopup(restaurante.tags.name || 'Restaurante sin nombre');
    });
  }
}