import {StockDTO} from "./StockDTO";
import {ProductHasImageDTO} from "./ProductHasImageDTO";

export class ProductDTO{
  id:number;
  productName:string;
  description:string;
  rating:number;
  price:number;
  status:string;
  stock:StockDTO;
  productHasImageDTOS:ProductHasImageDTO[];

  constructor(id: number, productName: string, description: string, rating: number, price: number, status: string, stock: StockDTO, productHasImageDTOS: ProductHasImageDTO[]) {
    this.id = id;
    this.productName = productName;
    this.description = description;
    this.rating = rating;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.productHasImageDTOS = productHasImageDTOS;
  }
}
