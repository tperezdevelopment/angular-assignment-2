import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Job } from 'src/app/models/job.interface';
import { JobState } from 'src/app/store/job.state';
import { addJob } from 'src/app/store/job.actions';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  jobForm!: FormGroup;
  roletype = ['Full Stack', 'Front End', 'Back End']

  constructor(private store: Store<JobState>) { }

  ngOnInit(): void {
    this.createJobForm();
  }

  createJobForm(): void {
    this.jobForm = new FormGroup({
      company: new FormControl(null, Validators.required),
      skills: new FormControl(null, Validators.required), 
      role_type: new FormControl('Full Stack'),
      job_title: new FormControl(null, Validators.required),
      job_description: new FormControl(null, Validators.required)
    });
  }

  get companyIsValid() {
    return (
      this.jobForm.get('company')!.touched &&
      !this.jobForm.get('company')!.valid
    );
  }

  get skillsIsValid() {
    return (
      this.jobForm.get('skills')!.touched &&
      !this.jobForm.get('skills')!.valid
    );
  }

  get roleTypeIsValid() {
    return (
      this.jobForm.get('role_type')!.touched &&
      !this.jobForm.get('role_type')!.valid
    );
  }

  get jobTitleIsValid() {
    return (
      this.jobForm.get('job_title')!.touched &&
      !this.jobForm.get('job_title')!.valid
    );
  }

  get jobDescriptionIsValid() {
    return (
      this.jobForm.get('job_description')!.touched &&
      !this.jobForm.get('job_description')!.valid
    );
  }


  onSubmit(): void {
    if (this.jobForm.valid) {
      const formData = this.jobForm.value;
      const job: Job = {
        id: '', 
        company: formData.company,
        skills: formData.skills,
        role_type: formData.role_type,
        job_title: formData.job_title,
        job_description: formData.job_description
      };
      this.store.dispatch(addJob({ job }));
      this.jobForm.reset();
      this.jobForm.patchValue({ role_type: 'Full Stack' }); 
    } else {
      this.jobForm.markAllAsTouched();
      console.error('Error adding job')
    }
  }
}
