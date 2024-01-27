import { Injectable } from '@nestjs/common';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';

@Injectable()
export class SkillCategoryService {
  createSkillCategory(createSkillCategoryDto: CreateSkillCategoryDto) {
    console.log(createSkillCategoryDto);
    return 'This action adds a new skillCategory';
  }

  findAllSkillCategories() {
    return `This action returns all skillCategory`;
  }

  findOneSkillCategory(user: string, skill_category_name: string) {
    return `This action returns a #${user + skill_category_name} skillCategory`;
  }

  updateSkillCategory(
    id: number,
    updateSkillCategoryDto: UpdateSkillCategoryDto,
  ) {
    console.log(updateSkillCategoryDto);
    return `This action updates a #${id} skillCategory`;
  }

  removeSkillCategory(id: number) {
    return `This action removes a #${id} skillCategory`;
  }
}
