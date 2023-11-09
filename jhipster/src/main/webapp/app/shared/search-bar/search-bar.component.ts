// search-bar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchQuery: string = '';

  onSearch() {
    // Vous pouvez ajouter ici le code pour gérer la recherche
    console.log('Recherche en cours : ' + this.searchQuery);
  }
}
