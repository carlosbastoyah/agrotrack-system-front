import { NgModule } from '@angular/core';
import { VendorsComponent } from './vendors.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        VendorsComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        VendorsComponent,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class VendorsModule { }
