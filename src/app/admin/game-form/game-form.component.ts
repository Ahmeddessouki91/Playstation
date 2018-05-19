import { GameService } from './../../services/app-services/game.service';
import { CategoryService } from './../../services/app-services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  catogories$;

  constructor(private categoryService: CategoryService, private gameService: GameService) {
    this.catogories$ = categoryService.getCategories();
    console.log(this.catogories$);
  }

  ngOnInit() {
  }

  save(game) {
    this.gameService.create(game);
  }

}
