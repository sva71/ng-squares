import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { SquareComponent } from './square/square.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from "./data.service";

@NgModule({
    declarations: [
        AppComponent,
        SquareComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
    })
export class AppModule { }
