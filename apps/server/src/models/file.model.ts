import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { getMongooseModule } from '../app/modules';
import joi from '../validations/joi';

export enum FileType {
  image = 'image',
  video = 'video',
  audio = 'audio',
  document = 'document',
  other = 'other',
}

export const FileJoiSchema = {
  name: joi.string().min(1).max(80),
  type: joi.string(),
  size: joi.number(),
  url: joi.string().max(2000),
};

export type FileDocument = File & Document;

@Schema({
  timestamps: true,
  collection: File.name.toLocaleLowerCase(),
})
export class File {
  @Prop({
    maxlength: 80,
    trim: true,
    required: true,
  })
  name: string;

  @Prop({
    enum: ['image', 'video', 'audio', 'document', 'other'],
    trim: true,
    required: true,
  })
  type: string;

  @Prop({
    type: Number,
    required: true,
  })
  size: number;

  @Prop({
    trim: true,
    required: true,
  })
  url: string;
}

export const FileSchema = SchemaFactory.createForClass(File);

export const FileModelModule = getMongooseModule(File.name, FileSchema);

export const FileModel = mongoose.model(
  File.name,
  FileSchema,
  File.name.toLocaleLowerCase()
);
