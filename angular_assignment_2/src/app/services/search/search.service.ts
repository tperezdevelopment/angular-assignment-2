import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Job } from 'src/app/models/job.interface';
import { getJobs } from 'src/app/store/job.actions';
import { selectJobs } from 'src/app/store/job.selector';
import { JobState } from 'src/app/store/job.state';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  jobs$ = this.store.pipe(select(selectJobs)); 

  constructor(private store: Store<JobState>) { 
    this.store.dispatch(getJobs.fetchJobsFromDb());
  }

  onSearchChange(searchTerm: string): Observable<Job[]> {
    return this.jobs$.pipe(
      map(jobs => {
        if (searchTerm.trim() === '') {
          return jobs;
        } else {
          return jobs.filter(job =>
            job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.role_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.job_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.skills.indexOf(searchTerm.toLowerCase()) > -1)
          );
        }
      })
    );
  }
}
