import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashnoard',
  templateUrl: './dashnoard.component.html',
  styleUrls: ['./dashnoard.component.scss'],
})
export class DashnoardComponent implements OnInit {
  // loading = fasle;
  navSate = true;

  constructor() {}

  ngOnInit(): void {}

  receiveNavState($event: boolean): void {
    this.navSate = $event;
  }
}
