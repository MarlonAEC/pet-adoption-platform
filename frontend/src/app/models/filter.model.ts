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
};

export enum AvailableDetails {
    KIDS = 'Good with kids',
    CATS = 'Good with cats',
    DOGS = 'Good with dogs',
    HOUSE_TRAINED = 'House trained',
    DECLAWED = 'Declawed',
    SPECIAL_NEEDS = 'Special needs',
    SPAYED = 'Spayed',
    VACCINATED = 'Vaccinated',
    WORMED = 'Wormed',
    NEEDS_EXP_ADOPT = 'Needs experienced adopter',
    LIKES_FETCH = 'Likes to fetch',
}

export enum AvailableTemperamentFilters {
    HOW_CALMED = 'How calmed',
    HOW_SOCIAL = 'How social',
    ATTENTION_SEEKING = 'Attention seeking',
    AMOUNT_OF_EXERCISE = 'Amount of excercise',
    HOW_LOUD = 'How loud',
}

export type TemperamentFilter = {
    [key in AvailableTemperamentFilters]: number;
};

export interface CompletePetFilter {
    regularFilter: PetFilter;
    detailsFilter: {
        [key in AvailableDetails]: boolean;
    };
    temperamentFilter: TemperamentFilter;
}