import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule, NativeScriptRouterModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ItemsComponent } from './item/items.component'
import { ItemDetailComponent } from './item/item-detail.component'
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { PlayersNames6Component } from './players-names/players-names-6.component';
import { PlayersNames8Component } from './players-names/players-names-8.component';
import { PlayerSelect6Component } from './player-select/player-select-6.component';
import { PlayerSelect8Component } from './player-select/player-select-8.component';
import { PlayComponent } from './play/play.component';
import { TeamNameComponent } from './team-name/team-name.component';
import { BattingTeamComponent } from './batting-team/batting-team.component';
import { OversComponent } from './overs/overs.component';
import { FormsModule } from '@angular/forms'
import { PlayerSelectBowling6Component } from './player-select-bowling/player-select-6.component';
import { PlayerSelectBowling8Component } from './player-select-bowling/player-select-8.component';

export const routerConfig = [
  {
    path: "",
    component: FirstScreenComponent
  },
  {
      path: "first-screen",
      component: FirstScreenComponent
  },
  {
      path: "players-names",
      children: [
          { path: "6", component: PlayersNames6Component },
          { path: "8", component: PlayersNames8Component }
      ]
  },
  {
    path: "player-select",
    children: [
        { path: "6", component: PlayerSelect6Component },
        { path: "8", component: PlayerSelect8Component }
    ]
  },
  {
    path: "player-select-bowling",
    children: [
      { path: "6", component: PlayerSelectBowling6Component },
      { path: "8", component: PlayerSelectBowling8Component }
    ]
  },
  {
    path: "play",
    component: PlayComponent
  },
  {
    path: "team-name",
    component: TeamNameComponent
  },
  {
    path: "batting-team",
    component: BattingTeamComponent
  },
  {
    path: "overs",
    component: OversComponent
  }
  
];


@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptRouterModule, NativeScriptRouterModule.forRoot(routerConfig), FormsModule],
  declarations: [AppComponent, ItemsComponent, ItemDetailComponent, FirstScreenComponent, PlayersNames6Component, PlayersNames8Component, PlayerSelect6Component, PlayerSelect8Component, PlayComponent, TeamNameComponent, BattingTeamComponent, OversComponent, PlayerSelectBowling6Component, PlayerSelectBowling8Component],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

