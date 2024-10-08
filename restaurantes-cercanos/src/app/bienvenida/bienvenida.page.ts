import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    localStorage.removeItem('terminosAceptados'); // Elimina los términos cada vez que se carga la página
    const terminosAceptados = localStorage.getItem('terminosAceptados');
    console.log('Términos aceptados:', terminosAceptados); // Mensaje de depuración
    if (terminosAceptados === 'true') {
      this.navCtrl.navigateRoot('/buscar'); // Redirigir si los términos fueron aceptados
    }
  }  
  
  aceptarTerminos() {
    localStorage.setItem('terminosAceptados', 'true');
    console.log('Términos aceptados'); // Mensaje de depuración
    this.navCtrl.navigateRoot('/buscar');
  }
}
