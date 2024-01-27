import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type SkillCategoryDocument = HydratedDocument<SkillCategory>;

@Schema()
export class SkillCategory {
  @Prop({ required: true })
  skill_category_name: string;

  @Prop()
  skill_category_description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const SkillCategorySchema = SchemaFactory.createForClass(SkillCategory);
