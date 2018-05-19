import { GameService } from './../../services/app-services/game.service';
import { CategoryService } from './../../services/app-services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit, OnDestroy {

  catogories$;
  subscribtion: Subscription;

  constructor(private categoryService: CategoryService, private gameService: GameService) {
  }

  ngOnInit() {
    this.catogories$ = this.categoryService.getCategories();
    console.log(this.catogories$);
  }

  save(game) {
    this.subscribtion.add(this.gameService.create(game).subscribe(res => {
      console.log(res);
    }));
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
