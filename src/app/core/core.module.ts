import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SnackBarService } from './services/snackbar.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
    declarations: [],
    imports: [
        SharedModule
    ],
    exports: [],
    providers: [
        AuthService,
        SnackBarService,
        {
            provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
        },
    ]
})
export class CoreModule {

}
