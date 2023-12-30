import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core'
import { GameService } from '../game/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'player-select-6-bowling',
  templateUrl: './player-select-6.component.html',
})
export class PlayerSelectBowling6Component implements AfterViewInit {
  @ViewChild('p1') player1Button: ElementRef
  @ViewChild('p2') player2Button: ElementRef
  @ViewChild('p3') player3Button: ElementRef
  @ViewChild('p4') player4Button: ElementRef
  @ViewChild('p5') player5Button: ElementRef
  @ViewChild('p6') player6Button: ElementRef

  selectedPlayer: number
  playerNames: string[] = []
  playerButtonsList: ElementRef[] = []

  constructor(private gameService: GameService, private router: Router) {
    if (!gameService.battingTeam) {
      this.playerNames = gameService.playerNamesTeam2
    } else {
      this.playerNames = gameService.playerNamesTeam1
    }
  }

  ngAfterViewInit(): void {
    this.playerButtonsList = [this.player1Button, this.player2Button, this.player3Button, this.player4Button, this.player5Button, this.player6Button]

    this.selectedPlayer = this.gameService.bowler
    console.log(this.selectedPlayer)
    console.log(this.gameService.battingTeam)

    for (var i = 0; i < this.playerButtonsList.length; i++) {
      this.playerButtonsList[i].nativeElement.text = this.playerNames[i]
      if (this.selectedPlayer == i) {
        this.playerButtonsList[i].nativeElement.style.backgroundColor = '#dde4d7ff'
        this.playerButtonsList[i].nativeElement.style.color = '#734b34ff'
      }
    }

  }

  playerSelected(index: number) {

    for (var i = 0; i < this.playerButtonsList.length; i++) {
      if (i == index) {
        this.playerButtonsList[i].nativeElement.style.backgroundColor = '#dde4d7ff'
        this.playerButtonsList[i].nativeElement.style.color = '#734b34ff'
      } else {
        this.playerButtonsList[i].nativeElement.style.backgroundColor = '#734b34ff'
        this.playerButtonsList[i].nativeElement.style.color = '#dde4d7ff'
      }
    }

    this.selectedPlayer = index
  }

  nextScreen() {
    console.log(this.selectedPlayer)
    if (this.selectedPlayer == undefined) {
      console.log("includes undefined")
      return
    }

    this.gameService.bowler = this.selectedPlayer

    this.router.navigateByUrl('/play')
  }

  prevScreen() {
    this.gameService.bowler = this.selectedPlayer

    this.router.navigateByUrl('/player-select/6')
  }

}
