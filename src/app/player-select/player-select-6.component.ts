import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core'
import { GameService } from '../game/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'player-select-6',
  templateUrl: './player-select-6.component.html',
})
export class PlayerSelect6Component implements AfterViewInit {
  @ViewChild('p1') player1Button: ElementRef
  @ViewChild('p2') player2Button: ElementRef
  @ViewChild('p3') player3Button: ElementRef
  @ViewChild('p4') player4Button: ElementRef
  @ViewChild('p5') player5Button: ElementRef
  @ViewChild('p6') player6Button: ElementRef

  selectedPlayers: number[] = [undefined, undefined]
  playerNames: string[] = []
  playerButtonsList: ElementRef[] = []

  constructor(private gameService: GameService, private router: Router) {
    if (gameService.battingTeam) {
      this.playerNames = gameService.playerNamesTeam2
    } else {
      this.playerNames = gameService.playerNamesTeam1
    }
  }

  ngAfterViewInit(): void {
    this.playerButtonsList = [this.player1Button, this.player2Button, this.player3Button, this.player4Button, this.player5Button, this.player6Button]

    this.selectedPlayers = [this.gameService.batsmanNumber1Index, this.gameService.batsmanNumber2Index]
    console.log(this.gameService.batsmanNumber1Index, this.gameService.batsmanNumber2Index)
    console.log(this.selectedPlayers)

    for (var i = 0; i < this.playerButtonsList.length; i++) {
      this.playerButtonsList[i].nativeElement.text = this.playerNames[i]
      if (this.selectedPlayers.includes(i)) {
        this.playerButtonsList[i].nativeElement.style.backgroundColor = '#dde4d7ff'
        this.playerButtonsList[i].nativeElement.style.color = '#734b34ff'
      }
    }

  }

  playerSelected(index: number) {

    /* The point of this function is to store the 'index' variable 
    *  inside the selectedPlayers list, if it doesn't exist and there
    *  is free space inside the array. If there isn't, leave. If the
    *  index variable already exists inside the array, then we need to 
    *  remove it. The index variable is the number of the player that
    *  each button is representing.
    * */

    if (this.selectedPlayers.indexOf(index) == -1) {
      if (this.selectedPlayers.indexOf(undefined) == -1) {
        return
      }
      this.selectedPlayers[this.selectedPlayers.indexOf(undefined)] = index
      this.playerButtonsList[index].nativeElement.style.backgroundColor = '#dde4d7ff'
      this.playerButtonsList[index].nativeElement.style.color = '#734b34ff'
    } else {
      this.selectedPlayers[this.selectedPlayers.indexOf(index)] = undefined
      this.playerButtonsList[index].nativeElement.style.backgroundColor = '#734b34ff'
      this.playerButtonsList[index].nativeElement.style.color = '#dde4d7ff'
    }
  }

  nextScreen() {
    console.log(this.selectedPlayers)
    if (this.selectedPlayers.includes(undefined)) {
      console.log("includes undefined")
      return
    }

    this.gameService.batsmanNumber1Index = this.selectedPlayers[0]
    this.gameService.batsmanNumber2Index = this.selectedPlayers[1]

    this.router.navigateByUrl('/play')
  }

  prevScreen() {
    this.gameService.batsmanNumber1Index = this.selectedPlayers[0]
    this.gameService.batsmanNumber2Index = this.selectedPlayers[1]

    this.router.navigateByUrl('/batting-team')
  }

}
