import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
    
  miFormulario: FormGroup = this.fb.group({
    user:    [, [ Validators.required]],
    password: [, [ Validators.required]],
  });

  constructor( private fb: FormBuilder,
               private router: Router, 
               private authService: AuthService) { }


  login() {
    const { user, password } = this.miFormulario.value;
    this.authService.login( user, password )
      .subscribe( ok => {          
        if ( ok === true ) {
          this.router.navigateByUrl('/catalogoCliente');
          sessionStorage.setItem('usuario', user);
        } else {
          Swal.fire('Error', ok, 'error');

  }});
}
}
