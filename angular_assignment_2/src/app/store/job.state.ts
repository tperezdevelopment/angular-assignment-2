import { Job } from "../models/job.interface";

export interface JobState {
  jobs: Job[];
}

export const initialState: JobState = {
  jobs: []
};
