import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CLICKABLE_COLOR, DataService} from "../data.service";

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.sass']
})
export class SquareComponent {

    @Input() color: string
    @Output() onClicked = new EventEmitter<any>()

    constructor (private dataService: DataService) {}

    clickHandle() {
        (this.color === CLICKABLE_COLOR) && this.onClicked.emit()
    }

}
