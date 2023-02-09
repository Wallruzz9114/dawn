import { Inject } from '@nestjs/common';

const DB_MODEL_TOKEN_SUFFIX = 'db_model_token';

export const getModelToken = (modelName: string): string => {
  return modelName + DB_MODEL_TOKEN_SUFFIX;
};

export const getProviderByModel = (model: { modelName: string }) => {
  return {
    provide: model.modelName + DB_MODEL_TOKEN_SUFFIX,
    useValue: model,
  };
};

export const InjectModel = (model: { modelName: string }) => {
  return Inject(getModelToken(model.modelName));
};
