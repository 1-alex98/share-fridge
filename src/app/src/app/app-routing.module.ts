import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoggedInComponent} from "./logged-in/logged-in.component";
import {StatusNotFoundComponent} from "./status-not-found/status-not-found.component";

const routes: Routes = [{
  path: "",
  component: LoggedInComponent
},
{
  path: "**",
  component: StatusNotFoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
