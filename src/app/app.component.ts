import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    playerName: string = 'John Doe'
    delay: number = 500
    playerScore: number = 0
    compScore: number = 0

}
