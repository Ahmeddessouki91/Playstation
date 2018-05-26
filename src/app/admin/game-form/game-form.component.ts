import { GameService } from './../../services/app-services/game.service';
import { CategoryService } from './../../services/app-services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit, OnDestroy {

  id: string;
  catogories$;
  game: any = {
    category: {}
  };
  gameEntity: any = {
    category: {}
  };
  subscribtion: Subscription;

  constructor(private categoryService: CategoryService,
    private gameService: GameService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.catogories$ = this.categoryService.GetAll();
    if (this.gameEntity) this.game = this.gameEntity;
  }

  save(game) {
    if (this.gameEntity)
      this.subscribtion = this.gameService.update(this.gameEntity._id, game).subscribe(res => {
        this.activeModal.close(res);
      });
    else
      this.subscribtion = this.gameService.create(game).subscribe(res => {
        this.activeModal.close(res);        
      });
  }
  // delete() {
  //   this.gameService.delete(this.id).subscribe(res => {
  //   });
  //}

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
