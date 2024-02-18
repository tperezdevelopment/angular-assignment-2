import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Job } from 'src/app/models/job.interface';
import { deleteJob, getJobs } from 'src/app/store/job.actions';
import { selectJobs } from 'src/app/store/job.selector';
import { JobState } from 'src/app/store/job.state';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-admin-job',
  templateUrl: './admin-job.component.html',
  styleUrls: ['./admin-job.component.css']
})
export class AdminJobComponent implements OnInit {
  jobs$ = this.store.pipe(select(selectJobs)); 
  filteredJobs: Job[] = []; 
  private modalService = inject(NgbModal);
  closeResult = '';
  private modalRef!: NgbModalRef;
  searchTerm: string = '';

  constructor(private store: Store<JobState>, private searchService: SearchService) { }

  ngOnInit(): void {
    this.store.dispatch(getJobs.fetchJobsFromDb());
    this.search();
  }

  search(): void {
    this.searchService.onSearchChange(this.searchTerm).subscribe(filteredJobs => {
      this.filteredJobs = filteredJobs;
    });
  }

  addJob(addJobTemplate: TemplateRef<any>) {
    this.modalService.open(addJobTemplate, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
   
  }

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
  }

  editJob(editJobTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.open(editJobTemplate, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
  }

  closeEditTemplate (success : boolean){
    success? this.modalRef.close() : console.error("Problem with the edit job form");
  }

  deleteJob(job: Job) {
    this.store.dispatch(deleteJob({ job }));
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.search();
  }

}
