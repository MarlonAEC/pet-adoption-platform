export interface PetFilter {
    breed: string;
    age: string;
    postalCode: string;
    [key: string]: string;
};

export enum PetFilterName{
    BREED = 'breed',
    AGE = 'age',
    VALUE = 'value',
    POSTAL_CODE = 'postalCode'
}