export enum OfferProviderNameEnum {
  'offer1' = 'offer1',
  'offer2' = 'offer2'
}

export type OfferProviderNameType = keyof typeof OfferProviderNameEnum

export enum OfferBoxSizeEnum {
  'large' = 'large',
  'small' = 'small'
}

export type OfferBoxSizeType = keyof typeof OfferBoxSizeEnum
