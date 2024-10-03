import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { CategoryModel } from '../../model/category';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'datatables.net';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noWhitespaceValidator } from '../../auth/register/confirm-password-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, DataTablesModule, ReactiveFormsModule],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css',
})
export class ManageCategoriesComponent implements OnInit {
  categories: CategoryModel[] = [];
  category: CategoryModel = new CategoryModel();

  deleteCategoryId!: string;
  editCategoryId!: string;

  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(this.category.name, [
      Validators.required,
      Validators.minLength(3),
      noWhitespaceValidator,
    ]),
  });

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  dtOptions: Config = {};

  ngOnInit(): void {
    import('datatables.net-responsive');
    this.dtOptions = {
      responsive: true,
      processing: true,
    };

    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  editCategory(categoryId: string) {
    console.log('Edit category', categoryId);
  }

  deletePost(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).subscribe((res) => {
      this.toastr.success('Post deleted successfully');
      this.categories = this.categories.filter((c) => c.id !== categoryId);
    });
  }

  setDeleteCategoryId(categoryId: string) {
    this.deleteCategoryId = categoryId;
  }

  addCategory() {
    console.log('Add category');
  }

  setEditCategoryId(categoryId: string) {
    this.editCategoryId = categoryId;
    this.categoryService.getCategoryById(categoryId).subscribe((res) => {
      this.category = res;
      this.categoryForm.patchValue(res);
    });
  }

  handleSubmit() {
    this.category = this.categoryForm.value as CategoryModel;

    if (this.editCategoryId != null) {
      this.categoryService.updateCategory(this.category).subscribe((res) => {
        this.toastr.success('Category updated successfully');
        this.categoryForm.reset();
        this.reloadTable();
        // window.location.reload();
        // this.router.navigateByUrl('this.router.url');
      });
      return;
    } else {
      this.categoryService.createCategory(this.category).subscribe((res) => {
        this.toastr.success('Category created successfully');
        this.categoryForm.reset();
        this.reloadTable();
        // this.categories.push(res);
        // window.location.reload();
      });
    }
  }

  tableReloaded: boolean = true;

  reloadTable() {
    this.tableReloaded = false;
    this.categories = [];
    this.categoryService.getAllCategories().subscribe((data) => {
      this.tableReloaded = true;
      this.categories = data;
    });
  }
}
