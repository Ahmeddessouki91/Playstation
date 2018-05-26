import { GameFormComponent } from './../game-form/game-form.component';
import { Game } from './../../models/Game';
import { GameService } from './../../services/app-services/game.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  styleUrls: ['./admin-games.component.css']
})
export class AdminGamesComponent implements OnInit, OnDestroy {
  games: Game[];
  subscription: Subscription;
  filteredGames: Game[];


  constructor(private gameService: GameService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.subscription = this.gameService.GetAll().subscribe((g: Game[]) => {
      this.filteredGames = this.games = g;
    });
  }

  filterGames(query: string) {
    this.filteredGames = (query) ?
      this.games.filter(g => g.name.toLowerCase().includes(query.toLowerCase())) :
      this.games;
  }
  open(game) {
    const modalRef = this.modalService.open(GameFormComponent);
    modalRef.componentInstance.gameEntity = game;
    modalRef.result.then(res => {
      if (!res) return;
      this.games.push(res);
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
