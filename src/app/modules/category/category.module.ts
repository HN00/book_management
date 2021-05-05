import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import { CategorySearchComponent } from './components/category-search/category-search.component';

@NgModule({
    declarations: [
        CategorySearchComponent
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
        CategoryRoutingModule,
        CategorySearchComponent
    ]
})
export class CategoryModule {

}
