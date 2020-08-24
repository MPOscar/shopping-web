import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MsCollapsMenuControlService} from './ms-collaps-menu-control.service';

@Injectable({
  providedIn: 'root'
})
export class MsCollapsMenuService {
  private visible = false;
  private subject = new Subject<boolean>();

  constructor(private collapsMenuControl: MsCollapsMenuControlService) { }

  public show() {
    this.notifyToMenuControl();

    this.visible = true;
    this.spreadValue();
  }

  public hide() {
    this.visible = false;
    this.spreadValue();
  }

  public toggleCollapse() {
    if (!this.visible) {
      this.notifyToMenuControl();
    }

    this.visible = !this.visible;
    this.spreadValue();
  }

  private notifyToMenuControl() {
    this.collapsMenuControl.hideActiveMenu();
    this.collapsMenuControl.registerActiveMenu(this);
  }

  public isVisible(): Observable<boolean> {
    return this.subject;
  }

  private spreadValue() {
    this.subject.next(this.visible);
  }
}
