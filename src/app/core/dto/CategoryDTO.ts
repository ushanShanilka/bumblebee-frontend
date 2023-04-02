export class CategoryDTO{
  categoryId:number;
  categoryName:string;
  status:number;

  constructor(categoryId: number, categoryName: string, status: number) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.status = status;
  }
}
