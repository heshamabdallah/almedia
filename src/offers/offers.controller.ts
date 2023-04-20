import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UsePipes
} from '@nestjs/common'
import { OffersService } from './offers.service'
import { CreateOfferDto, createOfferSchema } from './dto/create-offer.dto'
import { JoiValidationPipe } from '~/utils'

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createOfferSchema))
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto)
  }

  @Get()
  findAll() {
    return this.offersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.offersService.findOne(id)
  }
}
