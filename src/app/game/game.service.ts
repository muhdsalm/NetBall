import { Injectable } from '@angular/core'
import { Game, TeamNumber } from '../../../Crickin/game';
import { Batsman } from '../../../Crickin';

/** This code recreates a lot of the same functionality that
 * the Crickin library offers. The reason for this is that a lot
 * of the things that happen require an 'undo', due to which a 
 * rudimentary form of the functionalities of the Crickin library
 * are recreated, and then the Crickin library only comes into play
 * when on the 'play' screen.
 */


@Injectable({
  providedIn: 'root',
})
export class GameService {

  private game: Game

  team1Name: string
  team2Name: string

  playerNamesTeam1: string[] = []
  playerNamesTeam2: string[] = []
  playerNumbersTeam1: number[] = []
  playerNumbersTeam2: number[] = []

  overs: number

  battingTeam: boolean // true = team2, false = team1

  batsmanNumber1Index: number
  batsmanNumber2Index: number
  bowler: number

  teamNumberOfPlayers = TeamNumber.One

  firstOver = true
  secondInnings = false


  constructor() {}

  restart() {
    this.game = undefined
    this.team1Name = undefined
    this.team2Name = undefined

    this.playerNamesTeam1 = []
    this.playerNamesTeam2 = []
    this.playerNumbersTeam1 = []
    this.playerNumbersTeam2 = []

    this.overs = undefined

    this.battingTeam = undefined

    this.batsmanNumber1Index = undefined
    this.batsmanNumber2Index = undefined
    this.bowler = undefined

    this.teamNumberOfPlayers = TeamNumber.One

    this.firstOver = true
    this.secondInnings = false
  }

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
    this.battingTeam = team as any
    console.log(team as any)
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
    this.game.setBattingTeam(TeamNumber[this.battingTeam ? "Two" : "One"])
    this.game.setBowlingTeam(TeamNumber[!this.battingTeam ? "Two" : "One"])
    this.game.selectPlayers(this.batsmanNumber1Index, this.batsmanNumber2Index, this.bowler);

    this.playerNamesTeam1 = []
    this.playerNumbersTeam1 = []
    this.game.getRemainingPlayers(TeamNumber.One).forEach((v, i) => {
      this.playerNumbersTeam1.push(v[0])
      this.playerNamesTeam1.push(v[1])
    })

    this.playerNumbersTeam2 = []
    this.playerNamesTeam2 = []
    this.game.getRemainingPlayers(TeamNumber.Two).forEach((v, _) => {
      this.playerNumbersTeam2.push(v[0])
      this.playerNamesTeam2.push(v[1])
    })
  }

  newOver() {

    // Until now, the battingTeam variable changed depending on the batting team.
    // However, here, the thing changes. Instead, the team changes depending on 
    // where the variable points to. For example, before, if team1 was batting,
    // battingTeam would be false, and if it was team2, it would be true. However,
    // now, if battingTeam is true, then the batting team, regardless of whether
    // it is team1 or team2, will be stored in the team2 variable, and if it is false,
    // the batting team will be stored in the team1 variable. I agree, this is a very
    // messy solution, but it works.

    this.game.newOver(this.bowler, this.batsmanNumber1Index, this.batsmanNumber2Index)

    console.log("current over number:",this.game.getCurrentOverNumber())
    if (this.game.getCurrentOverNumber() == 5 && !this.secondInnings) {
      this.secondInnings = true

      this.playerNamesTeam1 = []
      this.playerNumbersTeam1 = []
      this.playerNamesTeam2 = []
      this.playerNumbersTeam2 = []

      if (this.battingTeam) {
        for (var i = 0; i < this.overs; i++) {
          this.playerNumbersTeam1.push(i)
          this.playerNumbersTeam2.push(i)

          this.playerNamesTeam1.push(this.game.getBattingTeam().getPlayer(i).getName())
          this.playerNamesTeam2.push(this.game.getBowlingTeam().getPlayer(i).getName())
        }
      } else {
        for (var i = 0; i < this.overs; i++) {
          this.playerNumbersTeam1.push(i)
          this.playerNumbersTeam2.push(i)

          this.playerNamesTeam1.push(this.game.getBowlingTeam().getPlayer(i).getName())
          this.playerNamesTeam2.push(this.game.getBattingTeam().getPlayer(i).getName())
        }
      }
      return
    }
    if (this.secondInnings) {
      console.log('switching')
      if (this.battingTeam) {
        this.playerNamesTeam1 = []
        this.playerNumbersTeam1 = []
        this.game.getRemainingBowlers().forEach((v, i) => {
          this.playerNumbersTeam1.push(v[0])
          this.playerNamesTeam1.push(v[1])
        })
  
        this.playerNumbersTeam2 = []
        this.playerNamesTeam2 = []
        this.game.getRemainingBatsmen().forEach((v, _) => {
          this.playerNumbersTeam2.push(v[0])
          this.playerNamesTeam2.push(v[1])
        })
        console.log(this.game.getRemainingBatsmen(), this.game.getRemainingBowlers())
      } else {
        this.playerNamesTeam1 = []
        this.playerNumbersTeam1 = []
        this.game.getRemainingBatsmen().forEach((v, i) => {
          this.playerNumbersTeam1.push(v[0])
          this.playerNamesTeam1.push(v[1])
        })
  
        this.playerNumbersTeam2 = []
        this.playerNamesTeam2 = []
        this.game.getRemainingBowlers().forEach((v, _) => {
          this.playerNumbersTeam2.push(v[0])
          this.playerNamesTeam2.push(v[1])
        })
      }
    } else {
      this.playerNumbersTeam1 = []
      this.playerNamesTeam1 = []
    
      this.playerNumbersTeam2 = []
      this.playerNamesTeam2 = []

      this.game.getRemainingPlayers(TeamNumber.One).forEach((v, _) => {
        this.playerNumbersTeam1.push(v[0])
        this.playerNamesTeam1.push(v[1])
      })
      this.game.getRemainingPlayers(TeamNumber.Two).forEach((v, _) => {
        this.playerNumbersTeam2.push(v[0])
        this.playerNamesTeam2.push(v[1])
      })
    }
  }

  batsmenChangeNeeded(): boolean{
    if (this.overs < 10) {
      console.log((this.getGame().getCurrentOverNumber() + 1) % 2)
      if ((this.getGame().getCurrentOverNumber() + 1) % 2 == 0) {
        return true
      } else {
        return false
      }
    } else {
      if ((this.getGame().getCurrentOverNumber() + 1) % 4 == 0) {
        return true
      } else {
        return false
      }
    }
  }

  getGame() {return this.game}


  
}
