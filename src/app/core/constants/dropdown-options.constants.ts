import { Dropdown } from "../../shared/models/dropdown.model";

export const ETHNICITY: Dropdown[] = [
    { id: 1, title: 'IP Household', value: 'IP Household' },
    { id: 2, title: 'Non-IP Household', value: 'Non-IP Household' }
];

export const SOCIOECONOMIC_STATUS: Dropdown[] = [
    { id: 1, title: 'NHTS 4Ps', value: 'NHTS 4Ps' },
    { id: 2, title: 'NHTS Non-4Ps', value: 'NHTS Non-4Ps' },
    { id: 3, title: 'Non-NHTS', value: 'Non-NHTS' }
];

export const TYPE_OF_WATER_SOURCE: Dropdown[] = [
    { id: 1, title: 'Level I - Point Source', value: 'Level I - Point Source' },
    { id: 2, title: 'Level II - Communal Faucet', value: 'Level II - Communal Faucet' },
    { id: 3, title: 'Level III - Individual Connection', value: 'Level III - Individual Connection' },
    { id: 4, title: 'Others', value: 'Others' }
];

export const TYPE_OF_TOILET_FACILITY: Dropdown[] = [
    { id: 1, title: 'A - Pour/Flush type connected to septic tank', value: 'A' },
    { id: 2, title: 'B - Pour/Flush toilet connected to septic tank AND sewerage system', value: 'B' },
    { id: 3, title: 'C - Ventilated Pit (VIP) latrine', value: 'C' },
    { id: 4, title: 'D - Water-sealed toilet', value: 'D' },
    { id: 5, title: 'E - Overhung latrine', value: 'E' },
    { id: 6, title: 'F - Open pit latrine', value: 'F' },
    { id: 7, title: 'G - Without toilet', value: 'G' }
];

export const RELATIONSHIP_TO_HEAD_OF_HOUSEHOLD: Dropdown[] = [
    { id: 1, title: '1 - Head', value: '1' },
    { id: 2, title: '2 - Spouse', value: '2' },
    { id: 3, title: '3 - Son', value: '3' },
    { id: 4, title: '4 - Daughter', value: '4' },
    { id: 5, title: '5 - Others', value: '5' }
];

export const GENDER: Dropdown[] = [
    { id: 1, title: 'Male', value: 'Male' },
    { id: 2, title: 'Female', value: 'Female' }
];

export const CIVIL_STATUS: Dropdown[] = [
    { id: 1, title: 'S - Single', value: 'S' },
    { id: 2, title: 'M - Married', value: 'M' },
    { id: 3, title: 'W - Widow/er', value: 'W' },
    { id: 4, title: 'SP - Separated', value: 'SP' },
    { id: 5, title: 'C - Cohabilitation', value: 'C' }
];

export const MEMBER_TYPE: Dropdown[] = [
    { id: 1, title: 'M - Member', value: 'M' },
    { id: 2, title: 'D - Dependent', value: 'D' }
];

export const PHILHEALTH_CATEGORY: Dropdown[] = [
    { id: 1, title: 'FEP - Formal Economy Private', value: 'FEP' },
    { id: 2, title: 'FEG - Formal Economy Government', value: 'FEG' },
    { id: 3, title: 'IE - Informal Economy', value: 'IE' },
    { id: 4, title: 'N - NHTS', value: 'N' },
    { id: 5, title: 'SC - Senior Citizen', value: 'SC' },
    { id: 6, title: 'IP - Indigenous People', value: 'IP' },
    { id: 7, title: 'U - Unknown', value: 'U' }
];

