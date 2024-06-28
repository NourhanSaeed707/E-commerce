import { Gender } from './gender';
import { Category, CategoryType } from "./category";
import { Size } from './size';
import { Color } from './color';

export type Product = {
    id?: Number,
    name: string,
    createdAt?: Date,
    lastModifiedAt?: Date,
    createdBy?: string,
    codeNumber: string,
    price: Number,
    stock: Number,
    gender: Gender,
    category?: Category,
    categoryType: CategoryType,
    size: Size,
    color: Color
}