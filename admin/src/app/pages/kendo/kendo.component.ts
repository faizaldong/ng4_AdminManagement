import { Component } from '@angular/core';
import { products } from './products';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-kendo',
  templateUrl: './kendo.component.html',
  styleUrls: ['./kendo.component.css']
})
export class KendoComponent {

  public productView: GridDataResult;
  public data: Object[];
  public page_size: number = 10;
  public skip: number = 0;

  public products: any[] = products;

  constructor(){
    this.loadItems();
  }

  public page_change(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.productView = {
      data: this.products.slice(this.skip, this.skip + this.page_size),
      total: this.products.length
    };
  }

  title = 'Hello World!';

  onButtonClick() {
      this.title = 'Hello from Kendo UI!';
  }

}
