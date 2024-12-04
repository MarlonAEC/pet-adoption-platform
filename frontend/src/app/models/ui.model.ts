import { FormControl } from "@angular/forms";
import { PetFilterName } from "./filter.model";

export interface SelectOption {
  label: string;
  value: string | number;
}

export const enum FilterType {
    SELECT = 'select',
    RANGE ='range',
    SCALE = 'scale',
    INPUT = 'input',
}

export interface BaseFilterMenu {
    type: FilterType;
    label: string;
    name: PetFilterName;
    control: FormControl;
}

export interface SelectFilterMenu extends BaseFilterMenu {
    type: FilterType.SELECT;
    options: SelectOption[];
}

export interface RangeFilterMenu extends BaseFilterMenu {
    type: FilterType.RANGE;
    min: number;
    max: number;
}

export interface ScaleFilterMenu extends BaseFilterMenu {
    type: FilterType.SCALE;
    scale: number;
}

export interface InputFilterMenu extends BaseFilterMenu {
    type: FilterType.INPUT;
}

export type FilterMenu = SelectFilterMenu | RangeFilterMenu | ScaleFilterMenu | InputFilterMenu;

export enum IconType {
    PET = 'pet',
    USER = 'user',
    APPLICATION = 'application',
    DEFAULT= 'default',
}