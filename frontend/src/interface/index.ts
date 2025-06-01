export interface IProduct {
  documentId:string
  title: string;
  slug:string
  description: string;
  price: number;
  category:{
    title:string
  }
  thumbnail: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
}
