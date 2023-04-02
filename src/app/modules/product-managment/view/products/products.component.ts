import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ProductService} from "../../../../core/service/product.service";
import {formatCurrency} from "@angular/common";
import {ProductDTO} from "../../../../core/dto/ProductDTO";
import {Router} from "@angular/router";
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'productName',
    'category',
    'brand',
    'description',
    'rating',
    'stock',
    'price',
    'lastUpdatedBy',
    'status',
    'edit',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService:ProductService,
              private router: Router,
              private exportAsService:ExportAsService,
              private  toasterService:ToastrService) { }

  ngOnInit(): void {
    this.refreshTable("");
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
      .save(this.exportAsConfig, 'Products')
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

  editProduct(dto: ProductDTO) {
    this.router.navigate([`dashboard/product-management/all/${dto.id}`])
  }

}
