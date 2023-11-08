import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, ListeProduitsComponent, ProductDetailComponent],
})
export class HomeModule {}
