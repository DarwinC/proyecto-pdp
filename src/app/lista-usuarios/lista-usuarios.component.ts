import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.css"]
})
export class ListaUsuariosComponent implements OnInit {
  usuarios;

  constructor(
    private router: Router,
    private usuariosService: UsuarioService
  ) {}

  /*
  clickMe(){
    alert("Bootstap working");
  }
  */
  ngOnInit() {
    if (!this.usuariosService.isLoggedIn()&&this.usuariosService.isAdminUser()) {
      this.router.navigate([""]);
    }

    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.getAll().subscribe(
      a => {
        console.log(a);
        this.usuarios = a;
        console.log("Se consulto el listado de usuarios");
      },
      err => {
        if (err.status === 500) {
          console.log("Ha ocurrido un error en el servidor");
        }
      }
    );
  }

  Baja(idusuario) {
    this.usuarios;
    this.usuariosService.bajaUsuario(idusuario).subscribe(
      a => {
        this.obtenerUsuarios();
      },
      err => {
        console.log("Ha ocurrido un error");
        console.log(err);
      }
    );
  }

  Alta(idusuario) {
    this.usuarios;
    this.usuariosService.altaUsuario(idusuario).subscribe(
      a => {
        this.obtenerUsuarios();
      },
      err => {
        console.log("Ha ocurrido un error");
        console.log(err);
      }
    );
  }

EsActivo(usuario){
  return this.usuariosService.isActivo(usuario);
}

  modificar(idusuario) {
    this.usuariosService.setUsuarioCompartir(idusuario);
    this.router.navigate(["usuarios/modificar/"]);
  }
  
}
