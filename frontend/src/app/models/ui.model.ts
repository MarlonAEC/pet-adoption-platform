import { PetFilterName } from "./filter.model";

export interface Option {
  label: string;
  value: string;
}

export const enum FilterType {
    SELECT = 'select',
    RANGE ='range',
    SCALE = 'scale'
}

export interface BaseFilterMenu {
    type: FilterType;
    label: string;
    name: PetFilterName;
}

export interface SelectFilterMenu extends BaseFilterMenu {
    type: FilterType.SELECT;
    options: Option[];
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

export type FilterMenu = SelectFilterMenu | RangeFilterMenu | ScaleFilterMenu;