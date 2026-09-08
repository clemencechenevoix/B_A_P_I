import { Component } from '@angular/core';

@Component({
  selector: 'catalog-page',

  template: `
    <h1>catalog-page</h1>
  `,

  styles: `
    h1 {
      color: pink;
    }
  `
})
export class CatalogPage {}

@Component({
  selector: 'catalog-page-item',

  template: `
    <h1> catalog-page-item </h1>
  `,

  styles: `
    h1 {
      color: pink;
    }
  `
})
export class AppCatalogPageItem {}

@Component({
  selector: 'catalog-item-card',

  template: `
    <h1> catalog-item-card </h1>
  `,

  styles: `
    h1 {
      color: pink;
    }
  `
})
export class CatalogItemCard {}