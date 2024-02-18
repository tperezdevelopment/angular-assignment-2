import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Job } from '../models/job.interface';


export const getJobs = createActionGroup({
  source : 'Jobs List',
  events: {
    'Retrieved Job List': props<{ jobs : Job[]}>(),
    'Fetch Jobs From DB': emptyProps()
  }
})

export const addJob = createAction( '[Job] Add Job',
props<{job: Job}>()
);

export const editJob = createAction( '[Job] Edit Job',
props<{id: string, updatedJob: Partial<Job>}>()
);

export const deleteJob = createAction( '[Job] Delete Job',
props<{job: Job}>()
);

export const jobFailure = createAction(
    '[Job] Job Failure',
    props<{ error: any }>() 
  );
  