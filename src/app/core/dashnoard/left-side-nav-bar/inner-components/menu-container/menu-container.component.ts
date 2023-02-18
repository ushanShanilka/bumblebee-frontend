import { Component, OnInit, Input } from '@angular/core';
import {MenuDTO} from "../models/MenuDTO";

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.scss'],
})
export class MenuContainerComponent implements OnInit {

  change:boolean=true;

  @Input() Menus!: MenuDTO[] | undefined;

  @Input() navState= true;
  constructor() {
  }

  ngOnInit(): void {
  }
  isMultiLevel(menu:MenuDTO):boolean{
    if (!!menu.list){
      return menu.list.length > 0;
    }
    return false;
  }


}
