import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { InternalErrorComponent } from './internal-error.component'

const routes: Routes = [
  {path: '', component: InternalErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalErrorRoutingModule {
}