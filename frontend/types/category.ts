export type CategoryType =  {
   id?: Number;
   name: String;
   createdAt?: Date;
   lasteModifiedAt?: Date;
   createdBy?: String;
}

export interface CategoryTypeTableProps {
   categoryTypes: CategoryType[];
   loadingCategoryType: boolean;
   errorCategoryType: string | null;
 }