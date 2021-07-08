import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CLICKABLE_COLOR} from "../app.component";

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.sass']
})
export class SquareComponent {

    @Input() color: string
    @Output() onClicked = new EventEmitter<any>()

    clickHandle() {
        (this.color === CLICKABLE_COLOR) && this.onClicked.emit()
    }

}
