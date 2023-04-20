import * as Joi from 'joi'
import {
  OfferBoxSizeEnum,
  OfferBoxSizeType,
  OfferProviderNameEnum,
  OfferProviderNameType,
  OfferWithoutId
} from '../interfaces'

export const createOfferSchema = Joi.object({
  name: Joi.string().max(255).required(),
  slug: Joi.string().max(255).required(),
  description: Joi.string().required(),
  requirements: Joi.string().required(),
  thumbnail: Joi.string().max(255).required(),
  boxSize: Joi.string()
    .optional()
    .allow(null)
    .valid(...Object.values(OfferBoxSizeEnum)),
  isDesktop: Joi.boolean().required(),
  isAndroid: Joi.boolean().required(),
  isIos: Joi.boolean().required(),
  offerUrlTemplate: Joi.string().max(255).required(),
  providerName: Joi.string().valid(...Object.values(OfferProviderNameEnum)),
  externalOfferId: Joi.string().max(255).required()
})

export class CreateOfferDto implements OfferWithoutId {
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
