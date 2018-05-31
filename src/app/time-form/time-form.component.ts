import { TimeService } from './../services/app-services/time.service';
import { GameService } from './../services/app-services/game.service';
import { CategoryService } from './../services/app-services/category.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { Time } from '../models/time';

@Component({
  selector: 'app-time-form',
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.css']
})
export class TimeFormComponent implements OnInit, OnDestroy {
  @Input() timeEntity: any = {};
  filteredGames: any;
  catogories$;
  games;
  timeObj: any = {
    isMulti: false
  };
  subscribtion: Subscription;

  constructor(private categoryService: CategoryService, private gameService: GameService, private timeService: TimeService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.catogories$ = this.categoryService.GetAll();
    this.subscribtion = this.gameService.GetAll("").subscribe((res: any[]) => {
      this.games = res.filter(q => q.avaliable == true);
      if (this.timeEntity) {
        this.timeObj = this.timeEntity
        this.timeObj.category = this.timeEntity.game.category._id
        this.timeObj.game = this.timeEntity.game._id;
      };
    });
  }

  changeCategory(category) {
    this.filteredGames = this.games.filter(q => q.category._id == category);
  }

  save(time) {
    if (time.limitedTime > 0) {
      time.isLimited = true;
    }
    time.game = { _id: time.game, avaliable: false };
    this.subscribtion = this.timeService.create(time).subscribe(res => {
      this.activeModal.close(res);
    });
  }



  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
