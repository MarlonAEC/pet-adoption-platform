export interface Pet {
    id: number;
    name: string;
    breed: string;
    species: string;
    age: number;
    description: string;
    adopted: boolean;
    createdAt: string;
    updatedAt: string;
    address: string;
    images: string[];
    weight: number;
    color: string;
    sex: string;
    background: string;
    health: string;
    value: number;
    temperament_how_calmed: number;
    temperament_how_social: number;
    temperament_how_attention_seeking: number;
    temperament_how_active: number;
    temperament_how_loud: number;
    needs_experienced_owner: boolean;
    postal_code: string;
    _house_trained: boolean;
    _declawed: boolean;
    _good_with_kids: boolean;
    _good_with_dogs: boolean;
    _good_with_cats: boolean;
    _spayed: boolean;
    _vaccinated: boolean;
    _wormed: boolean;
    favourite_things: string[];
    requirements_for_new_home: string[];
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PetResponse {
    content: Pet[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
}
