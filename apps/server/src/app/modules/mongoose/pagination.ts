import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type IPaginate = {
  paginate: (
    query: any,
    field: any,
    options: {
      page?: number;
      limit?: number;
      sort?: object;
      populate?: { path: string | any; select?: string | any }[];
    }
  ) => { items: any[]; totalCount: number };
};

export const paginate = (schema: mongoose.Schema): void => {
  async function _paginate(
    query: any,
    field: any,
    options: {
      page: number;
      limit: number;
      sort: object;
      populate: { path: string | any; select?: string | any }[];
    }
  ) {
    const { page, limit, sort } = options;
    let $FD = this.find(query, field, {
      skip: (page - 1) * limit,
      limit: limit,
      sort: sort,
    });
    if (Array.isArray(options.populate)) {
      options.populate.map((item) => {
        $FD = $FD.populate(item.path, item.select);
      });
    }
    const [items, totalCount] = await Promise.all([
      $FD,
      this.countDocuments(query),
    ]);
    return { items, totalCount } as { items: any[]; totalCount: number };
  }
  schema.statics.paginate = _paginate;
};

export const getMongooseModule = (
  name: string,
  schema: mongoose.Schema<any>
): DynamicModule =>
  MongooseModule.forFeatureAsync([
    {
      name,
      useFactory: () => {
        schema.plugin(paginate);
        return schema;
      },
    },
  ]);
