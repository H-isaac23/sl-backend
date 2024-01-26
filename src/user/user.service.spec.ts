import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  const mockAccount = {
    username: 'test1',
    hashed_password:
      '$2b$10$pJw/78SoHNbBbk3yTfjeM.5t.nXyWxm6EFHR6PW5MMNF16tdNhSPu',
    email: 'test1@gmail.com',
    _id: new mongoose.Types.ObjectId('65b366097291996d76493eed'),
    __v: 0,
  };

  beforeEach(async () => {
    const mockUserModel = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn().mockImplementationOnce((data) => {
        return {
          ...data,
          save: jest.fn(),
        };
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneUser', () => {
    it('should find a user existing in the database', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockAccount);
      const response = await service.findOneUser('test1');
      expect(response).toBe(mockAccount);
    });

    it('should not find a user not existing', async () => {
      const username = 'test2';
      const expectedResponse = `User with username ${username} does not exist.`;
      jest
        .spyOn(model, 'findOne')
        .mockResolvedValue(`User with username ${username} does not exist.`);
      const response = await service.findOneUser(username);
      expect(response).toBe(expectedResponse);
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const expectedResponse = [mockAccount];
      jest.spyOn(model, 'find').mockResolvedValue(expectedResponse);

      const response = await service.findAllUsers();
      expect(response).toBe(expectedResponse);
    });
  });

  describe('createUser', () => {
    it('should not create a duplicate account', async () => {
      const newAccountData = {
        username: 'test1',
        email: 'test1@gmail.com',
        password: 'test1test1',
      };

      // const expectedResponse = mockAccount as UserDocument;
      // const accountModel = new model(newAccountData);
      // jest.spyOn(accountModel, 'save').mockResolvedValue(expectedResponse);
      jest.spyOn(model, 'findOne').mockResolvedValue(mockAccount);

      try {
        await service.createUser(newAccountData);
        fail('Response should have thrown an Exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toBe(
          `User with username ${newAccountData.username} already exists.`,
        );
        expect(error.status).toBe(HttpStatus.CONFLICT);
      }
    });

    it('should not create an account with password of length < 8', async () => {
      const newAccountData = {
        username: 'test10',
        email: 'test10@gmail.com',
        password: 'test10',
      };

      try {
        await service.createUser(newAccountData);
        fail('Response should throw an HttpException with status 400');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toBe(
          'Password of length less than 8 is not allowed',
        );
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  // get two accounts
  // find one user
});
