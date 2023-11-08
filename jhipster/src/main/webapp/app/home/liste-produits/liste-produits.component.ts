import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.scss']
})
export class ListeProduitsComponent implements OnInit {
  products: any[];

  constructor(private router: Router) {
    this.products = [
      { id: 1, nom: 'Produit 1', prix: 19.99, description: 'Description du Produit 3 en solde "30%"',image: '../../../../content/images/img.png' },
      { id: 2, nom: 'Produit 2', prix: 29.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 3, nom: 'Produit 3', prix: 39.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 1, nom: 'Produit 1', prix: 19.99,description: 'Description du Produit 3', image: '../../../../content/images/img.png' },
      { id: 2, nom: 'Produit 2', prix: 29.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 3, nom: 'Produit 3', prix: 39.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 1, nom: 'Produit 1', prix: 19.99, description: 'Description du Produit 3',image: '../../../../content/images/img.png' },
      { id: 2, nom: 'Produit 2', prix: 29.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 3, nom: 'Produit 3', prix: 39.99, description: 'Description du Produit 3',image: '../../../content/images/carsoul1.png' },
      { id: 1, nom: 'Produit 1', prix: 19.99,description: 'Description du Produit 3', image: '../../../../content/images/img.png' },
      { id: 2, nom: 'Produit 2', prix: 29.99, description: 'Description du Produit 3',image: '../../../content/images/carsoul1.png' },
      { id: 3, nom: 'Produit 3', prix: 39.99, description: 'Description du Produit 3',image: '../../../content/images/carsoul1.png' },
    ];
  }

  ngOnInit() {
    // Vous pouvez effectuer des opérations supplémentaires lors de l'initialisation du composant ici.
  }
  selectedProduct: any; // Définissez le type de votre produit ici
  onProductSelected(product: any) {
    this.selectedProduct = product;



  }
  onProductSelectedproduct(product: any) {
      this.router.navigate(['/product', product.id]);
  }


}
