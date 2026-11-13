import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { ThemeService } from './core/services/theme';
import { Header } from './layout/header/header';
import { Hero } from './sections/home/hero/hero';

@Component({
  imports: [Header, Hero],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('portfolio');
  readonly themeService = inject(ThemeService);
}
