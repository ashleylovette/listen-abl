import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

export interface LiveShow {
  date: string;
  title: string;
  venue: string | null;
}

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private lastScrollY = 0;

  readonly headerHidden = signal(false);

  readonly liveShows: LiveShow[] = [
    {
      date: '5.16',
      title: 'BONE IN YOUR BACKYARD',
      venue: 'Z95 The Bone — Poplar Bluff, MO'
    },
    {
      date: '5.30',
      title: 'THE MILL LIVE SHOW',
      venue: 'The Mill — Ellsinore, MO'
    },
    {
      date: '6.25',
      title: "HAFF WHISKEY'S LIVE SHOW",
      venue: "Haff Whiskey's Saloon — Poplar Bluff, MO"
    },
    {
      date: '7.24',
      title: "KING DAVID'S LIVE SHOW",
      venue: null
    }
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const y = window.scrollY ?? document.documentElement.scrollTop;
    const topThreshold = 48;

    if (y <= topThreshold) {
      this.headerHidden.set(false);
    } else if (y > this.lastScrollY) {
      this.headerHidden.set(true);
    } else {
      this.headerHidden.set(false);
    }

    this.lastScrollY = y;
  }
}
