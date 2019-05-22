import { Component, ViewEncapsulation, ViewChild, Renderer, Inject, ElementRef } from '@angular/core';
import * as AOS from 'aos';
import { NavbarComponent } from './navbar/navbar.component';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  @ViewChild (NavbarComponent) navbar: NavbarComponent;

  public data: any = {};

  constructor(
    private renderer: Renderer, 
    @Inject(DOCUMENT) private document: any, 
    private element: ElementRef,
    private service: AppService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // init AOS 
    AOS.init();

    // transparent header on scroll
    let navbar: HTMLElement = this.element.nativeElement.children[0].children[0].children[0].children[0];
    this.renderer.listenGlobal('window', 'scroll', (event) => {
      const number = window.scrollY;
      if (number > 150 || window.pageYOffset > 150) {
        navbar.classList.remove('navbar-transparent');
      } else {
        navbar.classList.add('navbar-transparent');
      }
    });


    //init global data
    this.service.getResume().subscribe(data => {
      this.data = data;
    });

    // setTimeout(() => {
    //   debugger;
    //   this.data = {
    //     "about": {
    //     "dob": "11/04/1989",
    //     "email": "hongthach.duong@gmail.com",
    //     "facebook": "https://www.facebook.com/dhhthach",
    //     "profile": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/profile.jpg?alt=media&token=5a4c7057-ae9a-44dd-8315-c8e5d2a7e1f5",
    //     "git": "https://github.com/kira411",
    //     "hometown": "Ho Chi Minh City",
    //     "intro": "Plzzzzzz",
    //     "language": "Vietnamese, English",
    //     "linkedin": "https://www.linkedin.com/in/dhhthach",
    //     "name": "Thach Duong",
    //     "phone": "+84-908-234411",
    //     "skype": "skype:dhhthach?chat",
    //     "website": "https://duong-thach.webapp.com",
    //     "header": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/headerbackground.jpg?alt=media&token=831af48c-1b35-444a-a99e-03e5e342d2cf",
    //     "footer": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/footerbackground.png?alt=media&token=2d6c1c3f-434c-497d-8100-978fc2b742c4"
    //     },
    //     "education": [
    //     {
    //     "certification": "Bachelors Degree",
    //     "order": 1,
    //     "when": "2012",
    //     "where": "University of Techonology, HCM"
    //     },
    //     {
    //     "certification": "Toeic 900",
    //     "order": 2,
    //     "when": "2016",
    //     "where": "FPT Software HCM"
    //     },
    //     {
    //     "certification": "Predix Certified Developer",
    //     "order": 3,
    //     "when": "2016",
    //     "where": "GE Digital"
    //     }
    //     ],
    //     "experience": [
    //     {
    //     "company": "FPT USA",
    //     "description": "Get my hand dirty with Front End stuffs. For General Electric (GE): Create lot of POCs which utilize GE's Predix platform for Industrial Internet Of Things. For Halliburton: Develop new feature for OEC Console.",
    //     "order": 3,
    //     "time": "2016 - Present",
    //     "title": "Senior Fullstack Developer"
    //     },
    //     {
    //     "company": "Harvey Nash Vietnam",
    //     "description": "I worked as back end developer. This time, it is about tool for editors to create contents for Australian newspaper. Adobe CQ5, cheers.",
    //     "order": 2,
    //     "time": "2015 - 2016",
    //     "title": "Senior Developer"
    //     },
    //     {
    //     "company": "Robert Bosch Vietnam",
    //     "description": "I was a member who played in both internal projects and external one. They are from tools which facilitate processes at Bosch to global project for German customers.",
    //     "order": 1,
    //     "time": "2012 - 2015",
    //     "title": "Developer"
    //     }
    //     ],
    //     "projects": [
    //     {
    //     "description": "...",
    //     "image": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/01.png?alt=media&token=ca145d26-9df4-4c1d-9024-e08ba7e8704e",
    //     "name": "OEC Portal",
    //     "tech": "Angular, OData, Express"
    //     },
    //     {
    //     "image": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/02.png?alt=media&token=eab28fa3-f866-43f7-9172-e3f299fe8e3b",
    //     "name": "Windfarm Management",
    //     "tech": "AngularJS, Spring, WebSocket"
    //     },
    //     {
    //     "image": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/03.png?alt=media&token=6c8caaaf-a673-4c63-a86a-7b2fbd3b3b92",
    //     "name": "Fleet Management",
    //     "tech": "AngularJS, Spring, Highcharts"
    //     },
    //     {
    //     "image": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/04.png?alt=media&token=c7046977-a7e4-4576-99fd-6e23ceab1531",
    //     "name": "Digital Twin",
    //     "tech": "AngularJS, HTML, CSS"
    //     },
    //     {
    //     "image": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/05.png?alt=media&token=9b4d86f4-09aa-4d13-aa7b-2a2ea1c7b5bc",
    //     "name": "Eenie Meenie",
    //     "tech": "Spring, JQuery, Bootstrap"
    //     },
    //     {
    //     "image": "https://firebasestorage.googleapis.com/v0/b/duong-thach.appspot.com/o/06.png?alt=media&token=c4247807-2036-48fa-944a-cfa6ae1f0132",
    //     "name": "Funpepper",
    //     "tech": "AngularJS, HTML, CSS"
    //     }
    //     ],
    //     "skills": {
    //     "backend": [
    //     {
    //     "level": 70,
    //     "name": "Spring"
    //     },
    //     {
    //     "level": 70,
    //     "name": "SQL"
    //     },
    //     {
    //     "level": 70,
    //     "name": "NodeJS"
    //     },
    //     {
    //     "level": 70,
    //     "name": "Grunt/Gulp/Webpack"
    //     },
    //     {
    //     "level": 70,
    //     "name": "Git"
    //     }
    //     ],
    //     "frontend": [
    //     {
    //     "level": 80,
    //     "name": "Angular"
    //     },
    //     {
    //     "level": 80,
    //     "name": "Polymer"
    //     },
    //     {
    //     "level": 80,
    //     "name": "HTML/CSS"
    //     }
    //     ]
    //     }
    //     };
    // }, 3000);
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  download() {
    alert('comming soon');
  }

}
