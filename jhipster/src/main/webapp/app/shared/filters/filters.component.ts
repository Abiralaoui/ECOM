import { Component } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  filterOptions = {
    filter1: false,
    filter2: false
    // Ajoutez d'autres filtres ici
  };
}
