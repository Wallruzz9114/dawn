import { Body, Param, Query } from '@nestjs/common';
import { ValidationPipe } from '../pipes';

export const JoiParam = (schema: object) => Param(new ValidationPipe(schema));

export const JoiQuery = (schema: object) => Query(new ValidationPipe(schema));

export const JoiBody = (schema: object, options?: { method: string }) =>
  Body(new ValidationPipe(schema, options));
