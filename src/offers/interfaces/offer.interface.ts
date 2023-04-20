import { OfferBoxSizeType, OfferProviderNameType } from './enum'

export interface IOffer {
  id: number
  name: string
  slug: string
  description: string
  requirements: string
  thumbnail: string
  boxSize: OfferBoxSizeType | null
  isDesktop: boolean
  isAndroid: boolean
  isIos: boolean
  offerUrlTemplate: string
  providerName: OfferProviderNameType
  externalOfferId: string
}

export type OfferWithoutId = Omit<IOffer, 'id'>
