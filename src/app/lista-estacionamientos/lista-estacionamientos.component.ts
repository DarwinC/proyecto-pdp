import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";
import { EstacionamientosService } from "../services/estacionamientos.service";
import { MatriculasService } from "../services/matriculas.service";

@Component({
  selector: "app-lista-estacionamientos",
  templateUrl: "./lista-estacionamientos.component.html",
  styleUrls: ["./lista-estacionamientos.component.css"]
})
export class ListaEstacionamientosComponent implements OnInit {
  estacionamientos;

  constructor(
    private estacionamientosService: EstacionamientosService,
    private matriculasService: MatriculasService,
    private router: Router,
    private usuariosService: UsuarioService
  ) {}

  ngOnInit() {
    if (
      !this.usuariosService.isLoggedIn() &&
      this.usuariosService.isAdminUser()
    ) {
      this.router.navigate([""]);
    }
    this.obtenerEstacionamientos();
  }

  obtenerEstacionamientos() {
    this.estacionamientosService.getAll().subscribe(
      a => {
        console.log(a);
        this.estacionamientos = a;
        console.log("Se consulto el listado de matriculas");
      },
      err => {
        if (err.status === 500) {
          console.log("Ha ocurrido un error en el servidor");
        }
      }
    );
  }
/*
  eliminar(idestacionamiento) {

    this.estacionamientosService.remove(idestacionamiento).subscribe(
      a => {
        this.obtenerEstacionamientos();
      },
      err => {
        console.log("Ha ocurrido un error");
        console.log(err);
      }
    );
  }
  */
/*
  modificar(idestacionamiento) {
    this.estacionamientosService.setEstacionamientoId(idestacionamiento);
    this.router.navigate(["matriculas/modificar/"]);
  }
*/
  obtenerUsuario(idusuario) {
    let email = "";
    console.log("El usuario a buscar" + idusuario);
    const usuario_tmp = this.usuariosService.getUsuarioById(idusuario);

    console.log(usuario_tmp);

    if (usuario_tmp["usr"] != null) {
      console.log("Encuentra el usuario" + usuario_tmp["usr"]);
      console.log(usuario_tmp["usr"]["email"]);
      email = usuario_tmp["usr"]["email"];
    }
    return email;
  }

  obtenerMatricula(idmatricula) {
    let matricula_tmp = "";
    console.log("El usuario a buscar" + idmatricula);
    let matricula  = this.matriculasService.getMatriculaById(idmatricula);
    if (matricula!= null) {
      console.log("Encuentra la matricula" + matricula);
      console.log(matricula);
      matricula_tmp = matricula["serie"];
    }
    return matricula_tmp;
  }
}
