export interface IResponse {
  type: string;
  message: string;
}

export interface IToken {
  payload: {
    sub: number;
    iat: Date;
    exp: Date;
    type: string;
  };
  secret: string;
}

export interface IUser {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'seller';
  shops?: IShop[] | string[] | [];
  isEmailVerified: boolean;
  passwordChangedAt?: string;
  dateJoined: string;
  address?: string;
  phone?: string;
  dateOfBirth?: string;
  avgShopRating?: number;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  profileImage: string;
  profileImageId: String;
  defaultShop: IShop | string;
  preferredCategories: string[];
}

export interface IShop {
  _id: string;
  id: string;
  name: string;
  address: string;
  phone: number;
  slug?: string;
  shopImage: string;
  shopImageId: string;
  description: string;
  owner: IUser;
  dateCreated: Date;
  productsQuantity: number;
  totalUnitsSold: number;
  totalSales: number;
}

export interface IProduct {
  id: string;
  _id: string;
  name: string;
  slug?: string;
  price: number;
  mainImage: string;
  mainImageId: string;
  images: string[];
  imagesIds: string[];
  description: string;
  category: ICategory | string;
  shop: IShop | string;
  shopOnwer: IUser | string;
  quantityInStock: number;
  quantitySold: number;
}

export interface ICategory {
  _id: string;
  id: string;
  name: string;
  description: string;
  image: string;
  imageId: string;
}

export interface IReview {
  id: string;
  _id: string;
  product: IProduct | string;
  shop: IShop | string;
  user: IUser | string;
  reviewText: string;
  rating: number;
}

export interface ICart {
  id: string;
  _id: string;
  email: string;
  items: ICartItem[];
  totalPrice: number;
  totalQuantity: number;
}

interface ICartItem {
  id: string;
  _id: string;
  product: IProduct | string;
  totalProductQuantity: number;
  totalProductPrice: number;
  shop: IShop | string;
  shopOnwer: IUser | string;
  category: ICategory | string;
}

export interface IOrder {
  id: string;
  _id: string;
  products: IProduct[] | string[];
  user: IUser | string;
  totalPrice: number;
  totalQuantity: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  shippingAddress: {
    address: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentIntent?: string;
  shippingPrice: number;
  phone: string;
  status?: string;
  dateOfPurchase?: Date;
  yearOfPurchase?: number;
}
