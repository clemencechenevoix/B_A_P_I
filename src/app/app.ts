import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('BAPI');
}

@Component({
  selector: 'not-found',

  template: `
    <h1>not found</h1>
  `,

  styles: `
  
  `,
})
export class NotFound {
  protected readonly title = signal('BAPI');
}