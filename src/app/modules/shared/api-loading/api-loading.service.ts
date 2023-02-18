import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, share} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiLoadingService {

  private visible$ = new BehaviorSubject<boolean>(false);

  show() {
    this.visible$.next(true);
  }

  hide() {
    this.visible$.next(false);
  }

  isVisible(): Observable<boolean> {
    return this.visible$.asObservable().pipe(share());
  }
}
