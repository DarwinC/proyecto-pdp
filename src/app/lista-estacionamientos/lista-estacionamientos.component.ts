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
  usuarios;
  matriculas;

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
    this.obtenerUsuarios();
  }

  obtenerEstacionamientos() {
    this.estacionamientosService.getAll().subscribe(
      a => {
        console.log(a);
        this.estacionamientos = a;
        console.log("Se consulto el listado de estacionamientos");
      },
      err => {
        if (err.status === 500) {
          console.log("Ha ocurrido un error en el servidor");
        }
      }
    );
  }

  obtenerMatriculas() {
    this.matriculasService.getAll().subscribe(
      a => {
        console.log(a);
        this.matriculas = a;
        this.obtenerEstacionamientos();
        console.log("Se consulto el listado de matriculas");
      },
      err => {
        if (err.status === 500) {
          console.log("Ha ocurrido un error en el servidor");
        }
      }
    );
  }

  obtenerUsuarios() {
    this.usuariosService.getAll().subscribe(
      a => {
        console.log(a);
        this.usuarios = a;
        this.obtenerMatriculas();
        console.log("Se consulto el listado de usuarios");
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

  obtenerEmailUsuarioById(idusuario) {
    return this.usuarios.find(element => element["_id"] === idusuario)["email"];
  }

  obtenerMatricula(idmatricula) {
    return this.matriculas.find(element => element["_id"] === idmatricula)[
      "serie"
    ];
  }

  formatearFecha(fecha) {
    let fechaDate = new Date(fecha);

    let day = (fechaDate.getDate()<10)?'0'+(fechaDate.getDate()).toString():fechaDate.getDate().toString();
    let month = ((fechaDate.getMonth() + 1)<10)?'0'+(fechaDate.getMonth() + 1).toString():(fechaDate.getMonth() + 1).toString();
    let year = fechaDate.getFullYear();
    let hour = (fechaDate.getHours()<10)?'0'+(fechaDate.getHours()).toString():fechaDate.getHours().toString();

    let min = (fechaDate.getMinutes()<10)?'0'+(fechaDate.getMinutes()).toString():fechaDate.getMinutes().toString();
    let sec = (fechaDate.getSeconds()<10)?'0'+(fechaDate.getSeconds()).toString():fechaDate.getSeconds().toString();

    console.log(`${day}-${month}-${year} ${hour}:${min}:${sec}`);
    return `${day}-${month}-${year} ${hour}:${min}:${sec}`;
  }
}
