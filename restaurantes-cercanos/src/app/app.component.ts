import { Component } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    // Escucha el evento de salir de la aplicación
    App.addListener('backButton', () => {
      localStorage.removeItem('terminosAceptados'); // Elimina los términos aceptados al salir
    });
  }
}
