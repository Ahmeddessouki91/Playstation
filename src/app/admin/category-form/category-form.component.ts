import { Subscription } from 'rxjs';
import { Cateogry } from './../../models/Category';
import { CategoryService } from './../../services/app-services/category.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() categoryEntity: any;

  category: any = {};
  subscribtion: Subscription;

  constructor(private categorySerive: CategoryService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (this.categoryEntity) this.category = this.categoryEntity;
  }

  save(category) {
    if (this.categoryEntity)
      this.subscribtion = this.categorySerive.Update(this.categoryEntity._id, category).subscribe(res => {
        this.activeModal.close(res);
      });
    else
        this.subscribtion = this.categorySerive.Create(category).subscribe(res => 
          this.activeModal.close(res));
  }
}
