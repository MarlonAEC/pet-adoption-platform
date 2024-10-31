export interface PetFilter {
    breed: string | null;
    age: number | null;
    species: string | null;
    postalCode: string | null;
    value: number | null;
    [key: string]: string | number | null;
};

export enum PetFilterName{
    BREED = 'breed',
    AGE = 'age',
    VALUE = 'value',
    POSTAL_CODE = 'postalCode'
};

export enum AvailableDetails {
    KIDS = 'is_good_with_kids',
    CATS = 'is_good_with_cats',
    DOGS = 'is_good_with_dogs',
    HOUSE_TRAINED = 'is_house_trained',
    DECLAWED = 'is_declawed',
    SPAYED = 'is_spayed',
    VACCINATED = 'is_vaccinated',
    WORMED = 'is_wormed',
    NEEDS_EXP_ADOPT = 'needs_experienced_owner',
}

export enum MapAvailableDetails {
    is_good_with_kids = 'Good with kids',
    is_good_with_cats = 'Good with cats',
    is_good_with_dogs = 'Good with dogs',
    is_house_trained = 'House trained',
    is_declawed = 'Declawed',
    is_spayed = 'Spayed',
    is_vaccinated = 'Vaccinated',
    is_wormed = 'Wormed',
    needs_experienced_owner = 'Needs experienced adopter',
}

export enum AvailableTemperamentFilters {
    HOW_CALMED = 'temperament_how_calmed',
    HOW_SOCIAL = 'temperament_how_social',
    ATTENTION_SEEKING = 'temperament_how_attention_seeking',
    AMOUNT_OF_EXERCISE = 'temperament_how_active',
    HOW_LOUD = 'temperament_how_loud',
}

export type TemperamentFilter = {
    [key in AvailableTemperamentFilters]: number | null;
};

export type DetailsFilter = {
    [key in AvailableDetails]: boolean | null;
}
export interface CompletePetFilter {
    regularFilter: PetFilter;
    detailsFilter: DetailsFilter;
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
}