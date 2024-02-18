import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { JobService } from '../services/job/job.service';
import * as JobActions from './job.actions';


@Injectable()
export class JobEffects {

  constructor(
    private actions$: Actions,
    private jobService: JobService
  ) {}

  getJobs$ = createEffect(() => this.actions$.pipe(
    ofType(JobActions.getJobs.fetchJobsFromDb),
    exhaustMap(() => this.jobService.getJobs().pipe(
      map(jobs => JobActions.getJobs.retrievedJobList({jobs})),
      catchError(error => {
        console.error('Error when try to get Jobs:', error);
        return of(JobActions.jobFailure({ error }));
      })      
    ))
  ));

  addJob$ = createEffect(() => this.actions$.pipe(
    ofType(JobActions.addJob),
    exhaustMap(({ job }) => this.jobService.addJob(job).pipe(
      map(() => JobActions.addJob({ job })),
      catchError(error => {
        console.error('Error when try to add Jobs:', error);
        return of(JobActions.jobFailure({ error }));
      })
    ))
  ));

  editJob$ = createEffect(() => this.actions$.pipe(
    ofType(JobActions.editJob),
    exhaustMap(({ id, updatedJob }) => this.jobService.editJob(id, updatedJob).pipe(
      map(() => JobActions.editJob({ id, updatedJob })),
      catchError(error => {
        console.error('Error when try to edit Jobs', error);
        return of(JobActions.jobFailure({ error }));
      })
    ))
  ));

  deleteJob$ = createEffect(() => this.actions$.pipe(
    ofType(JobActions.deleteJob),
    mergeMap(({job}) => this.jobService.deleteJob(job).pipe(
        map(() => JobActions.deleteJob({job})),
        catchError(error => {
            console.error('Error when try to delete Jobs', error);
            return of(JobActions.jobFailure({error}));
        })
        ))
      ));

}
