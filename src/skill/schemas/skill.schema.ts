import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Goal } from '../interfaces/goal.interface';
import { SkillCategory } from 'src/skill-category/schemas/skill-category.schema';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<Skill>;

@Schema()
export class Skill {
  @Prop({ unique: true, required: true })
  skill_name: string;

  @Prop({ unique: true, required: true })
  skill_description: string | undefined;

  @Prop()
  goals: Array<Goal>;

  @Prop()
  total_skill_points: number;

  @Prop()
  skill_level: number;

  @Prop()
  atrophy_points: number;

  @Prop()
  last_updated: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SkillCategory' })
  skill_category: SkillCategory;
}

export const UserSchema = SchemaFactory.createForClass(Skill);
