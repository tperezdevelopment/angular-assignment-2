import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Job } from '../../models/job.interface';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private firestore: AngularFirestore) { }

  getJobs(): Observable<Job[]> {
    return this.firestore.collection<Job>('jobs').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Job;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  addJob(job: Job): Observable<Job> {
    return from(this.firestore.collection('jobs').add(job)).pipe(
      map(() => job),
      catchError(error => {
        console.error('Error adding job:', error);
        throw error;
      })
    );
  }

  editJob(id: string, updatedJob: Partial<Job>): Observable<void> {
    return from(this.firestore.doc(`jobs/${id}`).update(updatedJob)).pipe(
      catchError(error => {
        console.error('Error editing job:', error);
        throw error;
      })
    );
  }

  deleteJob(job : Job): Observable<void> {
    return from(this.firestore.doc(`jobs/${job.id}`).delete()).pipe(
      catchError(error => {
        console.error('Error deleting job:', error);
        throw error;
      })
    );
  }
}
