import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import Joi, { Schema } from 'joi';
import { isEmpty } from 'lodash';

interface IOptions {
  method?: string;
}

@Injectable()
export class ValidationPipe implements PipeTransform {
  public constructor(
    private readonly schema: object,
    private readonly options: IOptions = {}
  ) {}

  public transform = (data: any) => {
    let joiObject: Schema = Joi.object(this.schema);

    if (!isEmpty(this.options.method)) {
      joiObject = joiObject.tailor(this.options.method);
    }

    const { error, value } = joiObject.validate(data, { allowUnknown: false });
    if (error) {
      throw new BadRequestException('Validation failed: ' + error);
    }
    return value;
  };
}
