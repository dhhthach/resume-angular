import { Component, ViewEncapsulation, ViewChild, Renderer, Inject, ElementRef } from '@angular/core';
import * as AOS from 'aos';
import { NavbarComponent } from './navbar/navbar.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild (NavbarComponent) navbar: NavbarComponent;

  constructor(
    private renderer: Renderer, 
    @Inject(DOCUMENT) private document: any, 
    private element: ElementRef
  ) { }

  ngOnInit() {
    // init AOS 
    AOS.init();

    // init now ui kit
    let navbar: HTMLElement = this.element.nativeElement.children[0].children[0].children[0].children[0];
    this.renderer.listenGlobal('window', 'scroll', (event) => {
      const number = window.scrollY;
      if (number > 500 || window.pageYOffset > 500) {
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.add('navbar-transparent');
      }
    });

  }

}
