import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './pages/book-list/book-list.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { BookTableComponent } from './components/book-table/book-table.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookDeleteComponent } from './components/book-delete/book-delete.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BookListResolver } from 'src/app/core/resolvers/book-list.resolver';
import { CategoryModule } from '../category/category.module';
import { AuthorModule } from '../author/author.module';

@NgModule({
    declarations: [
        BookListComponent,
        BookTableComponent,
        BookEditComponent,
        BookDeleteComponent,
        BookDetailComponent,
    ],
    imports: [
        BookRoutingModule,
        SharedModule,
        CoreModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        CategoryModule,
        AuthorModule,
    ],
    exports: [
        BookRoutingModule,
        BookListComponent,
        BookEditComponent,
        BookTableComponent,
        BookDeleteComponent,
        BookDetailComponent
    ],
    providers: [
        BookListResolver
    ]
})
export class BookModule {

}
