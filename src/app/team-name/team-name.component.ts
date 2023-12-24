import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { PropertyChangeData } from '@nativescript/core'
import { GameService } from '../game/game.service'

@Component({
  selector: 'team-name',
  templateUrl: './team-name.component.html',
})
export class TeamNameComponent implements AfterViewInit{

  @ViewChild('team1') team1Ref: ElementRef
  @ViewChild('team2') team2Ref: ElementRef

  constructor(private gameService: GameService) {}

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
  
}
