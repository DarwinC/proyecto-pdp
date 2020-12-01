import { Component, OnInit } from "@angular/core";
import { MatriculasService } from "../services/matriculas.service";
import { Router } from "@angular/router";
import { FormBuilder,FormGroup } from "@angular/forms";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: "app-update-matricula",
  templateUrl: "./update-matricula.component.html",
  styleUrls: ["./update-matricula.component.css"]
})
export class UpdateMatriculaComponent implements OnInit {
  errMsg;
  updateMatriculaForm:FormGroup;
  matricula:any;

  /* tipos de toast
'success'
'danger'
'warning'
'info'
'primary'
'secondary'
'dark'
'light'
*/
  constructor(
    private toaster: Toaster,
    private matriculasService: MatriculasService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.updateMatriculaForm = this.formBuilder.group({
      id:[""],
      serie: [""]
    });
  }

  ngOnInit() {
   const promise = this.matriculasService.getMatriculaById(
      this.matriculasService.getMatriculaId()).toPromise();

    promise.then(
      response => {
        console.log(response);
        this.updateMatriculaForm.controls["serie"].setValue(response["serie"]);
        this.updateMatriculaForm.controls["id"].setValue(response["_id"]);
      },
      error => {
        console.log("error " + error);
      }
    );
  }
  
  // evento de cambio del select
  onChangeofOptions(newGov) {
    console.log(newGov);
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
  // update la matricula
  onSubmit(registerData) {
    this.errMsg = undefined;
    // Process checkout data here
    this.updateMatriculaForm.reset();

    console.warn("Matricula information", registerData);

    //const { usuario, password } = registerData;

    this.matriculasService
      .update(registerData.id,registerData.serie)
      .subscribe(
        matricula => {
          this.showToast(
            "success",
            "Modificado",
            "Se guardaron los cambios",
            "top-center"
          );
          this.router.navigate(["/matriculas"]);
        },
        err => {
          const estado_error = err.status;
          switch (estado_error) {
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
}
