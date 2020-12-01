import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";
import { MatriculasService } from "../services/matriculas.service";

@Component({
  selector: 'app-lista-estacionamientos',
  templateUrl: './lista-estacionamientos.component.html',
  styleUrls: ['./lista-estacionamientos.component.css']
})
export class ListaEstacionamientosComponent implements OnInit {

    constructor(
    private matriculasService: MatriculasService,
    private router: Router,
    private usuariosService: UsuarioService
  ) {}

  ngOnInit() {
        if (!this.usuariosService.isLoggedIn()&&this.usuariosService.isAdminUser()) {
      this.router.navigate([""]);
    }
  }

}