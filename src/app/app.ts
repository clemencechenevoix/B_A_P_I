import { Component, signal } from '@angular/core';
import {FlowerCard} from '../feature/components/flower-card/flower-card'

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: []
})
export class App {
  protected readonly title = signal('BAPI');
}
