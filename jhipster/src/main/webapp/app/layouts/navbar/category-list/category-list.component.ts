import { Component } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  showCategoryList = true;
  categories = [
    { name: 'Catégorie 1' },
    { name: 'Catégorie 2' },
    { name: 'Catégorie 3' }
  ];
}
