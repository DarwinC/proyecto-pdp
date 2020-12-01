import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  usuario;
  constructor(
    private userService:UsuarioService,
    private router: Router,
  ) { }

  logueado(){
    return this.userService.isLoggedIn();
  }

  usuarioLogueado(){
    return this.userService.getUser().email;
  }

  ngOnInit() {
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['']);
    }
    
  }

  logOut(){
    this.userService.setUser(null);
    this.router.navigate(['']);
  }
    
  

}