import { Injectable } from '@nestjs/common';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';

@Injectable()
export class SkillCategoryService {
  create(createSkillCategoryDto: CreateSkillCategoryDto) {
    return 'This action adds a new skillCategory';
  }

  findAll() {
    return `This action returns all skillCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skillCategory`;
  }

  update(id: number, updateSkillCategoryDto: UpdateSkillCategoryDto) {
    return `This action updates a #${id} skillCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} skillCategory`;
  }
}
