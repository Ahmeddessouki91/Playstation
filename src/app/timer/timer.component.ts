import { Component, OnInit } from '@angular/core';
import { interval, timer, Subscription, Observable } from 'rxjs';
import { map } from "rxjs/operators";
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {


  message: string;
  counter$: any;
  future: Date;
  subscription: Subscription;

  constructor() { }


  dhms(t) {
    var hours, minutes, seconds;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');
  }


  ngOnInit() {
    this.future = new Date();
    this.future.setSeconds(this.future.getSeconds() + 5);
    this.subscription = timer(1000, 2000).subscribe((t) => {
      let counter = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);

      this.message = this.dhms(counter);
      console.log(counter);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
