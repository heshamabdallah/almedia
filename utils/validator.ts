import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { ObjectSchema } from 'joi'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform<T>(value: T) {
    const { error } = this.schema.validate(value)

    if (error) {
      throw new BadRequestException(error.details)
    }

    return value
  }
}
