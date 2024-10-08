import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];

  constructor() {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    const favoritosGuardados = localStorage.getItem('restaurantesFavoritos');
    if (favoritosGuardados) {
      this.favoritos = JSON.parse(favoritosGuardados);
    }
  }

  eliminarFavorito(index: number) {
    this.favoritos.splice(index, 1);
    localStorage.setItem('restaurantesFavoritos', JSON.stringify(this.favoritos));
  }
}
