import { ProductForm } from "./product";

export type UserType = {
    id?: number;
    firstName: string;
    lastName: string;
    nationality: string;
    mobile: string;
    email: string;
    password: string;
    role?: string;
}
export type LoginUser = {
    email: string;
    password: string;
    rememberMe?: string;
}
export type UserContext = {
    currentUser?: UserType | null;
    isSubmitting: boolean;
    setCurrentUser: (user: UserType) => void;
    login: (values: LoginUser) => void;
    logout: () => void;
}

export type UserRegisterStoreContext = {
    storeUser: (userValues: UserType) => void,
    setUserRegisterVal: (storeUser: UserType) => void,
    userRegisterVal: UserType | null,
    
}

export enum InteractionType {
    LIKED ,
    PURCHASED
}
export type UserInteraction = {
    id: number;
    user: UserType,
    product: ProductForm,
    interactionType: InteractionType,
    interactionDate: Date,
}