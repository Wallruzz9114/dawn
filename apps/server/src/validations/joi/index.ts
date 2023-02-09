import Joi, { StringSchema } from 'joi';
import mongoose from 'mongoose';

interface IRoot extends Joi.Root {
  objectId(): StringSchema;
}

export default Joi.extend((joi) => {
  return {
    type: 'objectId',
    base: joi.string(),
    messages: {
      objectId: 'needs to be a valid ObjectId',
    },
    coerce(value) {
      if (!value) {
        return;
      }
      return { value, errors: null };
    },
    validate(value, helpers) {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        const errors = helpers.error('objectId');
        return { value, errors };
      }
    },
  };
}) as IRoot;
