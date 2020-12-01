import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "../services/usuario.service";

@Injectable({
  providedIn: "root"
})
export class EstacionamientosService {
  //list=[];
  estacionamiento_id: string;
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  getAll() {
    const user = this.usuarioService.getUser();
    const headers = {"Content-Type": "application/json","Authorization": "Bearer "+user.token};

    //const headers = {"Content-Type": "application/json", "Authorization": "Bearer "+user.token};
    // const body = JSON.stringify({itemIndex});
    return this.http.get(
      `https://pdp-ort-dc.herokuapp.com/administrador/estacionamientos`,
      { headers }
    );
  }
/*
  update(id, serie) {
    const user = this.usuarioService.getUser();
    const headers = {"Content-Type": "application/json","Authorization": "Bearer "+user.token};

    const body = JSON.stringify({serie});

    return this.http.put(`https://pdp-ort-dc.herokuapp.com/administrador/estacionamientos/`+id, body, {
      headers
    });
  }
*/

  remove(index) {
    // this.list.splice(itemIndex);
    const user = this.usuarioService.getUser();
    //const body = { matricula: index };
    const headers = {"Content-Type": "application/json","Authorization": "Bearer "+user.token};
    //return this.http.delete(`https://xpense.develotion.com/gastos.php`,{[headers,body]);

    return this.http.delete(`https://pdp-ort-dc.herokuapp.com/administrador/estacionamientos/`+index,
      { headers: headers }
    );
  }

  setEstacionamientoId(id) {
    this.estacionamiento_id = id;
  }

  getEstacionamientoId() {
    return this.estacionamiento_id;
  }

  getEstacionamientoById(estacionamiento_id){
    const user = this.usuarioService.getUser();
    const headers = {"Content-Type": "application/json","Authorization": "Bearer "+user.token};

    //const headers = {"Content-Type": "application/json", "Authorization": "Bearer "+user.token};
    // const body = JSON.stringify({itemIndex});
    return this.http.get(
      `https://pdp-ort-dc.herokuapp.com/administrador/estacionamientos/`+estacionamiento_id,
      { headers }
    );
  }
}
