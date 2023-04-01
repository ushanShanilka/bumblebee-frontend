import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ProductService} from "../../../../core/service/product.service";
import {formatCurrency} from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'rating',
    'price',
    'lastUpdatedBy',
    'status',
    'edit',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.refreshTable("");
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTable(value:string): void {
    this.loadTable(value);
  }

  public loadTable(value:string): void {
    this.productService.getAll(value).subscribe(
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
