import { getTestBed } from '@angular/core/testing';
import { Cateogry } from './../models/Category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/app-services/category.service';
import { GameService } from './../services/app-services/game.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../models/Game';
import { Time } from "../models/time";
import { switchMap } from "rxjs/operators";
import { timer, Subscription } from 'rxjs';
import { TimeService } from '../services/app-services/time.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeFormComponent } from '../time-form/time-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  times: Time[] = [];
  filterdTimes: Time[] = [];
  subscription: Subscription;

  constructor(private timeService: TimeService, public modalService: NgbModal) { }

  ngOnInit() {
    setInterval(() => {
      this.filterTimes("");
    }, 1000 * 60)
    this.getTimes();
  }

  getTimes() {
    this.subscription = this.timeService.GetAll().subscribe((t: Time[]) => {
      this.filterdTimes = this.times = t;
    });
  }

  filterTimes(query: string) {
    this.filterdTimes = (query) ?
      this.times.filter((t: Time) => t.game.name.toLowerCase().includes(query.toLowerCase())) :
      this.times;
  }

  open(time) {
    const modalRef = this.modalService.open(TimeFormComponent, { size: 'lg' });
    modalRef.componentInstance.timeEntity = time;
    modalRef.result.then(res => {
      if (!res) return;
      this.getTimes();
    });
  }

  usedTime(time: string) {

    let currentTime = new Date();
    let startTime = new Date(Date.parse(time));

    let diffTime = this.diff_hours(currentTime, startTime);


    let hours = Math.round((diffTime / 60));
    let minutes = Math.round(((diffTime / 60) % 1) * 60);
    
    let deff = Math.abs(currentTime.getTime() - startTime.getTime());

    return ((hours < 9) ? ("0" + hours) : hours) + ":" + ((minutes < 9) ? ("0" + minutes) : minutes); // minutes
  }

  diff_hours(dt2: any, dt1: any) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return diff /= 60;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
