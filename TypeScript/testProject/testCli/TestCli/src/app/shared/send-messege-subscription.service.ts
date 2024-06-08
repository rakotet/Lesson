import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMessegeSubscriptionService {
  private variableSubject = new Subject<string>();
  variable$ = this.variableSubject.asObservable();

  updateData(newValue: string) {
    this.variableSubject.next(newValue);
  }
}
