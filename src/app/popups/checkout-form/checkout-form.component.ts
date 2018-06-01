import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TimeService } from './../../services/app-services/time.service';
import { Time } from '../../models/time';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutFormComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private timeService: TimeService) { }
  @Input() timeEntity: Time;
  timeObj: any = {};
  subscribtion: Subscription;
  totalPrice = 0;
  usedTime = 0;
  TodayDate: Date = new Date();

  ngOnInit() {
    this.timeObj = this.timeEntity;
    if (!this.timeObj.isFinish)
      this.usedTime = this.getUsedTime(this.timeObj);
    else
      this.usedTime = Number(this.timeObj.usedTime);
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice() {
    let gameHourPrice = this.timeEntity.isMulti ?
      Number(this.timeEntity.game.category.multiPrice) : Number(this.timeEntity.game.category.singlePrice);
      console.log(this.usedTime);
      console.log(gameHourPrice);      
    return Number(this.usedTime) * (gameHourPrice / 60)
  }

  getUsedTime(time: Time) {
    let currentTime = new Date();
    let startTime = new Date(Date.parse(time.startTime.toString()));

    let diffTime = time.usedTime.valueOf() + this.timeService.diff_min(currentTime, startTime);
    return Math.round(diffTime);
  }
  save() {
    this.timeObj.isCheckout = true;
    this.timeObj.isFinish = true;
    this.timeObj.game.avaliable = true;
    this.timeService.update(this.timeObj._id, this.timeObj).subscribe(res => {
      this.activeModal.close(res);
    });
  }
}
