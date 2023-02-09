import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { getMongooseModule } from '../app/modules';

export type ExploreDocument = Explore & Document;

@Schema({
  timestamps: true,
})
export class Explore {
  @Prop({ MaxLength: 500, default: '' })
  content: string;

  @Prop({
    type: [
      {
        title: mongoose.Schema.Types.String,
        link: mongoose.Schema.Types.String,
      },
    ],
  })
  links: string;

  @Prop({ type: [mongoose.Schema.Types.String] })
  pics: string;
}

export const ExploreSchema = SchemaFactory.createForClass(Explore);

export const ExploreModelModule = getMongooseModule(
  Explore.name,
  ExploreSchema
);
