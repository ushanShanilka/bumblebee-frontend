import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {ProductDTO} from "../../../../core/dto/ProductDTO";
import {StockDTO} from "../../../../core/dto/StockDTO";
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../../core/service/product.service";
import {ProductHasImageDTO} from "../../../../core/dto/ProductHasImageDTO";
import {ApprovalDialogConfig} from "../../../../core/dialogs/approval-dialog/ApprovalDialogConfig";
import {ApprovalDialogComponent} from "../../../../core/dialogs/approval-dialog/approval-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProductImagesService} from "../../../../core/service/product-images.service";
import {CategoryDTO} from "../../../../core/dto/CategoryDTO";
import {BrandsDTO} from "../../../../core/dto/BrandsDTO";
import {BrandService} from "../../../../core/service/brand.service";
import {CategoryService} from "../../../../core/service/category.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  formMode: 'CREATE' | 'UPDATE' = 'CREATE';
  productForm!: FormGroup;
  apiResponse = false;


  preview : string[] = [];
  uploadedImages : ProductHasImageDTO[] = [];
  removeImageBtn?: boolean | false;
  selectIndex :number = 0;
  imageUploadEvent: any;
  selectedFiles?: FileList;
  currentFile?: File;
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;

  defaultImg = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png';


  selectedProduct = new ProductDTO(
    0,
    '',
    '',
    0,
    0,
    0,
    new CategoryDTO(0,'',0),
    new BrandsDTO(0,'',0),
    new StockDTO(0,0,0),
    [],
  )

  brand = new FormControl('', Validators.required);
  brandDTO: BrandsDTO[] = [];
  brandFilteredOptions!: BrandsDTO[];
  selectedBrand = new BrandsDTO(
    0,
    '',
    0
  );

  category = new FormControl('', Validators.required);
  categoryDTO: CategoryDTO[] = [];
  categoryFilteredOptions!: CategoryDTO[];
  selectedCategory = new CategoryDTO(
    0,
    '',
    0
  );

  constructor(private toasterService:ToastrService,
              private formBuilder: FormBuilder,
              private fireStorage: AngularFireStorage,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService:ProductService,
              private dialog: MatDialog,
              private productImagesService:ProductImagesService,
              private brandService:BrandService,
              private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.enableDefaultImage();
    this.getAllBrands();
    this.getAllCategory();

    this.productForm = this.formBuilder.group({
      productName: ["", Validators.required],
      qty: ['', Validators.required],
      description: ['', Validators.required],
      rating: ['', Validators.required],
      price: ['', Validators.required],
      active: [false, Validators.required],
    });

    this.activatedRoute.params.subscribe(async parems => {
      if (parems.hasOwnProperty('id')) {
        let res = await this.productService.getById(Object.values(parems)[0]);

        this.selectedProduct = res.data

        this.productForm.get('productName')?.setValue(this.selectedProduct.productName)
        this.productForm.get('qty')?.setValue(this.selectedProduct.stock.qty)
        this.productForm.get('description')?.setValue(this.selectedProduct.description)
        this.productForm.get('rating')?.setValue(this.selectedProduct.rating)
        this.productForm.get('price')?.setValue(this.selectedProduct.price)

        if (this.selectedProduct.status == 1){
          this.productForm.get('active')?.setValue(true)
        }

        this.selectedBrand = this.selectedProduct.brandsDTO
        this.brand.setValue(this.selectedBrand.brandName)

        this.selectedCategory = this.selectedProduct.categoryDTO
        this.category.setValue(this.selectedCategory.categoryName)

        this.selectedProduct.productHasImageDTOS.forEach((value, index) => {
          this.preview[index] = value.url
          this.uploadedImages.push(value)
        })

        this.formMode = 'UPDATE';
      }
    })


    this.brand.valueChanges.pipe(
      map(value => this.brandFilter(value || '')),
    ).subscribe(val => this.brandFilteredOptions = val);

    this.category.valueChanges.pipe(
      map(value => this.categoryFilter(value || '')),
    ).subscribe(val => this.categoryFilteredOptions = val);
  }

  private brandFilter(value: string): BrandsDTO[] {
    const filterValue = String(value).toLowerCase();
    return this.brandDTO.filter(option => String(option.brandName).toLowerCase().includes(filterValue));
  }

  private categoryFilter(value: string): CategoryDTO[] {
    const filterValue = String(value).toLowerCase();
    return this.categoryDTO.filter(option => String(option.categoryName).toLowerCase().includes(filterValue));
  }

  getAllBrands(){
    this.brandService.getAll('active').subscribe(res => {
      if (res.data){
        this.brandFilteredOptions = res.data
        this.brandDTO = res.data

        console.log(this.brandFilteredOptions)
      }
    }, error => {
      console.log(error)
    })
  }

  getAllCategory(){
    this.categoryService.getAll('active').subscribe(res => {
      if (res.data){
        this.categoryFilteredOptions = res.data
        this.categoryDTO = res.data
      }
    }, error => {
      console.log(error)
    })
  }

  browseFile(index:number) {
    this.selectIndex = index;
    document.getElementById('fileSelector')?.click();
  }

  async uploadFileHandel(event: any) {
    const file: File = event.target.files[0];

      const validFileExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (validFileExtensions.includes(file.type)) {
        this.preview[this.selectIndex] = '';
        this.selectedFiles = event.target.files;
        this.imageUploadEvent = event
        if (this.selectedFiles) {
          const file: File | null = this.selectedFiles.item(0);
          if (file) {
            this.preview[this.selectIndex] = '';
            this.currentFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
              try {
                this.fireStorage.storage.refFromURL(this.preview[this.selectIndex]).delete()
              } catch (e) {
                console.log(e)
              }
              this.preview[this.selectIndex] = e.target.result;
              this.imagesUpload()
            };
            reader.readAsDataURL(this.currentFile);
            this.removeImageBtn = true;
          }
        }
      } else {
        this.toasterService.error("Invalid Type!")
      }
  }

  enableDefaultImage() {
    if (this.preview.length == 0) {
      this.preview[0] = this.defaultImg
      this.preview[1] = this.defaultImg
      this.preview[2] = this.defaultImg
      this.preview[3] = this.defaultImg
      this.preview[4] = this.defaultImg
      this.preview[5] = this.defaultImg
      this.preview[6] = this.defaultImg
      this.preview[7] = this.defaultImg
      this.preview[8] = this.defaultImg
    }

  }

  clear() {
    this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Confirm', 'Are You Sure?', 'You Want to Clear Form?')
    }).afterClosed().subscribe(res => {
      if (res){
        this.preview.forEach((value, index, array)=> {
          try {
            console.log(this.preview[index])
            this.fireStorage.storage.refFromURL(this.uploadedImages[index].url).delete()
            if (this.uploadedImages[index].id != 0){
              this.productImagesService.delete(this.uploadedImages[index].id).subscribe(res => {
                this.uploadedImages.splice(index, 1);
                this.preview.forEach((value, index, array) => {
                  this.preview[index] = this.defaultImg
                });
                let i = 0;
                this.uploadedImages.map(data => {
                  this.uploadedImages[i] = data
                  this.preview[i] = data.url
                  i++;
                })
              },error => {
                console.log(error)
              })
            }
          } catch (e) {
          }
          this.preview[index] = this.defaultImg
        })
        this.productForm.reset()
      }
    })
  }

  onAction() {
    if (this.productForm.valid){
      if (this.selectedBrand.brandId != 0 && this.brand.value == this.selectedBrand.brandName){
        if (this.selectedCategory.categoryId != 0 && this.category.value == this.selectedCategory.categoryName){
          if(this.uploadedImages.length > 0){
            this.apiResponse = true;
            let sub: Observable<any>;
            if (this.formMode === 'CREATE') {
              sub = this.createProduct();
            } else {
              sub = this.updateProduct();
            }
            sub.subscribe(res => {
              this.apiResponse = false;
              if (res.code === 201 || res.code === 204) {
                this.productForm.reset();
                this.router.navigate(['..'], { relativeTo: this.activatedRoute })
              }
            }, error => {
              console.log(error)
              this.apiResponse = false;
            })
          }else {
            this.toasterService.error("Please select Images")
          }
        }else {
          this.toasterService.error("Invalid category")
          this.category.reset()
          this.category.markAllAsTouched()
        }
      }else {
        this.toasterService.error("Invalid Brand")
        this.brand.reset()
        this.brand.markAllAsTouched()
      }
    }else {
      this.productForm.markAllAsTouched()
      this.toasterService.error("required fields missing")
    }
  }

  imagesUpload(): Promise<any> {
    return new Promise(((resolve, reject) => {
        if (!this.preview.some( data => data ==='https://img.freepik.com/free-icon/user_318-804790.jpg?w=2000')) {
          this.apiResponse = true;
          const randomId = Math.random().toString(16).substring(2) + Date.now();
          this.ref = this.fireStorage.ref("/products/" + randomId);
          this.task = this.ref.put(this.imageUploadEvent.target.files[0]);

          this.task.then((res) => {
            res.ref.getDownloadURL().then(url => {
              if (url != '') {
                this.uploadedImages.push(new ProductHasImageDTO(
                  0,
                  0,
                  url,
                ));
                this.apiResponse = false;
              }
              this.apiResponse = false;
            }).then(res => {
              resolve(res)
            }, msg => {
              reject(msg)
            })
          })
          // this.apiResponse = false;
        } else {
          resolve("resolve")
        }
    }))
  }

  createProduct(): Observable<any> {
    return this.productService.create(new ProductDTO(
      0,
      this.productForm.get('productName')?.value,
      this.productForm.get('description')?.value,
      this.productForm.get('rating')?.value,
      this.productForm.get('price')?.value,
      this.productForm.get('active')?.value,
      this.selectedCategory,
      this.selectedBrand,
      new StockDTO(
        0,
        0,
        this.productForm.get('qty')?.value
      ),
      this.uploadedImages,
    ));
  }

  updateProduct(): Observable<any> {
    this.selectedProduct.stock.qty = this.productForm.get('qty')?.value
    return this.productService.update(new ProductDTO(
      this.selectedProduct.id,
      this.productForm.get('productName')?.value,
      this.productForm.get('description')?.value,
      this.productForm.get('rating')?.value,
      this.productForm.get('price')?.value,
      this.productForm.get('active')?.value,
      this.selectedCategory,
      this.selectedBrand,
      this.selectedProduct.stock,
      this.uploadedImages,
    ));
  }

  removeImage(index:number) {
    this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Are You Sure ?', 'You Want to Remove Image ')
    }).afterClosed().subscribe(res => {
      if (res) {
        try {
          this.fireStorage.storage.refFromURL(this.preview[index]).delete()
          if (this.uploadedImages[index].id != 0){
            this.productImagesService.delete(this.uploadedImages[index].id).subscribe(res => {
              this.uploadedImages.splice(index, 1);
              this.preview.forEach((value, index, array) => {
                this.preview[index] = this.defaultImg
              });
              let i = 0;
              this.uploadedImages.map(data => {
                this.uploadedImages[i] = data
                this.preview[i] = data.url
                 i++;
              })
            },error => {
              console.log(error)
            })
          }
        } catch (e) {
        }
        this.preview[index] = this.defaultImg
      }
    });
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
