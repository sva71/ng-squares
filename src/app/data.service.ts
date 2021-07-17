import { Injectable } from '@angular/core';

export const INITIAL_COLOR: string = 'cornflowerblue';
export const CLICKABLE_COLOR: string = 'yellow'
export const PLAYER_COLOR: string = 'green'
export const COMP_COLOR: string = 'maroon'

export interface Scores {
    playerScore: number,
    compScore: number
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private scores: Scores = { playerScore: 0, compScore: 0}
    private field: Array<string>[] =
        Array.from(Array(10), () => new Array(10).fill(INITIAL_COLOR))

    getScores() {
        return this.scores;
    }

    incScores(player: boolean) {
        player ? this.scores.playerScore++ : this.scores.compScore++
        return this.scores
    }

    getField() {
        return this.field
    }

    resetScores() {
        this.scores.playerScore = 0;
        this.scores.compScore = 0;
        return this.scores
    }

    resetField() {
        for (let i: number = 0; i < 10; i++)
            for (let j: number = 0; j < 10; j++)
                this.field[i][j] = INITIAL_COLOR;
        return this.field
    }

}
