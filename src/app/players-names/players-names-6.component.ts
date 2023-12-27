import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../game/game.service';
import { Router } from '@angular/router';
import { TeamNumber } from '../../../Crickin/game';

@Component({
  selector: 'players-names-6',
  templateUrl: './players-names-6.component.html',
})
export class PlayersNames6Component implements AfterViewInit {
  
  teamNumberAsString: string

  @ViewChild('p1') p1: ElementRef;
  @ViewChild('p2') p2: ElementRef;
  @ViewChild('p3') p3: ElementRef;
  @ViewChild('p4') p4: ElementRef;
  @ViewChild('p5') p5: ElementRef;
  @ViewChild('p6') p6: ElementRef;

  constructor(private gameService: GameService, private router: Router) {
    this.teamNumberAsString = (this.gameService.teamNumberOfPlayers + 1).toString()
  }

  ngAfterViewInit(): void {
    console.log(this.gameService.playerNamesTeam1)
    if (this.gameService.teamNumberOfPlayers == TeamNumber.One) {
      if (this.gameService.playerNamesTeam1.length != 0) {
        [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6].forEach((v, i) => {
          console.log(this.gameService.playerNamesTeam1[i])
          v.nativeElement.text = this.gameService.playerNamesTeam1[i]
        })
      }
    } else {
      if (this.gameService.playerNamesTeam1.length != 0) {
        [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6].forEach((v, i) => {
          console.log(this.gameService.playerNamesTeam2[i])
          v.nativeElement.text = this.gameService.playerNamesTeam2[i]
        })
      }
    }
  }

  nextScreen() {

    console.log("attempting nexst screen");

    var notAllBoxesFilled = false;
    [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6].forEach((v, i) => {
      if (v.nativeElement.text == undefined || v.nativeElement.text == "") {
        console.log("f")
        notAllBoxesFilled = true
      }
    });

    if (notAllBoxesFilled) {
      return
    }

    [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6].forEach((v, i) => {

      if (this.gameService.playerNamesTeam1.length != 0) {
        if (this.gameService.teamNumberOfPlayers == TeamNumber.One) {
          this.gameService.playerNamesTeam1[i] = v.nativeElement.text
        } else {
          this.gameService.playerNamesTeam2[i] = v.nativeElement.text
        }
        return
      }

      if (this.gameService.teamNumberOfPlayers == TeamNumber.One) {
        this.gameService.playerNamesTeam1.push(v.nativeElement.text)
      } else {
        this.gameService.playerNamesTeam2.push(v.nativeElement.text)
      }
    });

    console.log("forbidden")

    if (this.gameService.teamNumberOfPlayers == TeamNumber.One) {
      this.gameService.teamNumberOfPlayers = TeamNumber.Two
      console.log("moving on")
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/players-names/6')});
    }
      
  }

  prevScreen() {
    [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6].forEach((v, i) => {

      if (this.gameService.playerNamesTeam1.length != 0) {
        if (this.gameService.teamNumberOfPlayers == TeamNumber.One) {
          this.gameService.playerNamesTeam1[i] = v.nativeElement.text
        } else {
          this.gameService.playerNamesTeam2[i] = v.nativeElement.text
        }
        return
      }

      if (this.gameService.teamNumberOfPlayers == TeamNumber.One) {
        this.gameService.playerNamesTeam1.push(v.nativeElement.text)
      } else {
        this.gameService.playerNamesTeam2.push(v.nativeElement.text)
      }
    });

    if (this.gameService.teamNumberOfPlayers == TeamNumber.Two) {
      this.gameService.teamNumberOfPlayers = TeamNumber.One
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/players-names/6')});
    } else {
      this.router.navigateByUrl('/team-name')
    }
  }
  
}
