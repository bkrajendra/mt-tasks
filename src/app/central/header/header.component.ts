import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pageTitle: string = ''; // Init Page title
  constructor(
    private router:Router
  ) { 
    router.events.subscribe(event => {
      console.log(event)
      // check if its navigation-end event of cycle to get proper path
      if(event instanceof NavigationEnd){ 
        console.log(this.router.url);
        //Little hack to get the page title from route url
        this.pageTitle = ' - ' + this.router.url.split('/')[2].split('-').map(w => {return w.replace(w[0],w[0].toUpperCase())}).join(' ')
      }
    });
  }

  ngOnInit(): void {
    
  }

}
