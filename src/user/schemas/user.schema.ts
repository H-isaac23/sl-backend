import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  hashed_password: string;

  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);