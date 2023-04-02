export class ProductHasImageDTO{
  id:number;
  productId:number;
  url:string;

  constructor(id: number, productId: number, url: string) {
    this.id = id;
    this.productId = productId;
    this.url = url;
  }
}
