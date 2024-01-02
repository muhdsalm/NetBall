import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { GameService } from '../game/game.service';
import { Router } from '@angular/router';
import { Batsman } from '../../../Crickin';

@Component({
  selector: 'play',
  templateUrl: './play.component.html',
})
export class PlayComponent implements AfterViewInit{

  currentRow: Batsman
  currentColumn: number

  constructor(private gameService: GameService, private router: Router) {}

  @ViewChild('back') backButton: ElementRef
  @ViewChild('next') nextButton: ElementRef

  @ViewChild('00') zerozeroButton: ElementRef
  @ViewChild('01') zerooneButton: ElementRef
  @ViewChild('02') zerotwoButton: ElementRef
  @ViewChild('03') zerothreeButton: ElementRef
  @ViewChild('04') zerofourButton: ElementRef
  @ViewChild('05') zerofiveButton: ElementRef
  @ViewChild('10') onezeroButton: ElementRef
  @ViewChild('11') oneoneButton: ElementRef
  @ViewChild('12') onetwoButton: ElementRef
  @ViewChild('13') onethreeButton: ElementRef
  @ViewChild('14') onefourButton: ElementRef
  @ViewChild('15') onefiveButton: ElementRef


  @ViewChild('description') descriptionLabel: ElementRef
  @ViewChild('score') scoreTextField: ElementRef

  grid: ElementRef[][]

  ngAfterViewInit(): void {
    this.grid = [[this.zerozeroButton, this.zerooneButton, this.zerotwoButton, this.zerothreeButton, this.zerofourButton, this.zerofiveButton],
    [this.onezeroButton, this.oneoneButton, this.onetwoButton, this.onethreeButton, this.onefourButton, this.onefiveButton]]
  }

  goBack = true

  gridClicked(row: number, column: number) {
    this.goBack ? this.initializeProperly() : null

    this.currentRow = row as Batsman
    this.currentColumn = column

    var descriptionText = ""
    console.log(this.gameService.batsmanNumber1Index)
    descriptionText += row ? this.gameService.getGame().getBattingTeam().getPlayer(this.gameService.batsmanNumber2Index).getName() : this.gameService.getGame().getBattingTeam().getPlayer(this.gameService.batsmanNumber1Index).getName()
    descriptionText += ", ball " + (column + 1)
    this.descriptionLabel.nativeElement.text = descriptionText

    this.scoreTextField.nativeElement.text = this.grid[row][column].nativeElement.text
    
  }

  initializeProperly() {
    this.goBack = false
    this.backButton.nativeElement.isEnabled = false
    this.nextButton.nativeElement.isEnabled = true
    this.backButton.nativeElement.style.backgroundColor = '#909090'
    this.nextButton.nativeElement.style.backgroundColor = '#734b34ff'

    if (!this.gameService.firstOver) {
      if (this.gameService.battingTeam) {
        console.log(this.gameService.playerNumbersTeam2 + ", ", this.gameService.playerNumbersTeam2[this.gameService.batsmanNumber1Index])
        if (this.gameService.batsmenChangeNeeded()) {
          this.gameService.batsmanNumber1Index = this.gameService.playerNumbersTeam2[this.gameService.batsmanNumber1Index]
          this.gameService.batsmanNumber2Index = this.gameService.playerNumbersTeam2[this.gameService.batsmanNumber2Index]
        }
        this.gameService.bowler = this.gameService.playerNumbersTeam1[this.gameService.bowler]
      } else {
        console.log(this.gameService.playerNumbersTeam1 + ", ", this.gameService.playerNumbersTeam1[this.gameService.batsmanNumber1Index])
        if (this.gameService.batsmenChangeNeeded()) {
          this.gameService.batsmanNumber1Index = this.gameService.playerNumbersTeam1[this.gameService.batsmanNumber1Index]
          this.gameService.batsmanNumber2Index = this.gameService.playerNumbersTeam1[this.gameService.batsmanNumber2Index]
        }
        this.gameService.bowler = this.gameService.playerNumbersTeam2[this.gameService.bowler]
      }
    }

    console.log(this.gameService.batsmanNumber1Index, this.gameService.batsmanNumber2Index)

    if (this.gameService.firstOver) {
      this.gameService.createGame()
      this.gameService.firstOver = false
    } else {
      this.gameService.newOver()
    }
  }

  onScore() {
    console.log(this.grid[this.currentRow][this.currentColumn].nativeElement.style.fontSize)
    this.gameService.getGame().setScore(this.currentRow, this.currentColumn + 1, parseInt(this.scoreTextField.nativeElement.text))
    this.grid[this.currentRow][this.currentColumn].nativeElement.text = this.scoreTextField.nativeElement.text
  }

  scoreButton(score: number) {
    this.scoreTextField.nativeElement.text = score.toString()
    this.onScore()
  }

  nextScreen() {

    if (this.gameService.batsmenChangeNeeded()) {
      this.gameService.batsmanNumber1Index = undefined
      this.gameService.batsmanNumber2Index = undefined
    }
    this.gameService.bowler = undefined


    if (this.gameService.overs < 10) {
      console.log("shud bat",((this.gameService.getGame().getCurrentOverNumber() + 1) % 2))
      if ((this.gameService.getGame().getCurrentOverNumber() + 1) % 2 == 0) {
        this.router.navigateByUrl("/player-select/" + (this.gameService.overs % 6 == 0 ? "6" : "8"))
      } else {
        this.router.navigateByUrl("/player-select-bowling/" + (this.gameService.overs % 6 == 0 ? "6" : "8"))
      }
    } else {
      if ((this.gameService.getGame().getCurrentOverNumber() + 1) % 4 == 0) {
        this.router.navigateByUrl("/player-select/" + (this.gameService.overs % 6 == 0 ? "6" : "8"))
      } else {
        this.router.navigateByUrl("/player-select-bowling/" + (this.gameService.overs % 6 == 0 ? "6" : "8"))
      }
    }
  }

  prevScreen() {
    this.router.navigateByUrl("/player-select-bowling/" + (this.gameService.overs % 6 == 0 ? "6" : "8"))
  }
  
}
