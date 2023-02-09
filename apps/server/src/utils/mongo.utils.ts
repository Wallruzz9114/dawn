import mongoose from 'mongoose';

export const getObjectId = (): string => {
  return new mongoose.Types.ObjectId().toString();
};
