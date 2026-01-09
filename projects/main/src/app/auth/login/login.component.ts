import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, IUserLogin,  } from '@core';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    private readonly loginService = inject(AuthService);
    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);

    formGroup: FormGroup = new FormGroup({});

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            username: '',
            password: '',
        });
    }

    login() {
        // this.btnLogin = true;
        const userInfo: IUserLogin = { ...this.formGroup.value };

        userInfo.username = userInfo.username.trim();
        userInfo.password = userInfo.password.trim();

        if (userInfo.username != "" && userInfo.password != "") {
            this.loginService.login(userInfo).subscribe({
                next: (token: any) => { this.getToken(token, userInfo) },
                error: (err) => {
                    // this.btnLogin = false;
                },
            });
        } else {
            // this.toastService.show(ToastTypeEnum.Error, this.translateService.instant('messages.enter-user'), 4000, ToastPositionEnum.Center, "Formulario");
            // this.btnLogin = false;
        }
    };

    getToken(token: any, user?: any) {
        this.router.navigate(['/main']);
    }

}