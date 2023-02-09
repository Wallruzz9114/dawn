import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { getMongooseModule } from '../app/modules';
import joi from '../validations/joi';
import { Article } from './article.model';

export const CommentJoiSchema = {
  nickName: joi
    .string()
    .min(1)
    .max(80)
    .alter({
      post: (schema) => schema.required(),
    }),
  email: joi
    .string()
    .email()
    .alter({
      post: (schema) => schema.required(),
    }),
  content: joi
    .string()
    .min(1)
    .max(500)
    .alter({
      post: (schema) => schema.required(),
    }),
  parentId: [joi.equal(null), joi.objectId()],
  reply: [joi.equal(null), joi.objectId()],
  article: joi.objectId().alter({
    post: (schema) => schema.required(),
  }),
  identity: joi.number().min(0).max(4),
  website: joi.string().allow(''),
};

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
  collection: Comment.name.toLocaleLowerCase(),
})
export class Comment {
  @Prop({ maxlength: 80, trim: true, required: true })
  nickName: string;

  @Prop({ maxlength: 80, trim: true, required: true })
  email: string;

  @Prop({ maxlength: 80, trim: true, default: '' })
  website: string;

  @Prop({ maxlength: 500, trim: true, required: true })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Comment.name,
    default: null,
  })
  parentId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Comment.name,
    default: null,
  })
  reply: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Article.name,
    equired: true,
  })
  article: string;

  @Prop({ maxlength: 80, trim: true, default: '' })
  location: string;

  @Prop({ default: true })
  pass: boolean;

  // Admin is 1, Regular is 0
  @Prop({ max: 4, default: 0 })
  identity: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export const CommentModelModule = getMongooseModule(
  Comment.name,
  CommentSchema
);

export const CommentModel = mongoose.model(
  Comment.name,
  CommentSchema,
  Comment.name.toLocaleLowerCase()
);
