import { Repository } from 'typeorm'
import { JoiValidationPipe } from '~/utils'
import { Offer } from '../entities/offer.entity'
import { OfferWithoutId } from '../interfaces'
import { createOfferSchema } from '../dto/create-offer.dto'
import { Logger } from '@nestjs/common'

export abstract class ProviderBase {
  constructor(private offersRepository: Repository<Offer>) {}

  private readonly logger = new Logger('OffersProvider')

  async seedDatabaseWithOffers(offers: OfferWithoutId[]) {
    const validOffers = offers.filter((offer) => {
      const validator = new JoiValidationPipe(createOfferSchema)

      try {
        validator.transform(offer)

        return true
      } catch (error) {
        this.logger.error({
          offer,
          error: error.getResponse().message
        })
      }

      return false
    })

    await this.offersRepository.upsert(validOffers, {
      skipUpdateIfNoValuesChanged: true,
      conflictPaths: ['providerName', 'externalOfferId'],
      upsertType: 'on-conflict-do-update'
    })
  }
}
