import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../../../core/service/users.service';
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import {ToastrService} from "ngx-toastr";
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'dateOfBirth',
    'nic',
    'phoneNumber',
    'address',
    'loanBalance',
    'usedAmount',
    'plan',
    'countryCode',
    'status'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UsersService,
              private exportAsService:ExportAsService,
              private toasterService:ToastrService) {}

  ngAfterViewInit(): void {
    this.refreshTable();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'content', // the id of html/table element
  };

  public export(format: any): void {
    this.exportAsConfig.type = format;
    this.exportAsService
      .save(this.exportAsConfig, 'Users')
      .subscribe(() => {
        this.toasterService.success("Success!")
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTable(): void {
    this.loadTable();
  }

  public loadTable(): void {
    this.usersService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  transformCurrency(value:string){
    return formatCurrency(+value,'en-US',"")
  }
}
