import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
//
import { ContactDetail } from './models/contact-detail';
import { ContactService } from './services/contact.service';
import { ContactDetailService } from './services/contact-detail.service';
import { LayoutService } from '../ms-layout/services/layout.service';
import { Sliders, Header } from '../ms-layout/models/layout';
import {MsSeoService} from '../../../shared/services/ms-seo.service';

@Component({
  selector: 'ms-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  data: ContactDetail = {
    socialInstagram: '',
    socialFacebook: '',
    socialTwitter: '',
    workingHours: '',
    timePeriodEnd: '',
    timePeriodStart: '',
  };

  firstDay = 'Monday';
  lastDay = 'Friday';

  firstHour = '';
  lastHour = '';

  formGroup: FormGroup;

  socialInstagram = false;

  socialFacebook = false;

  socialTwitter = false;

  timePeriodStart = false;

  timePeriodEnd = false;

  workingHours = false;

  title: string;

  description: string;

  imgUrl: string;

  header: Header;

  slidersData: Sliders;

  slideDisplay = '';

  headerDisplay = '';

  hottestDisplay = '';

  displayHeadertOnPage = false;

  displaySlidersOnPage = false;

  displayHottestOnPage = false;

  constructor(
    public contactService: ContactService,
    public contactDetailService: ContactDetailService,
    public layoutService: LayoutService,
    private toastr: ToastrService,
    private msSeoService: MsSeoService
  ) { }

  ngOnInit() {
    this.createFormGroup();
    this.getContactDetails();

    this.layoutService.getLayout('contact', 'heading').subscribe(response => {
      this.title = response.data.title;
      this.description = response.data.description;
      this.imgUrl = response.data.imgUrl || 'assets/images/whats-new/banner.svg';
      this.msSeoService.addMetadata(response.data.keywords);
    });

    this.layoutService.getHeader('contact').subscribe(response => {
      this.header = response.data;
      this.headerDisplay = this.header.display;
      this.displayHeadertOnPage = this.header.displayOnPage;
    });

    this.layoutService.getSliders('contact').subscribe(response => {
      this.slidersData = response.data;
      this.slideDisplay = this.slidersData.display;
      this.displaySlidersOnPage = this.slidersData.displayOnPage;
    });

    this.layoutService.getHottest('contact').subscribe(response => {
      this.hottestDisplay = response.data.display;
      this.displayHottestOnPage = response.data.displayOnPage;
    });
  }

  getContactDetails() {
    this.contactDetailService.getContactDetails('config_social_instagram').subscribe(response => {
      this.data.socialInstagram = response.data.value;
      this.socialInstagram = true;
    });

    this.contactDetailService.getContactDetails('config_social_facebook').subscribe(response => {
      this.data.socialFacebook = response.data.value;
      this.socialFacebook = true;

    });

    this.contactDetailService.getContactDetails('config_social_twitter').subscribe(response => {
      this.data.socialTwitter = response.data.value;
      this.socialTwitter = true;
    });

    this.contactDetailService.getContactDetails('time_period_end').subscribe(response => {
      this.lastHour = moment(response.data.value, 'HH:mm').format('LT');
      this.timePeriodEnd = true;
    });

    this.contactDetailService.getContactDetails('time_period_start').subscribe(response => {
      this.firstHour = moment(response.data.value, 'HH:mm').format('LT');
      this.timePeriodStart = true;
    });

    this.contactDetailService.getContactDetails('working_hours').subscribe(response => {
      this.data.workingHours = response.data.value;
      this.workingHours = true;
    }
    );
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        Validators.required
      ]),
      subject: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      captcha: new FormControl(null, [Validators.required]),
    });
  }

  submitClicked() {
    if (this.formGroup.valid) {
      const data = this.formGroup.value;
      this.sendEmail(data);
    } else {
      if (this.formGroup.get('name').value === '') {
        this.toastr.error('Please fill the field name.');
      }
      if (this.formGroup.get('email').value === '') {
        this.toastr.error('Please fill the field email.');
      }
      if (this.formGroup.get('email').errors) {
        this.toastr.error('Please check your email.');
      }
      if (this.formGroup.get('subject').value === '') {
        this.toastr.error('Please fill the field subject.');
      }
      if (this.formGroup.get('description').value === '' || this.formGroup.get('description').value.length <= 9) {
        this.toastr.error('Please write a message that is at least 10 characters long');
      }
      if (!this.formGroup.get('captcha').value) {
        this.toastr.error('The reCAPTCHA wasn not entered correctly. Try it again.');
      }
    }
  }

  sendEmail(data: any) {
    this.contactService.postSendEmail(data).subscribe(response => {
     this.toastr.success('Your email has been sent.');
    });
  }
}
