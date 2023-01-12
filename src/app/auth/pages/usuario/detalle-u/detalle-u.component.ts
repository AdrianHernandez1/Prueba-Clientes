import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-u',
  templateUrl: './detalle-u.component.html',
  styles: [
  ]
})
export class DetalleUComponent {
 
  ngOnInit():void {    
  }   

  
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

miFormulario: FormGroup = this.fb.group({
  name:     [, [ Validators.required ,Validators.minLength(4), Validators.maxLength(15) ]],
  email:    [, [ Validators.required,Validators.minLength(4), Validators.email, Validators.maxLength(70)]],
  password: [, [ Validators.required,Validators.minLength(4), Validators.maxLength(8) ]],
  idRole_User:    [, [ Validators.required,Validators.minLength(1), Validators.maxLength(5)]]
  });

  registro() {
      const { 
      name,
      password,
      email,
      idRole_User
      } = this.miFormulario.value;
  
      this.authService.registroUsuario( name,
        password,
        email,
        idRole_User)
        .subscribe( ok => {
          Swal.fire({
                      icon: 'success',
                      title: 'Se guardo el usuario con exito',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.router.navigateByUrl('./catalogoUsuario');
        },(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error
          })
        });
  
    }

   

    Buscar(){
      Swal.fire({
        icon: 'info',
        title: 'Esta función no se encuentra activa',
        showConfirmButton: false,
        timer: 1500
      });
    }
}
