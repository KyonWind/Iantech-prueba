import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from './app.service';
import { data } from '../mock/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  public products: any[];
  title = 'DropDown';
  form;

  constructor(private appService: AppService, private fb: FormBuilder) {
    this.products = data.items;

    this.form = this.fb.group({
      selectedCategory: null,
      selectedStore: null,
      selectedProduct: null,
    });
  }

  getProductList() {
    return this.products.filter(product => {
      const selectedCategory = this.form.get('selectedCategory').value;
      if (selectedCategory && selectedCategory !== product.category) {
        return false;
      }
      const selectedStore = this.form.get('selectedStore').value;
      if (selectedStore && !product.store.includes(selectedStore)) {
        return false;
      }
      return true;
    });
  }

  getProductListToShow() {
    return this.getProductList().filter(product => {
      const selectedProduct = this.form.get('selectedProduct').value;
      return !(selectedProduct && selectedProduct.product !== product.product);
    });
  }

  getCategoryList() {
    return this.products.reduce((acum, item) => {
      if (!acum.includes(item.category)) {
        acum.push(item.category);
      }
      return acum;
    }, []);
  }

  getStoreList() {
    return this.products.reduce((acum, item) => {
      item.store.forEach(store => {
        if (!acum.includes(store)) {
          acum.push(store);
        }
      });
      return acum;
    }, []);
  }
}
