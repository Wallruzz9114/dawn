import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { getMongooseModule } from '../app/modules';
import joi from '../validations/joi';
import { User } from './user.model';

export const AdminLogjoiSchema = {
  type: joi.string().max(20),
  data: joi.string().max(200),
  user: joi.objectId(),
};

export type AdminLogDocument = AdminLog & Document;

@Schema({
  timestamps: true,
})
export class AdminLog {
  @Prop({ trim: true, required: true })
  type: string;

  @Prop({ trim: true, default: '' })
  data: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;
}

export const AdminLogSchema = SchemaFactory.createForClass(AdminLog);

export const AdminLogModelModule = getMongooseModule(
  AdminLog.name,
  AdminLogSchema
);

export const AdminLogModel = mongoose.model(
  AdminLog.name,
  AdminLogSchema,
  AdminLog.name.toLocaleLowerCase()
);
