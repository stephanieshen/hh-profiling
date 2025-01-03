import { Dropdown } from "../../shared/models/dropdown.model";
import { CivilStatus, Ethnicity, Gender, MemberType, PhilhealthCategory, RelationshipToHeadOfHousehold, SocioeconomicStatus, TypeOfToiletFacility, TypeOfWaterSource } from "../enums/dropdown-options.enum";

export const ETHNICITY: Dropdown[] = [
    { id: Ethnicity.IP_HOUSEHOLD, title: 'IP Household' },
    { id: Ethnicity.NON_IP_HOUSEHOLD, title: 'Non-IP Household' }
];
  
export const SOCIOECONOMIC_STATUS: Dropdown[] = [
    { id: SocioeconomicStatus.NHTS_4PS, title: 'NHTS 4Ps' },
    { id: SocioeconomicStatus.NHTS_NON_4PS, title: 'NHTS Non-4Ps' },
    { id: SocioeconomicStatus.NON_NHTS, title: 'Non-NHTS' }
];
  
export const TYPE_OF_WATER_SOURCE: Dropdown[] = [
    { id: TypeOfWaterSource.LEVEL_I, title: 'Level I - Point Source' },
    { id: TypeOfWaterSource.LEVEL_II, title: 'Level II - Communal Faucet' },
    { id: TypeOfWaterSource.LEVEL_III, title: 'Level III - Individual Connection' },
    { id: TypeOfWaterSource.OTHERS, title: 'Others' }
];
  
export const TYPE_OF_TOILET_FACILITY: Dropdown[] = [
    { id: TypeOfToiletFacility.A, title: 'A - Pour/Flush type connected to septic tank' },
    { id: TypeOfToiletFacility.B, title: 'B - Pour/Flush toilet connected to septic tank AND sewerage system' },
    { id: TypeOfToiletFacility.C, title: 'C - Ventilated Pit (VIP) latrine' },
    { id: TypeOfToiletFacility.D, title: 'D - Water-sealed toilet' },
    { id: TypeOfToiletFacility.E, title: 'E - Overhung latrine' },
    { id: TypeOfToiletFacility.F, title: 'F - Open pit latrine' },
    { id: TypeOfToiletFacility.G, title: 'G - Without toilet' }
];
  
export const RELATIONSHIP_TO_HEAD_OF_HOUSEHOLD: Dropdown[] = [
    { id: RelationshipToHeadOfHousehold.HEAD, title: '1 - Head' },
    { id: RelationshipToHeadOfHousehold.SPOUSE, title: '2 - Spouse' },
    { id: RelationshipToHeadOfHousehold.SON, title: '3 - Son' },
    { id: RelationshipToHeadOfHousehold.DAUGHTER, title: '4 - Daughter' },
    { id: RelationshipToHeadOfHousehold.OTHERS, title: '5 - Others' }
];
  
export const GENDER: Dropdown[] = [
    { id: Gender.MALE, title: 'Male' },
    { id: Gender.FEMALE, title: 'Female' }
];
  
export const CIVIL_STATUS: Dropdown[] = [
    { id: CivilStatus.SINGLE, title: 'S - Single' },
    { id: CivilStatus.MARRIED, title: 'M - Married' },
    { id: CivilStatus.WIDOW, title: 'W - Widow/er' },
    { id: CivilStatus.SEPARATED, title: 'SP - Separated' },
    { id: CivilStatus.COHABITATION, title: 'C - Cohabilitation' }
];
  
export const MEMBER_TYPE: Dropdown[] = [
    { id: MemberType.MEMBER, title: 'M - Member' },
    { id: MemberType.DEPENDENT, title: 'D - Dependent' }
];
  
export const PHILHEALTH_CATEGORY: Dropdown[] = [
    { id: PhilhealthCategory.FEP, title: 'FEP - Formal Economy Private' },
    { id: PhilhealthCategory.FEG, title: 'FEG - Formal Economy Government' },
    { id: PhilhealthCategory.IE, title: 'IE - Informal Economy' },
    { id: PhilhealthCategory.NHTS, title: 'N - NHTS' },
    { id: PhilhealthCategory.SC, title: 'SC - Senior Citizen' },
    { id: PhilhealthCategory.IP, title: 'IP - Indigenous People' },
    { id: PhilhealthCategory.UNKNOWN, title: 'U - Unknown' }
];
