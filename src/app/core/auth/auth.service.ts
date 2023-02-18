import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AuthDTO} from "./AuthDTO";
import {AuthenticationRequestDTO} from "../dto/AuthenticationRequestDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.authUrl;

  private currentUserSubject: BehaviorSubject<AuthDTO | null>;
  private currentUser!: Observable<AuthDTO | null>;

  constructor(private httpClient: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthDTO | null>
    (JSON.parse(sessionStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get getCurrentUser(): AuthDTO | null {
    return this.currentUserSubject.value;
  }

  isLodged(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }

  login(dto: AuthenticationRequestDTO): Observable<any> {
    return this.httpClient.post(this.url + '/admin/login', dto, {
    }).pipe(map((user: any) => {
      console.log(user)
      this.currentUserSubject.next(user.data as AuthDTO);
      sessionStorage.setItem('currentUser', JSON.stringify(user.data));
      return user;
    }));
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
