export class BrandsDTO{
  brandId:number;
  brandName:string;
  status:number;

  constructor(brandId: number, brandName: string, status: number) {
    this.brandId = brandId;
    this.brandName = brandName;
    this.status = status;
  }
}
