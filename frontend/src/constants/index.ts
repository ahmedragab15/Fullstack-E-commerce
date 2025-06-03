import type { IProductInputs } from "@/interface";

export const productInputs: IProductInputs[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Product Title",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    placeholder: "Product Description",
  },
  {
    label: "Category",
    name: "category",
    type: "text",
    placeholder: "Product Category",
  },
  {
    label: "Thumbnail",
    name: "thumbnail",
    type: "file",
    placeholder: "Product thumbnail",
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    placeholder: "Product Price",
  },
  {
    label: "Stock",
    name: "stock",
    type: "number",
    placeholder: "Stock",
  },
];
