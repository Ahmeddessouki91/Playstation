import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Time } from '../../models/time';
import { TimeService } from '../../services/app-services/time.service';

@Component({
  selector: 'limit-time',
  templateUrl: './limit-time.component.html',
  styleUrls: ['./limit-time.component.css']
})
export class LimitTimeComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private timeService: TimeService) { }

  @Input() timeEntity: Time;
  time: any = {};
  subscribtion: Subscription;

  ngOnInit() {
  }

  save(time: Time) {
    time._id = this.timeEntity._id;
    time.limitedTime = Number(time.limitedTime) +   Number(this.timeEntity.limitedTime);
    this.activeModal.close();
  }

}
