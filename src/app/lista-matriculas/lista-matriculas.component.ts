import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";
import { MatriculasService } from "../services/matriculas.service";

@Component({
  selector: "app-lista-matriculas",
  templateUrl: "./lista-matriculas.component.html",
  styleUrls: ["./lista-matriculas.component.css"]
})
export class ListaMatriculasComponent implements OnInit {
  matriculas;
  //usuarios;
  constructor(
    private matriculasService: MatriculasService,
    private router: Router,
    private usuariosService: UsuarioService
  ) {}

  /*
  clickMe(){
    alert("Bootstap working");
  }
  */
  ngOnInit() {
    if (
      !this.usuariosService.isLoggedIn() &&
      this.usuariosService.isAdminUser()
    ) {
      this.router.navigate([""]);
    }
    this.obtenerMatriculas();
  }

  obtenerMatriculas() {
    this.matriculasService.getAll().subscribe(
      a => {
        console.log(a);
        this.matriculas = a;
        console.log("Se consulto el listado de matriculas");
      },
      err => {
        if (err.status === 500) {
          console.log("Ha ocurrido un error en el servidor");
        }
      }
    );
  }

  eliminar(idmatricula) {
    this.matriculas;
    this.matriculasService.remove(idmatricula).subscribe(
      a => {
        this.obtenerMatriculas();
      },
      err => {
        console.log("Ha ocurrido un error");
        console.log(err);
      }
    );
  }

  modificar(idmatricula) {
    this.matriculasService.setMatriculaId(idmatricula);
    this.router.navigate(["matriculas/modificar/"]);
  }

  obtenerUsuario(idusuario) {
    let email = "";
    console.log("El usuario a buscar" + idusuario);
    const usuario_tmp = this.usuariosService.getUsuarioById(idusuario);

console.log(usuario_tmp);

    if (usuario_tmp['usr'] != null) {
      console.log("Encuentra el usuario" + usuario_tmp["usr"]);
      console.log(usuario_tmp["usr"]["email"]);
      email = usuario_tmp["usr"]["email"];
    }
    return email;
  }
}
