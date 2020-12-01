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
  
  obtenerEmailUsuarioById(idusuario){
    return this.usuarios.find(element=>element['_id']===idusuario)['email'];
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
