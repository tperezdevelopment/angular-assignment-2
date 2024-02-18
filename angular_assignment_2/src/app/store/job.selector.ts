import { createSelector, createFeatureSelector } from '@ngrx/store';
import { JobState } from './job.state';

export const selectJobState = createFeatureSelector<JobState>('jobs');

export const selectJobs = createSelector(
  selectJobState,
  (state: JobState) => state.jobs
);
