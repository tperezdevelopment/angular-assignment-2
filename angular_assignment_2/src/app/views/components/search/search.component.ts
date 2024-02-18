import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  @Output() searchChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.searchChange.emit(this.searchTerm);
  }

  onSearchChange(): void {
    this.searchChange.emit(this.searchTerm);
  }

}
