import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  user;
  usuario_id: string;

  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return !!this.user;
  }

isAdminUser(){
  if(this.isLoggedIn())
    return (this.user.tipo==="Administrador");
}
  isActivo(usuario){
    return (usuario.estado==='ACTIVO');
  }
  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  getUsuarioById(usuario_id) {
    const user = this.getUser();
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token
    };

    //const headers = {"Content-Type": "application/json", "Authorization": "Bearer "+user.token};
    // const body = JSON.stringify({itemIndex});
    return this.http.get(
      `https://pdp-ort-dc.herokuapp.com/administrador/usuarios/` + usuario_id,
      { headers }
    );
  }

  setUsuarioCompartir(id_usuario) {
    this.usuario_id = id_usuario;
  }

  getAll() {
    const user = this.getUser();
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token
    };

    //const headers = {"Content-Type": "application/json", "Authorization": "Bearer "+user.token};
    // const body = JSON.stringify({itemIndex});
    return this.http.get(
      `https://pdp-ort-dc.herokuapp.com/administrador/usuarios`,
      { headers }
    );
  }

  bajaUsuario(id) {
    const user = this.getUser();
    const estado = "INACTIVO";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token
    };
    const body = JSON.stringify({ estado });

    return this.http.put(
      `https://pdp-ort-dc.herokuapp.com/administrador/usuarios/` + id,
      body,
      {
        headers
      }
    );
  }

  altaUsuario(id) {
    const user = this.getUser();
    const estado = "ACTIVO";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token
    };
    const body = JSON.stringify({ estado });

    return this.http.put(
      `https://pdp-ort-dc.herokuapp.com/administrador/usuarios/` + id,
      body,
      {
        headers
      }
    );
  }

  login(usuario, password) {
    const headers = { "Content-Type": "application/json" };

    const body = JSON.stringify({
      usr: usuario,
      pwd: password
    }); /*JSON.stringify(
      { usuario, password }
      );*/

    return this.http.post("https://pdp-ort-dc.herokuapp.com/login", body, {
      headers
    });
  }

  register(nombre, apellido, email, telefono, estado, password) {
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      estado: estado,
      password: password
    });

    return this.http.post("https://pdp-ort-dc.herokuapp.com/registro", body, {
      headers
    });
  }
}
