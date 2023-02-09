import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Joi from 'joi';
import mongoose, { Document } from 'mongoose';
import { getMongooseModule } from '../app/modules';
import { sha256 } from '../utils';

export type UserDocument = User & Document;

export const UserJoiSchema = {
  userName: Joi.string()
    .min(1)
    .max(30)
    .required()
    .error(new Error('Username must be between 1 and 30 characters!')),
  account: Joi.string()
    .min(6)
    .max(30)
    .required()
    .error(new Error('Account name must be between 6 and 30 characters!')),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .error(new Error('Password must be between 6 and 30 characters!')),
};

@Schema({
  timestamps: true,
  collection: User.name.toLocaleLowerCase(),
})
export class User {
  @Prop({
    enum: ['admin'],
    default: 'admin',
    required: true,
  })
  type: string;

  @Prop({
    maxlength: 200,
    trim: true,
  })
  avatar: string;

  @Prop({
    minlength: 1,
    maxlength: 100,
    trim: true,
  })
  userName: string;

  @Prop({
    maxlength: 100,
    trim: true,
  })
  email: string;

  @Prop({
    unique: true,
    minlength: 6,
    maxlength: 30,
    trim: true,
    lowercase: true,
    required: true,
  })
  account: string;

  @Prop({
    minlength: 6,
    maxlength: 40,
    set: sha256,
    trim: true,
    required: true,
    select: false,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
  createdAt: -1,
});

export const UserModelModule = getMongooseModule(User.name, UserSchema);

export const UserModel = mongoose.model(
  User.name,
  UserSchema,
  User.name.toLocaleLowerCase()
);
