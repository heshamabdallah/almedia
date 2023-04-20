import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Offer } from './entities/offer.entity'
import { CreateOfferDto } from './dto/create-offer.dto'
import { Cron } from '@nestjs/schedule'
import { Offer1Provider } from './providers/Offer1Provider'
import { Offer2Provider } from './providers/Offer2Provider'

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>
  ) {}

  private readonly logger = new Logger(OffersService.name)

  create(createOfferDto: CreateOfferDto) {
    return this.offersRepository.create(createOfferDto)
  }

  findAll() {
    return this.offersRepository.find()
  }

  findOne(id: number) {
    return this.offersRepository.findOne({
      where: { id }
    })
  }

  // This could be scheduled whenever we want
  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
  //   name: 'offers'
  // })
  @Cron(new Date(Date.now() + 1 * 1000), {
    name: 'offers'
  })
  async fetchOffersFromProviders() {
    this.logger.debug('Fetch offers from providers and seed database')

    const providers = [Offer1Provider, Offer2Provider]

    await Promise.allSettled(
      providers.map((provider) =>
        // If the fetch process is heavy we might queue every provider separately
        new provider(this.offersRepository).fetchOffers()
      )
    )

    this.logger.debug('Database has been seeded with providers offers')
  }
}
