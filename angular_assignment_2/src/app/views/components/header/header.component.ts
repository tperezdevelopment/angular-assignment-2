import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
  roletype = ['Full Stack', 'Front End', 'Back End'];
  @ViewChild('#sectionJob') otroComponenteRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  scrollToOtroComponente() {
    this.otroComponenteRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
