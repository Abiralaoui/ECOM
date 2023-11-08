import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() selectedProduct: any;

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id') || 'valeur par défaut';
// Ici, productId aura soit la valeur du paramètre 'id', soit 'valeur par défaut' si 'id' est nul

      // Utilisez productId pour charger les détails du produit correspondant
      // Exemple : this.product = this.productService.getProductById(productId);
    });


}}
