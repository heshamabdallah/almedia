import { slugify } from '~/utils'
import { payload } from '~/payloads/offer2.payload'
import { IProvider, OfferProviderNameEnum } from '../interfaces'
import { ProviderBase } from './ProviderBase'

export class Offer2Provider extends ProviderBase implements IProvider {
  async fetchOffers(): Promise<void> {
    // TODO: call API to fetch offers
    const offers = payload.data

    const normalizedOffers = Object.values(offers).map(
      ({ Offer: offer, ...raw }) => ({
        name: offer.name,
        slug: slugify(offer.name),
        description: offer.description,
        requirements: offer.instructions,
        thumbnail: offer.icon,
        // TODO: we need to know how to determine this box size value
        boxSize: null,
        isDesktop: raw.OS.web,
        isAndroid: raw.OS.android,
        isIos: raw.OS.ios,
        offerUrlTemplate: offer.tracking_url,
        providerName: OfferProviderNameEnum.offer2,
        externalOfferId: String(offer.campaign_id)
      })
    )

    await this.seedDatabaseWithOffers(normalizedOffers)
  }
}
