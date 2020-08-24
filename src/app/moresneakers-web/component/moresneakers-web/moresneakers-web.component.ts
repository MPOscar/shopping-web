import { Component, OnInit, ViewChild} from '@angular/core';
//
import { CookieService } from 'ngx-cookie-service';
import { SettingsService } from '../../modules/ms-settings/services/settings.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'moresneakers-web',
  templateUrl: './moresneakers-web.component.html',
  styleUrls: ['./moresneakers-web.component.scss']
})
export class MoresneakersWebComponent implements OnInit {

  cookieLawMessage: string;

  @ViewChild('cookieLaw')

  private cookieLawEl: any;

  cookieValue = 'UNKNOWN';

  closeResult: string;

  privacyPolicy: string;
  whoWeAre: string;
  becomeAPartner: string;

  constructor(public cookieService: CookieService,
    private modalService: NgbModal,
    public settingsService: SettingsService) { }

  ngOnInit() {

    this.getGDPR();
    this.getPrivacyPolicy();
    this.getWhoWeAre();
    this.getBecomeAPartner();

    if (!this.cookieService.check('moresneakersCookieLaw')) {
    this.cookieService.set( 'moresneakersCookieLaw', 'UNKNOWN' );
    }
  }

  getGDPR() {
    this.settingsService.getGDPR().subscribe(response => {
      this.cookieLawMessage = response.data.value;
    });
  }

  getPrivacyPolicy() {
    this.settingsService.getPrivacyPolicy().subscribe(response => {
      this.privacyPolicy = response.data.value;
    });
  }

  getWhoWeAre() {
    this.settingsService.getWhoWeAre().subscribe(response => {
      this.whoWeAre = response.data.value;
    });
  }

  getBecomeAPartner() {
    this.settingsService.getBecomeAPartner().subscribe(response => {
      this.becomeAPartner = response.data.value;
    });
  }

  changeCookieLawValue(value: boolean) {
    if (value) {
      this.cookieService.set( 'moresneakersCookieLaw', 'Accepted' );
    } else {
      this.cookieService.set( 'moresneakersCookieLaw', 'Dennied' );
    }
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
