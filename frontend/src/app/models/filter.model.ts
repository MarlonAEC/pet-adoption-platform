export interface PetFilter {
    breed: string;
    age: string;
    [key: string]: string;
};

export enum PetFilterName{
    BREED = 'breed',
    AGE = 'age',
    VALUE = 'value'
}