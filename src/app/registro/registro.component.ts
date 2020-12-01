import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UsuarioService } from "../services/usuario.service";
import { Router } from "@angular/router";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  registerForm;
  errMsg;

  constructor(
    private toaster: Toaster,
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      estado: "",
      password: ""
    });
  }

  ngOnInit() {}

  onSubmit(registerData) {
    this.errMsg = undefined;
    // Process checkout data here
    this.registerForm.reset();

    console.warn("Register information", registerData);

    const {
      nombre,
      apellido,
      email,
      telefono,
      estado,
      password
    } = registerData;

    this.userService
      .register(
        nombre,
        apellido,
        email,
        telefono,
        estado,
        password
      )
      .subscribe(
        user => {
          this.userService.setUser(user);
          console.log(user);
          this.router.navigate(["/login"]);
        },
        err => {
          const estado_error = err.status;
          switch (estado_error) {
            case 409:
              this.errMsg =
                "Ya existe un usuario con las credenciales ingresadas.";
              break;
            case estado_error > 500:
              this.errMsg =
                "Ha ocurrido un error en el servidor al procesar su solicitud. Por favor vuelva a intentar más tarde. Si el problema persiste pongase en constacto con su administrador de soporte técnico.";
              break;
            default:
              this.errMsg = "Ha ocurrido un error.";
              break;
          }

          this.showToast("warning", "Atención", this.errMsg, "top-center");
        }
      );
  }
  // el toast
  showToast(tipo, title, msg, posicion) {
    const type = tipo;
    this.toaster.open({
      text: msg,
      caption: type + " " + title,
      type: type,
      position: posicion
    });
  }
}
