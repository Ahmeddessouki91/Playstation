import { Cateogry } from './../models/Category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/app-services/category.service';
import { GameService } from './../services/app-services/game.service';
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/Game';
import { switchMap } from "rxjs/operators";
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games: Game[] = [];
  filterdGames: Game[] = [];
  category: string;
  games$;

  

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService, private categoryService: CategoryService) { }

  ngOnInit() {

    this.gameService.GetAll().pipe(switchMap((g: Game[]) => {
      this.games = g;
      return this.route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category');
      this.filterdGames = (this.category) ?
        this.games.filter(g => g.category.name === this.category) : this.games;
    });
  }


}
