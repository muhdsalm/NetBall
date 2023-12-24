import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { GameService } from '../game/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'overs',
  templateUrl: './overs.component.html',
})
export class OversComponent implements AfterViewInit {
  overs = 6
  overPossibilities = [6, 8, 12, 16]

  @ViewChild("6") over6: ElementRef
  @ViewChild("8") over8: ElementRef
  @ViewChild("12") over12: ElementRef
  @ViewChild("16") over16: ElementRef

  constructor(private gameservice: GameService, private router: Router) {}

  
  ngAfterViewInit(): void {
    switch(this.gameservice.overs) {
      case 6:
        this.switchTo6()
        break;
      case 8:
        this.switchTo8()
        break;
      case 12:
        this.switchTo12()
        break;
      case 16:
        this.switchTo16()
        break;
    }
  }


  switchToNormal(over: ElementRef) {
    over.nativeElement.style.backgroundColor = "#734b34ff"
    over.nativeElement.style.color = "#dde4d7ff"
  }
  switchToClicked(over: ElementRef) {
    over.nativeElement.style.backgroundColor = "#dde4d7ff"
    over.nativeElement.style.color = "#734b34ff"
  }


  switchTo6() {
    this.switchToClicked(this.over6)
    this.switchToNormal(this.over8)
    this.switchToNormal(this.over12)
    this.switchToNormal(this.over16)
    this.gameservice.overs = 6
  }
  switchTo8() {
    this.switchToClicked(this.over8)
    this.switchToNormal(this.over6)
    this.switchToNormal(this.over12)
    this.switchToNormal(this.over16)
    this.gameservice.overs = 8
  }
  switchTo12() {
    this.switchToClicked(this.over12)
    this.switchToNormal(this.over8)
    this.switchToNormal(this.over6)
    this.switchToNormal(this.over16)
    this.gameservice.overs = 12
  }
  switchTo16() {
    this.switchToClicked(this.over16)
    this.switchToNormal(this.over8)
    this.switchToNormal(this.over12)
    this.switchToNormal(this.over6)
    this.gameservice.overs = 16
  }

  moveToTeamNames() {
    if (this.gameservice.overs == undefined) {
      return
    }

    this.router.navigateByUrl("/team-name")
  }

}
