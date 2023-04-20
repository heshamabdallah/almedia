import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'
import {
  IOffer,
  OfferBoxSizeEnum,
  OfferBoxSizeType,
  OfferProviderNameEnum,
  OfferProviderNameType
} from '../interfaces'

@Entity('offers')
// Add unique key to make sure we don't have duplicatd offers
@Unique(['externalOfferId', 'providerName'])
export class Offer implements IOffer {
  // primary column for offer id
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true
  })
  id: number

  // offer name
  // We might need to use `text` column type for offer name instead
  // of `varchar(255)` if we have offer names more than 255 chars
  // it really depends of the providers we use
  @Column({ type: 'varchar', length: 255 })
  name: string

  // unique identifier for offer
  // Slug usually comes from the name, we need to sanitize the name
  // and remove any special chars and separate words with `-` or `_`
  // we also need to make sure slug is not exist in th database for the
  // offer name, we might append numbers after the name like `${name}-1` or `${name}-2`
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string

  // offer description
  @Column({ type: 'text' })
  description: string

  // offer requirements
  @Column({ type: 'text' })
  requirements: string

  // offer thumbnail image url
  // We might need to use `text` column type for offer thumbnail instead
  // of `varchar(255)` if we have offer thumbnails more than 255 chars
  // it really depends of the providers we use
  @Column({ type: 'varchar', length: 255 })
  thumbnail: string

  // size of offer thumbnail image - large, small
  @Column({
    type: 'enum',
    enum: OfferBoxSizeEnum,
    name: 'box_size',
    nullable: true
  })
  boxSize: OfferBoxSizeType | null

  // indicates if offer is available for desktop
  @Column({ default: false, name: 'is_desktop', type: 'tinyint', width: 1 })
  isDesktop: boolean

  // indicates if offer is available for android
  @Column({ default: false, name: 'is_android', type: 'tinyint', width: 1 })
  isAndroid: boolean

  // indicates if offer is available for ios
  @Column({ default: false, name: 'is_ios', type: 'tinyint', width: 1 })
  isIos: boolean

  // offer url template
  @Column({ type: 'varchar', length: 255, name: 'offer_url_template' })
  offerUrlTemplate: string

  // provider name - this should be static for each offer type
  // we're attaching two offer payloads - offer1, offer2
  // so for offer1 payload, this should be "offer1"
  // for offer2 payload, this should be "offer2"
  @Column({ type: 'enum', enum: OfferProviderNameEnum, name: 'provider_name' })
  providerName: OfferProviderNameType

  // offer id from external provider
  @Column({
    type: 'varchar',
    length: 255,
    name: 'external_offer_id'
  })
  externalOfferId: string
}
