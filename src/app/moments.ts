export interface Moments {

  id?: number;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  commets?: [{username: string, text: string}];

}
