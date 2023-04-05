import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import {ToastrService} from "ngx-toastr";
import {formatCurrency} from "@angular/common";
import {AdminDTO} from "../../../../core/dto/AdminDTO";
import {AdminService} from "../../../../core/service/admin.service";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'countryCode',
    'updatedAt',
    'birthDay',
    'email',
    'firstName',
    'lastName',
    'phoneNumber',
    'adminType',
    'status',
    'edit',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService:AdminService,
              private router: Router,
              private exportAsService:ExportAsService,
              private  toasterService:ToastrService) { }

  ngOnInit(): void {
    this.refreshTable();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'content', // the id of html/table element
  };

  public export(format: any): void {
    this.exportAsConfig.type = format;
    this.exportAsService
      .save(this.exportAsConfig, 'Admins')
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
    this.adminService.getAll().subscribe(
      (result) => {
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

  editProduct(dto: AdminDTO) {
    this.router.navigate([`dashboard/admin-management/all/${dto.id}`])
  }
}
