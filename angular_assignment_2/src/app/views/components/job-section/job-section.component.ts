import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.interface';
import { SearchService } from 'src/app/services/search/search.service';


@Component({
  selector: 'app-job-section',
  templateUrl: './job-section.component.html',
  styleUrls: ['./job-section.component.css']
})
export class JobSectionComponent implements OnInit {
  roleTypes = ['All', 'Full Stack', 'Front End', 'Back End'];
  activeTab: string = 'All';
  filteredJobs: Job[] = []; 
  searchTerm: string = '';


  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.searchService.onSearchChange(this.searchTerm).subscribe(filteredJobs => {
      this.filteredJobs = filteredJobs;
    });
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.search();
  }

  changeActiveTab(roleType: string) {
    this.activeTab = roleType;
  }

}
