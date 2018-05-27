import { CategoryService } from './../../services/app-services/category.service';
import { CategoryFormComponent } from './../category-form/category-form.component';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Cateogry } from '../../models/Category';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  closeResult: string;
  subscription: Subscription;
  filteredCategories: Cateogry[];
  categories: Cateogry[];

  constructor(private modalService: NgbModal, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  filterCategories(query: string) {
    this.filteredCategories = (query) ?
      this.categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase())) :
      this.categories;
  }

  getCategories() {
    this.subscription = this.categoryService.GetAll().subscribe((c: Cateogry[]) => {
      this.filteredCategories = this.categories = c;
    });
  }

  open(category) {
    const modalRef = this.modalService.open(CategoryFormComponent);
    modalRef.componentInstance.categoryEntity = category;
    modalRef.result.then(res => {
      if (!res) return;
      this.getCategories();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
