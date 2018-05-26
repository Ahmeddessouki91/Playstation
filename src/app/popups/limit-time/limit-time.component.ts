import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'limit-time',
  templateUrl: './limit-time.component.html',
  styleUrls: ['./limit-time.component.css']
})
export class LimitTimeComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  save(time: any) {
    console.log('saved');
    this.activeModal.close(time.minutes);
  }

}
