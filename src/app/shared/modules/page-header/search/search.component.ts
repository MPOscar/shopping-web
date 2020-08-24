import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  formGroup: FormGroup;

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createSearchFormGroup();
  }

  createSearchFormGroup() {
    this.formGroup = new FormGroup({
      search: new FormControl(this.activatedRoute.snapshot.queryParams.releaseName),
    });
  }

  submitForm() {
    const releaseName = this.formGroup.get('search').value;
    this.router.navigate(['/releases/search'], { queryParams: { 'releaseName': releaseName } });
  }

}
