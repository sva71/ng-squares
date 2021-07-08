import {Component, OnInit} from '@angular/core';

declare var $: any;

interface Cell {
    row: number,
    col: number
}

export const INITIAL_COLOR: string = 'cornflowerblue';
export const CLICKABLE_COLOR: string = 'yellow'
export const PLAYER_COLOR: string = 'green'
export const COMP_COLOR: string = 'maroon'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    delay: number = 1000
    playerScore: number = 0
    compScore: number = 0
    finalText: string = ''

    initialColor: string = INITIAL_COLOR
    playerColor: string = PLAYER_COLOR
    compColor: string = COMP_COLOR

    game: boolean = false
    clickTimer: number

    field: Array<string>[] = new Array(10)

    ngOnInit() {
        for (let i: number = 0; i < 10; i++)
            this.field[i] = new Array(10).fill(INITIAL_COLOR)
    }

    resetGame() {
        for (let i: number = 0; i < 10; i++)
            for (let j: number = 0; j < 10; j++)
                this.field[i][j] = this.initialColor;
        this.compScore = 0;
        this.playerScore = 0;
        this.game = false;
    }

    gameOver(win: boolean) {
        win ? this.finalText = `${this.playerScore} : ${this.compScore}. Congratulations, you win!` :
            this.finalText = `${this.playerScore} : ${this.compScore}. Sorry, you lose!`;
        $('#myModal').modal('show');
        this.resetGame();
    }

    getRandomCell(): Cell {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.field[x][y] !== INITIAL_COLOR);
        return {
            row: x,
            col: y
        }
    }

    startGame() {
        this.game = true;
        let cell: Cell = this.getRandomCell();
        this.field[cell.row][cell.col] = CLICKABLE_COLOR
        this.clickTimer = setTimeout(_ => {
            this.field[cell.row][cell.col] = COMP_COLOR;
            this.compScore++;
            if (this.compScore < 10) this.startGame(); else this.gameOver(false);
        }, this.delay)
    }

    cellClicked(cell) {
        clearTimeout(this.clickTimer);
        this.field[cell.row][cell.col] = PLAYER_COLOR
        this.playerScore++;
        if (this.playerScore < 10) this.startGame(); else this.gameOver(true)
    }

}
