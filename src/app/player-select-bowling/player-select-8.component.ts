import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core'
import { GameService } from '../game/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'player-select-8-bowling',
  templateUrl: './player-select-8.component.html',
})
export class PlayerSelectBowling8Component implements AfterViewInit {
  @ViewChild('p1') player1Button: ElementRef
  @ViewChild('p2') player2Button: ElementRef
  @ViewChild('p3') player3Button: ElementRef
  @ViewChild('p4') player4Button: ElementRef
  @ViewChild('p5') player5Button: ElementRef
  @ViewChild('p6') player6Button: ElementRef
  @ViewChild('p7') player7Button: ElementRef
  @ViewChild('p8') player8Button: ElementRef

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
    this.playerButtonsList = [this.player1Button, this.player2Button, this.player3Button, this.player4Button, this.player5Button, this.player6Button, this.player7Button, this.player8Button]

    this.selectedPlayer = this.gameService.bowler
    console.log(this.selectedPlayer)

    for (var i = 0; i < this.playerButtonsList.length; i++) {
      this.playerButtonsList[i].nativeElement.text = this.playerNames[i]
      console.log('playerbuttonlisttext', this.playerButtonsList[i].nativeElement.text)
      if (this.playerButtonsList[i].nativeElement.text == undefined) {
        this.playerButtonsList[i].nativeElement.style.backgroundColor = 'transparent'
        this.playerButtonsList[i].nativeElement.isEnabled = false
      }
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
      } else if (this.playerButtonsList[i].nativeElement.text != undefined){
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

    if (this.gameService.batsmenChangeNeeded()) {
      this.router.navigateByUrl("/player-select/8")
    } else {
      return
    }
  }

}


