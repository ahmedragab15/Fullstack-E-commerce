export interface IProduct {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  category: {
    title: string;
    documentId: string;
  };
  thumbnail: {
    documentId: string;
    formats: {
      thumbnail: {
        url: string;
        name: string;
      };
    };
  };
}

type TName = "title" | "description" | "price" | "thumbnail" | "category" | "stock";

export interface IProductInputs {
  label: string;
  name: TName;
  type: string;
  placeholder: string;
}