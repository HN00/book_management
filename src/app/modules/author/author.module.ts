import { NgModule } from '@angular/core';
import { AuthorRoutingModule } from './author-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorSearchComponent } from './components/author-search/author-search.component';

@NgModule({
    declarations: [
        AuthorSearchComponent
     ],
    imports: [
        SharedModule,
        CoreModule,
        MaterialModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        AuthorRoutingModule,
        AuthorSearchComponent
    ]
})
export class AuthorModule {

}
