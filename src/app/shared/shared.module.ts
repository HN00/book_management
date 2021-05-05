import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [
        LoginComponent,
        SidebarComponent,
        HeaderComponent,
    ],
    imports: [
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        LoginComponent,
        SidebarComponent,
        HeaderComponent,
    ]
})
export class SharedModule {

}
