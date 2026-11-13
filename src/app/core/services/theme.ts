
import { Injectable, signal, computed, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly themeSignal = signal<Theme>('dark');

  readonly theme = this.themeSignal.asReadonly();

  readonly isDark = computed(() => this.themeSignal() === 'dark');

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const savedTheme = localStorage.getItem('portfolio-theme');

    const theme: Theme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : 'dark';

    this.setTheme(theme);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);

    this.document.documentElement.setAttribute(
      'data-theme',
      theme
    );

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('portfolio-theme', theme);
    }
  }

  toggleTheme(): void {
    const nextTheme = this.isDark() ? 'light' : 'dark';

    this.setTheme(nextTheme);
  }
}
