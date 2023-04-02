import {StockDTO} from "./StockDTO";
import {ProductHasImageDTO} from "./ProductHasImageDTO";
import {BrandsDTO} from "./BrandsDTO";
import {CategoryDTO} from "./CategoryDTO";

export class ProductDTO{
  id:number;
  productName:string;
  description:string;
  rating:number;
  price:number;
  status:number;
  categoryDTO:CategoryDTO;
  brandsDTO:BrandsDTO;
  stock:StockDTO;
  productHasImageDTOS:ProductHasImageDTO[];

  constructor(id: number, productName: string, description: string, rating: number, price: number, status: number, categoryDTO: CategoryDTO, brandsDTO: BrandsDTO, stock: StockDTO, productHasImageDTOS: ProductHasImageDTO[]) {
    this.id = id;
    this.productName = productName;
    this.description = description;
    this.rating = rating;
    this.price = price;
    this.status = status;
    this.categoryDTO = categoryDTO;
    this.brandsDTO = brandsDTO;
    this.stock = stock;
    this.productHasImageDTOS = productHasImageDTOS;
  }
}
