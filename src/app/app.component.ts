import {Component, OnInit} from '@angular/core';
import {CLICKABLE_COLOR, COMP_COLOR, DataService, INITIAL_COLOR, PLAYER_COLOR, Scores} from "./data.service";

declare var $: any;

interface Cell {
    row: number,
    col: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    constructor(private dataService: DataService) {  }

    colors = {
        initialColor: INITIAL_COLOR,
        clickableColor: CLICKABLE_COLOR,
        playerColor: PLAYER_COLOR,
        compColor: COMP_COLOR
    }

    delay: number = 1000
    scores: Scores

    finalText: string = ''

    game: boolean = false
    clickTimer: number

    field: Array<string>[]

    ngOnInit() {
        this.scores = this.dataService.getScores();
        this.field = this.dataService.getField();
    }

    resetGame() {
        this.field = this.dataService.resetField();
        this.scores = this.dataService.resetScores();
        this.game = false;
    }

    gameOver(win: boolean) {
        win ? this.finalText = `${this.scores.playerScore} : ${this.scores.compScore}. Congratulations, you win!` :
            this.finalText = `${this.scores.playerScore} : ${this.scores.compScore}. Sorry, you lose!`;
        $('#myModal').modal('show');
        this.resetGame();
    }

    getRandomCell(): Cell {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.field[x][y] !== this.colors.initialColor);
        return {
            row: x,
            col: y
        }
    }

    startGame() {
        this.game = true;
        let cell: Cell = this.getRandomCell();
        this.field[cell.row][cell.col] = this.colors.clickableColor;
        this.clickTimer = setTimeout(_ => {
            this.field[cell.row][cell.col] = this.colors.compColor;
            this.scores = this.dataService.incScores(false);
            if (this.scores.compScore < 10) this.startGame(); else this.gameOver(false);
        }, this.delay)
    }

    cellClicked(cell) {
        clearTimeout(this.clickTimer);
        this.field[cell.row][cell.col] = this.colors.playerColor;
        this.scores = this.dataService.incScores(true);
        if (this.scores.playerScore < 10) this.startGame(); else this.gameOver(true)
    }

}
