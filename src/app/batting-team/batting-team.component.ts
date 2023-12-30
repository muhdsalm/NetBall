import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { TeamNumber } from '../../../Crickin/game'
import { GameService } from '../game/game.service'
import { Router } from '@angular/router'

@Component({
  selector: 'batting-team',
  templateUrl: './batting-team.component.html',
})
export class BattingTeamComponent implements AfterViewInit{

  battingTeam: TeamNumber
  team1Name: string
  team2Name: string

  @ViewChild('team1') team1Button: ElementRef
  @ViewChild('team2') team2Button: ElementRef

  constructor(private gameService: GameService, private router: Router) {
    this.team1Name = gameService.team1Name
    this.team2Name = gameService.team2Name
    this.battingTeam = gameService.battingTeam as any as TeamNumber
    console.log(gameService.battingTeam)
  }

  ngAfterViewInit(): void {
    console.log(this.battingTeam)
    if (this.battingTeam != undefined) {
      if (this.battingTeam == TeamNumber.One) {
        this.team1Button.nativeElement.style.backgroundColor = '#dde4d7ff'
        this.team1Button.nativeElement.style.color = '#734b34ff'
      } else {
        this.team2Button.nativeElement.style.backgroundColor = '#dde4d7ff'
        this.team2Button.nativeElement.style.color = '#734b34ff'
      }
    }
  }
  
  nextScreen() {
    if (this.battingTeam == undefined) {
      return
    }

    this.gameService.setBattingTeam(this.battingTeam)

    if (this.gameService.overs % 6 == 0) {
      this.router.navigateByUrl('/player-select/6')
    } else {
      this.router.navigateByUrl('/player-select/8')
    }

  }

  prevScreen() {
    if (!(this.battingTeam == undefined)) {
      this.gameService.setBattingTeam(this.battingTeam)
    }

    if (this.gameService.overs % 6 == 0) {
      this.router.navigateByUrl('/players-names/6')
    } else {
      this.router.navigateByUrl('/players-names/8')
    }
  }

  selectFirstTeam() {
    this.battingTeam = TeamNumber.One

    this.team1Button.nativeElement.style.backgroundColor = '#dde4d7ff'
    this.team1Button.nativeElement.style.color = '#734b34ff'

    this.team2Button.nativeElement.style.backgroundColor = '#734b34ff'
    this.team2Button.nativeElement.style.color = '#dde4d7ff'
  }

  selectSecondTeam() {
    this.battingTeam = TeamNumber.Two

    this.team2Button.nativeElement.style.backgroundColor = '#dde4d7ff'
    this.team2Button.nativeElement.style.color = '#734b34ff'

    this.team1Button.nativeElement.style.backgroundColor = '#734b34ff'
    this.team1Button.nativeElement.style.color = '#dde4d7ff'
  }

}
