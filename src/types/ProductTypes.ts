import { Document } from "mongodb";

export enum IProductGender {
    male = 'male',
    female = 'female',
    unisex = 'unisex'
}

export enum IProductType {
    fragrance = 'fragrance',
    bath = 'bath',
    skincare = 'skincare',
    makeup = 'makeup'
}

export interface IProductDetails extends Document {
    productName: string;
    productBrand: string;
    productSizeAvailable: string;
    productDiscountPrice: string;
    productRetailPrice: string;
    productLink: string;
    productImage: string;
    productGender: IProductGender;
    productType: IProductType;
}

export interface IProduct extends Document {
    uniqueId: string;
    productSource: string;
    productSourceUrl: string;
    productDetails: IProductDetails;
}

export interface IProductBrandCount {
    productBrand: string;
    count: number;
}

export interface IProductSourceCount {
    productSource: string;
    count: number;
}

export interface IProductResponse {
    products: IProduct[];
    totalCount: number;
    brandCounts: IProductBrandCount[];
    sourceCounts: IProductSourceCount[];
}
