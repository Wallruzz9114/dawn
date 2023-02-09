import Joi from 'joi';
import { isEmpty } from 'lodash';
import joi from '../joi';

export const ObjectIdSchema = {
  id: joi.objectId(),
};

export const generateObjectIdSchema = (
  field: string
): {
  [x: string]: Joi.StringSchema<string>;
} => {
  if (isEmpty(field)) {
    throw new Error('generate object id schema, field can not empty');
  }
  return {
    [field]: joi.objectId(),
  };
};

export const generateObjectIdsSchema = (
  field: string
): {
  [x: string]: Joi.ArraySchema<any[]>;
} => {
  if (isEmpty(field)) {
    throw new Error('generate object id schema, field can not empty');
  }
  return {
    [field]: Joi.array().items(joi.objectId().required()),
  };
};
