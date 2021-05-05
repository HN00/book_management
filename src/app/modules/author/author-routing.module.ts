import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorRoutingModule {

}
