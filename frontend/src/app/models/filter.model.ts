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

export interface DatabasePetFilter {
    species: string | null;
    breed: string | null;
    age: number | null;
    value: number | null;
    temperament_how_calmed: number | null;
    temperament_how_social: number | null;
    temperament_how_attention_seeking: number | null;
    temperament_how_active: number | null;
    temperament_how_loud: number | null;
    is_vaccinated: boolean | null,
    is_spayed: boolean | null,
    is_house_trained: boolean | null,
    is_wormed: boolean | null,
    is_good_with_kids: boolean | null,
    is_good_with_dogs: boolean | null,
    is_good_with_cats: boolean | null,
    is_declawed: boolean | null,
    needs_experienced_owner: boolean | null,
    postal_code: string | null,
    address: string | null,
}