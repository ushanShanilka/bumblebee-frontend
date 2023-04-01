import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  formMode: 'CREATE' | 'UPDATE' = 'CREATE';
  productForm!: FormGroup;


  preview : string[] = [];
  removeImageBtn?: boolean | false;
  selectIndex :number = 0;
  imageUploadEvent: any;
  selectedFiles?: FileList;
  currentFile?: File;




  constructor(private toasterService:ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.enableDefaultImage();

    this.productForm = this.formBuilder.group({
      productName: ["", Validators.required],
      qty: ['', Validators.required],
      description: ['', Validators.required],
      rating: ['', Validators.required],
      price: ['', Validators.required],
      active: [false, Validators.required],
    });
  }

  browseFile(index:number) {
    this.selectIndex = index;
    document.getElementById('fileSelector')?.click();
  }

  uploadFileHandel(event: any) {
    const file: File = event.target.files[0];

      const validFileExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (validFileExtensions.includes(file.type)) {
        this.preview[this.selectIndex] = '';
        this.selectedFiles = event.target.files;
        this.imageUploadEvent = event;
        if (this.selectedFiles) {
          const file: File | null = this.selectedFiles.item(0);
          if (file) {
            this.preview[this.selectIndex] = '';
            this.currentFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
              try {
                // this.fireStorage.storage.refFromURL(this.preview).delete()
              } catch (e) {
                console.log(e)
              }
              this.preview[this.selectIndex] = e.target.result;
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
      console.log("true")
      this.preview[0] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      this.preview[1] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      this.preview[2] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      this.preview[3] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      this.preview[4] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      this.preview[5] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      this.preview[6] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      this.preview[7] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      this.preview[8] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
      // this.selectedFarmer.profileImg = this.preview;
    }

  }

  clear() {
    this.preview.forEach((value, index, array)=> {
      this.preview[index] = 'https://cdn1.iconfinder.com/data/icons/symbol-color-common-5/32/gallery-add-512.png'
    })
  }

  onAction() {

  }
}
