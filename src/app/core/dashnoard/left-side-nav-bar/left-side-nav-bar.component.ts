import { Component, OnInit, Input } from '@angular/core';
import {MenuDTO} from "./inner-components/models/MenuDTO";
import {NavData} from "../../../../assets/nav-data/NavData";

@Component({
  selector: 'app-left-side-nav-bar',
  templateUrl: './left-side-nav-bar.component.html',
  styleUrls: ['./left-side-nav-bar.component.scss'],
})
export class LeftSideNavBarComponent implements OnInit {
  @Input() navState = true;

  currentMenus: MenuDTO [] = NavData;
  constructor() {}

  ngOnInit(): void {}
}
