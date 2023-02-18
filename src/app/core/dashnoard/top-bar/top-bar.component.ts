import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {AuthDTO} from "../../auth/AuthDTO";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  public isMenuOpen = true;
  @Output() event = new EventEmitter<boolean>();
  user: AuthDTO | undefined | null;

  constructor(private authenticationService:AuthService) {}

  ngOnInit(): void {}

  sendNavState(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.event.emit(this.isMenuOpen);
  }

  logout() {
    this.authenticationService.logout();
  }
}
