import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UsuarioService } from "../services/usuario.service";
import { Router } from "@angular/router";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm;
  errMsg;

  constructor(
    private toaster: Toaster,
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: "",
      password: ""
    });
  }

  ngOnInit() {}

  onSubmit(loginData) {
    this.errMsg = undefined;
    // Process checkout data here
    this.loginForm.reset();

    console.warn("Login information", loginData);

    const { usuario, password } = loginData;

    this.userService.login(usuario, password).subscribe(
      user => {
        const usuario_tmp=user["usr"];
        console.log(user);
        if (usuario_tmp.tipo === "Administrador") {
          this.userService.setUser(user["usr"]);
          this.showToast(
            "success",
            "Bienvenido",
            "Bienvenido : " + usuario,
            "top-center"
          );

          this.router.navigate(["matriculas"]);
        } else {
          this.showToast(
            "No autorizado",
            "Sin privilegios",
            "No tiene privilegios suficientes : " + usuario,
            "top-center"
          );
          this.router.navigate([""]);
        }
      },
      err => {
        const estado_error = err.status;
        switch (estado_error) {
          case 409:
            this.errMsg =
              "No existe un usuario con las credenciales ingresadas.";
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
