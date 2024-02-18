import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Job } from 'src/app/models/job.interface';
import { JobState } from 'src/app/store/job.state';
import { editJob } from 'src/app/store/job.actions';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  jobForm!: FormGroup;
  roletype = ['Full Stack', 'Front End', 'Back End']
  @Input() job! : Job;
  @Output() submitSuccess = new EventEmitter<any>();

  constructor(private store: Store<JobState>) { }

  ngOnInit(): void {
    this.createJobForm();
    this.populateForm();
  }
  populateForm(): void {
    if (this.job) {
      this.jobForm.patchValue(this.job);
    }
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
      const updatedJob: Job = {
        ...this.job, 
        company: formData.company,
        skills: formData.skills,
        role_type: formData.role_type,
        job_title: formData.job_title,
        job_description: formData.job_description
      };
      this.store.dispatch(editJob({ id: this.job.id, updatedJob: updatedJob }));
      this.submitSuccess.emit(true);
    } else {
      this.jobForm.markAllAsTouched();
      console.error('Error editing job')
    }
  }

}
