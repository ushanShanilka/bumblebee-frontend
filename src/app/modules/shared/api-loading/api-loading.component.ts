import { Component, OnInit } from '@angular/core';
import {ApiLoadingService} from "./api-loading.service";

@Component({
  selector: 'api-loading',
  templateUrl: './api-loading.component.html',
  styleUrls: ['./api-loading.component.scss']
})
export class ApiLoadingComponent implements OnInit {

  constructor(public apiLoadingService: ApiLoadingService) { }

  ngOnInit() {
  }

}
