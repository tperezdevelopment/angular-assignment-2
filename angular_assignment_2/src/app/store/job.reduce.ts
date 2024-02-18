import { createReducer, on } from '@ngrx/store';
import { initialState, JobState } from './job.state';
import * as JobActions from './job.actions';

const _jobReducer = createReducer(
    initialState,
    on(JobActions.getJobs.retrievedJobList, (state, { jobs }) => ({ 
        jobs
    })),
    on(JobActions.addJob, (state, { job }) => ({
        ...state,
        jobs: [...state.jobs, job]
      })),

    on(JobActions.editJob, (state, { id, updatedJob}) => ({
    ...state,
    jobs: state.jobs.map(job => job.id === id ? {...job, ...updatedJob } : job )
    })),

    on(JobActions.deleteJob, (state, {job}) => ({
        ...state, 
        jobs: state.jobs.filter(jobN => jobN.id !== job.id)
    }))
);

export function jobReducer(state : JobState | undefined, action: any){
    return _jobReducer(state, action);
}