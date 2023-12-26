import { Injectable } from '@angular/core'
import { Game, TeamNumber } from '../../../Crickin/game';
import { Batsman } from '../../../Crickin';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private game: Game

  team1Name: string
  team2Name: string

  playerNamesTeam1: string[] = []
  playerNamesTeam2: string[] = []

  overs: number

  battingTeam: boolean

  batsmanNumber1Index: number
  batsmanNumber2Index: number
  bowler: number

  teamNumberOfPlayers = TeamNumber.One


  constructor() {}

  setTeamNames(team1: string, team2: string) {
    this.team1Name, this.team2Name = team1, team2
  }

  setPlayerName(team: TeamNumber, players: string[]) {
    if (team) { // TeamNumber.Two
      this.playerNamesTeam2 = players
    } else {
      this.playerNamesTeam1 = players
    }
  }

  setOvers(overs: number) {
    this.overs = overs
  }

  setBattingTeam(team: TeamNumber) {
    this.battingTeam = !!team
  }

  setBatsmen(batsmanNumber1: number, batsmanNumber2: number) {
    this.batsmanNumber1Index = batsmanNumber1, this.batsmanNumber2Index = batsmanNumber2
  }

  setBowler(bowlerNumber: number) {
    this.bowler = bowlerNumber
  }

  createGame() {
    this.game = new Game()
    this.game.setOvers(this.overs)
    this.game.setTeamNames(this.team1Name, this.team2Name)
    this.game.setPlayerNames(this.playerNamesTeam1, this.playerNamesTeam2)
    this.game.setBattingTeam(TeamNumber[this.battingTeam ? "One" : "Two"])
    this.game.setBowlingTeam(TeamNumber[!this.battingTeam ? "One" : "Two"])
    this.game.selectPlayers(this.batsmanNumber1Index, this.batsmanNumber2Index, this.bowler)
  }


  
}
