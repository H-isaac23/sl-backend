import { Test, TestingModule } from '@nestjs/testing';
import { SkillCategoryService } from './skill-category.service';
import { SkillCategory } from './schemas/skill-category.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
// import mongoose from 'mongoose';

describe('SkillCategoryService', () => {
  let service: SkillCategoryService;
  let model: Model<SkillCategory>;

  const mockSkillCategoryModel = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillCategoryService,
        {
          provide: getModelToken(SkillCategory.name),
          useValue: mockSkillCategoryModel,
        },
      ],
    }).compile();

    service = module.get<SkillCategoryService>(SkillCategoryService);
    model = module.get<Model<SkillCategory>>(getModelToken(SkillCategory.name));
    console.log(model);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllSkillCategories', () => {
    it('should return an array of skill categories', async () => {
      const testResolvedData = [
        {
          skill_category_name: 'Programming',
          skill_category_description: 'what',
          user: '65b366097291996d76493eed',
        },
      ];
      jest.spyOn(model, 'find').mockResolvedValue(testResolvedData);
      const response = await service.findAllSkillCategories();
      expect(response).toBe(testResolvedData);
    });
  });

  describe('findOneSkillCategory', () => {
    it('should return a single skill category', async () => {
      const user = '65b366097291996d76493eed';
      const skill_category_name = 'Programming';

      const testResolvedData = {
        skill_category_name: 'Programming',
        skill_category_description: 'what',
        user: '65b366097291996d76493eed',
      };

      jest.spyOn(model, 'findOne').mockResolvedValue(testResolvedData);
      const response = await service.findOneSkillCategory(
        user,
        skill_category_name,
      );
      expect(response).toBe(testResolvedData);
    });
  });
});
