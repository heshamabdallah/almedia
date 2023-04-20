import { slugify } from '~/utils'
import { payload } from '~/payloads/offer1.payload'
import { IProvider, OfferProviderNameEnum } from '../interfaces'
import { ProviderBase } from './ProviderBase'

export class Offer1Provider extends ProviderBase implements IProvider {
  async fetchOffers(): Promise<void> {
    // TODO: call API to fetch offers
    const offers = payload.response.offers

    const normalizedOffers = Object.values(offers).map((offer) => ({
      name: offer.offer_name,
      slug: slugify(offer.offer_name),
      description: offer.offer_desc,
      requirements: offer.call_to_action,
      thumbnail: offer.image_url,
      // TODO: we need to know how to determine this box size value
      boxSize: null,
      isDesktop: offer.platform === 'desktop',
      // This is only a guess, we need to get the possible device values from
      // the offer provider in order to handle this properly
      isAndroid:
        offer.platform === 'mobile' && offer.device.startsWith('android_'),
      isIos: offer.platform === 'mobile' && offer.device.startsWith('iphone_'),
      offerUrlTemplate: offer.offer_url,
      providerName: OfferProviderNameEnum.offer1,
      externalOfferId: offer.offer_id
    }))

    await this.seedDatabaseWithOffers(normalizedOffers)
  }
}
