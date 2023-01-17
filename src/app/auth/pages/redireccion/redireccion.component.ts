import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redireccion',
  templateUrl: './redireccion.component.html',
  styles: [
  ]
})
export class RedireccionComponent {
  constructor( private router: Router) { }


      redireccionar(){
        this.router.navigateByUrl('/login');
      }
}
