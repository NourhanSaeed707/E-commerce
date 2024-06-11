export type IRegisterForm  = {
    firstName: string;
    lastName: string;
    nationality: {
        value: string,
        label: string,
        flag: string
    };
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export type IRegisterModel = {
    firstName: string;
    lastName: string;
    nationality: string;
    email: string;
    phone: string;
    password: string;
  
}

export type IVerifyCodeModel = {
    email: string
    code: string;
}