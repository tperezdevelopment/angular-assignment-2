import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.interface';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {
  @Input() job! : Job;
  maxLength = 110;
  isCollapsed = true;

  constructor() { }

  ngOnInit(): void { }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
