import { Injectable } from '@angular/core'
import { Game } from '../../../Crickin/game';

@Injectable({
  providedIn: 'root',
})
export class FirstScreen {

  private game: Game

  team1Name: string
  team2Name: string

  playerNamesTeam1: [string]
  playerNamesTeam2: [string]

  overs: number

  battingTeam: boolean

  batsmanNumber1: number
  batsmanNumber2: number
  bowler: number


  constructor() {
    this.game = new Game()
  }


  
}
