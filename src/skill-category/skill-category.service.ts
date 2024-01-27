import { Injectable } from '@nestjs/common';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SkillCategory } from './schemas/skill-category.schema';

@Injectable()
export class SkillCategoryService {
  constructor(
    @InjectModel(SkillCategory.name)
    private skillCategoryModel: Model<SkillCategory>,
  ) {}

  createSkillCategory(createSkillCategoryDto: CreateSkillCategoryDto) {
    return 'This action adds a new skillCategory';
  }

  async findAllSkillCategories() {
    const skillCategories = await this.skillCategoryModel.find({});
    return skillCategories;
  }

  async findOneSkillCategory(user: string, skill_category_name: string) {
    const skillCategory = await this.skillCategoryModel.findOne({
      $and: [{ user }, { skill_category_name }],
    });
    if (!skillCategory) {
      throw new Error(
        `Skill Category ${skill_category_name} from user with ObjectId ${user} does not exist`,
      );
    }
    return skillCategory;
  }

  updateSkillCategory(updateSkillCategoryDto: UpdateSkillCategoryDto) {
    return `This action updates a #${updateSkillCategoryDto.skillCategoryName} skillCategory`;
  }

  removeSkillCategory(id: number) {
    return `This action removes a #${id} skillCategory`;
  }
}
