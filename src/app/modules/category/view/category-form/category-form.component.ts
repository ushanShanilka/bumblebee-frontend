import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BrandsDTO} from "../../../../core/dto/BrandsDTO";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {BrandService} from "../../../../core/service/brand.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ApprovalDialogComponent} from "../../../../core/dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/approval-dialog/ApprovalDialogConfig";
import {CategoryDTO} from "../../../../core/dto/CategoryDTO";
import {CategoryService} from "../../../../core/service/category.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  formMode: 'CREATE' | 'UPDATE' = 'CREATE';
  categoryForm!: FormGroup;
  apiResponse = false;

  selectedCategory = new CategoryDTO(
    0,'',0
  )

  displayedColumns: string[] = ['categoryId', 'categoryName', 'lastUpdatedBy', 'status', 'edit'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') content!: ElementRef;


  constructor(private categoryService:CategoryService,
              private toasterService: ToastrService,
              private router: Router,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllCategory();

    this.categoryForm = this.formBuilder.group({
      categoryName: ["", Validators.required],
      active: [false, Validators.required],
    });

    this.activatedRoute.params.subscribe(async parems => {
      if (parems.hasOwnProperty('id')) {
        let res = await this.categoryService.getById(Object.values(parems)[0]);

        this.selectedCategory = res.data

        this.categoryForm.get('categoryName')?.setValue(this.selectedCategory.categoryName)

        if (this.selectedCategory.status == 1){
          this.categoryForm.get('active')?.setValue(true)
        }else {
          this.categoryForm.get('active')?.setValue(false)
        }

        this.formMode = 'UPDATE';
      }
    })
  }

  refreshTable(){
    this.getAllCategory()
  }

  getAllCategory(){
    this.categoryService.getAll('all').subscribe(res=> {
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

  // exportAsConfig: ExportAsConfig = {
  //   type: 'xlsx', // the type you want to download
  //   elementIdOrContent: 'content', // the id of html/table element
  // };

  public export(format: any): void {
    // this.exportAsConfig.type = format;
    // this.exportAsService
    //   .save(this.exportAsConfig, 'brands')
    //   .subscribe(() => {
    //     this.toasterService.success("Success!")
    //   });
  }

  onAction() {
    if (this.categoryForm.valid){
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
          this.categoryForm.reset();
          this.router.navigate(['..'], { relativeTo: this.activatedRoute })
        }
      }, error => {
        console.log(error)
        this.apiResponse = false;
      })
    }else {
      this.categoryForm.markAllAsTouched()
      this.toasterService.error("required fields missing")
    }
  }

  clear() {

  }

  create(): Observable<any> {
    return this.categoryService.create(new CategoryDTO(
      0,
      this.categoryForm.get('categoryName')?.value,
      this.categoryForm.get('active')?.value == true? 1 : 2,
    ));
  }

  update(): Observable<any> {
    return this.categoryService.update(new CategoryDTO(
      this.selectedCategory.categoryId,
      this.categoryForm.get('categoryName')?.value,
      this.categoryForm.get('active')?.value == true? 1 : 2,
    ));
  }

  edit(dto: CategoryDTO) {
    this.router.navigate([`dashboard/category/add/${dto.categoryId}`])
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
