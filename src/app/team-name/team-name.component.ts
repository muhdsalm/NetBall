import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { PropertyChangeData } from '@nativescript/core'
import { GameService } from '../game/game.service'
import { Router } from '@angular/router'

@Component({
  selector: 'team-name',
  templateUrl: './team-name.component.html',
})
export class TeamNameComponent implements AfterViewInit{

  @ViewChild('team1') team1Ref: ElementRef
  @ViewChild('team2') team2Ref: ElementRef

  constructor(private gameService: GameService, private router: Router) {}

  ngAfterViewInit(): void {
    this.team1Ref.nativeElement.text = this.gameService.team1Name
    this.team2Ref.nativeElement.text = this.gameService.team2Name
  }

  changeTeam1Name() {
    this.gameService.team1Name = this.team1Ref.nativeElement.text
    console.log(this.team1Ref.nativeElement.text)
  }
  changeTeam2Name() {
    this.gameService.team2Name = this.team2Ref.nativeElement.text
    console.log(this.team2Ref.nativeElement.text)
  }

  changeToPlayerNames() {

    console.log(this.team1Ref.nativeElement.text)

    if (this.team1Ref.nativeElement.text == undefined || 
        this.team2Ref.nativeElement.text == undefined || 
        this.team1Ref.nativeElement.text == "" || 
        this.team2Ref.nativeElement.text == "") {
      return
    }

    if (this.gameService.overs % 6 == 0) {
      this.router.navigateByUrl("/players-names/6")
    }
    else {
      this.router.navigateByUrl("/players-names/8")
    }
  }
  
}
