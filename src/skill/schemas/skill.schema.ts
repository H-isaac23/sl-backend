import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Goal } from '../interfaces/goal.interface';

export type UserDocument = HydratedDocument<Skill>;

@Schema()
export class Skill {
  @Prop()
  skill_name: string;

  @Prop()
  skill_description: string | undefined;

  @Prop()
  goals: Array<Goal>;

  @Prop()
  total_skill_points: number;

  @Prop()
  skill_level: number;
}

export const UserSchema = SchemaFactory.createForClass(Skill);
