export type Item = {
  item_id: number;
  name: string;
  price: number;
  stock_count: number;
};
export type ItemResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[];
};
export type ItemDetail = {
  item_id: number;
  name: string;
  price: number;
  stock_count: number;
  description: string;
};
export type ItemQNA = {
  id: number;
  question: Question;
  answer: string;
  dated_created: string;
};
export type Question = {
  id: number;
  user: string;
  title: string;
  content: string;
  date_created: string;
  item: number;
};
export type LoginInfo = {
  username: string;
  password: string;
};
export const LoginInit: LoginInfo = {
  username: '',
  password: '',
};
export type SignupInfo = {
  username: string;
  password: string;
  passwordConfirm: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
};
export const SignupInit: SignupInfo = {
  username: '',
  password: '',
  passwordConfirm: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  address: '',
};
export type CartInfo = {
  id: number;
  amount: number;
  date_created: string;
  is_available_now: boolean;
  item: ItemDetail;
  total_price: number;
  user: string;
};
