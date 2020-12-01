import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";

import { FooterComponent } from "./footer/footer.component";
import { RegistroComponent } from "./registro/registro.component";
import { LoginComponent } from "./login/login.component";

import { ListaMatriculasComponent } from "./lista-matriculas/lista-matriculas.component";
import { ListaUsuariosComponent } from "./lista-usuarios/lista-usuarios.component";
import { ListaEstacionamientosComponent } from "./lista-estacionamientos/lista-estacionamientos.component";
import { UpdateMatriculaComponent } from "./update-matricula/update-matricula.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastNotificationsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      { path: "login", component: LoginComponent },
      { path: "matriculas", component: ListaMatriculasComponent },
      { path: "estacionamientos", component: ListaEstacionamientosComponent },
      { path: "usuarios", component: ListaUsuariosComponent },
      { path: "registro", component: RegistroComponent },
      { path:"matriculas/modificar", component: UpdateMatriculaComponent}
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    FooterComponent,
    RegistroComponent,
    LoginComponent,
    ListaUsuariosComponent,
    ListaMatriculasComponent,
    ListaEstacionamientosComponent,
    UpdateMatriculaComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}