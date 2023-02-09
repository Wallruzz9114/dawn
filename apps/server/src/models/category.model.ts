import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { getMongooseModule } from '../app/modules';
import joi from '../validations/joi';

export const CategoryJoiSchema = {
  name: joi
    .string()
    .min(1)
    .max(80)
    .alter({
      post: (schema) => schema.required(),
    }),
};

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  collection: Category.name.toLocaleLowerCase(),
})
export class Category {
  @Prop({
    maxlength: 80,
    trim: true,
    required: true,
  })
  name: string;

  @Prop({
    max: 200,
    default: 0,
  })
  order: number;

  @Prop({
    default: 0,
  })
  articleCount: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export const CategoryModelModule = getMongooseModule(
  Category.name,
  CategorySchema
);

export const CategoryModel = mongoose.model(
  Category.name,
  CategorySchema,
  Category.name.toLocaleLowerCase()
);
