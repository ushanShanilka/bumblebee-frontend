import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {BrandsDTO} from "../../../../core/dto/BrandsDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {BrandService} from "../../../../core/service/brand.service";
import {ApprovalDialogComponent} from "../../../../core/dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/approval-dialog/ApprovalDialogConfig";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ProductDTO} from "../../../../core/dto/ProductDTO";
import {StockDTO} from "../../../../core/dto/StockDTO";
import {ExportAsConfig, ExportAsService} from "ngx-export-as";

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  formMode: 'CREATE' | 'UPDATE' = 'CREATE';
  brandForm!: UntypedFormGroup;
  apiResponse = false;

  selectedBrand = new BrandsDTO(
    0,'',0
  )

  displayedColumns: string[] = ['brandId', 'brandName', 'lastUpdatedBy', 'status', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') content!: ElementRef;


  constructor(private brandService:BrandService,
              private toasterService: ToastrService,
              private router: Router,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private formBuilder: UntypedFormBuilder,
              private exportAsService:ExportAsService) { }

  ngOnInit(): void {
    this.getAllBrand();

    this.brandForm = this.formBuilder.group({
      brandName: ["", Validators.required],
      active: [false, Validators.required],
    });

    this.activatedRoute.params.subscribe(async parems => {
      if (parems.hasOwnProperty('id')) {
        let res = await this.brandService.getById(Object.values(parems)[0]);

        this.selectedBrand = res.data

        this.brandForm.get('brandName')?.setValue(this.selectedBrand.brandName)

        if (this.selectedBrand.status == 1){
          this.brandForm.get('active')?.setValue(true)
        }else {
          this.brandForm.get('active')?.setValue(false)
        }

        this.formMode = 'UPDATE';
      }
    })

  }

  refreshTable(){
    this.getAllBrand()
  }

  getAllBrand(){
    this.brandService.getAll('all').subscribe(res=> {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'content', // the id of html/table element
  };

  public export(format: any): void {
    this.exportAsConfig.type = format;
    this.exportAsService
      .save(this.exportAsConfig, 'brands')
      .subscribe(() => {
        this.toasterService.success("Success!")
      });
  }

  onAction() {
    if (this.brandForm.valid){
      this.apiResponse = true;
      let sub: Observable<any>;
      if (this.formMode === 'CREATE') {
        sub = this.create();
      } else {
        sub = this.update();
      }
      sub.subscribe(res => {
        this.apiResponse = false;
        if (res.code === 201 || res.code === 204) {
          this.refreshTable();
          this.brandForm.reset();
          this.router.navigate(['..'], { relativeTo: this.activatedRoute })
        }
      }, error => {
        console.log(error)
        this.apiResponse = false;
      })
    }else {
      this.brandForm.markAllAsTouched()
      this.toasterService.error("required fields missing")
    }
  }

  clear() {

  }

  create(): Observable<any> {
    return this.brandService.create(new BrandsDTO(
      0,
      this.brandForm.get('brandName')?.value,
      this.brandForm.get('active')?.value == true? 1 : 2,
    ));
  }

  update(): Observable<any> {
    return this.brandService.update(new BrandsDTO(
      this.selectedBrand.brandId,
      this.brandForm.get('brandName')?.value,
      this.brandForm.get('active')?.value == true? 1 : 2,
    ));
  }

  edit(dto: BrandsDTO) {
    this.router.navigate([`dashboard/brand/add/${dto.brandId}`])
  }

  cancel() {
    this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Confirm', 'Are You Sure ?', 'You Want to Close Form ')
    }).afterClosed().subscribe(res => {
      if (res){
        this.router.navigate(['..'], { relativeTo: this.activatedRoute })
      }
    })
  }
}
