export interface Moments {

  id?: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  comments?: [{username: string, text: string}];

}
