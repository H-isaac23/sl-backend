import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    // Check if user exists
    const { username, email, password } = createUserDto;
    if (password.length < 8) {
      throw new HttpException(
        'Password of length less than 8 is not allowed',
        HttpStatus.BAD_REQUEST,
      );
    }
    const doesPlayerExist = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (doesPlayerExist) {
      throw new HttpException(
        `User with username ${username} already exists.`,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const accountModel = new this.userModel({
      username,
      email,
      hashed_password: hashedPassword,
    });

    const savedAccount = await accountModel.save();
    return savedAccount;
  }

  async findAllUsers() {
    const accounts = await this.userModel.find({});
    return accounts;
  }

  async findOneUser(username: string) {
    const account = await this.userModel.findOne({ username });
    if (!account) {
      return `User with username ${username} does not exist.`;
    }
    return account;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // IMPORTANT: THIS METHOD IS USED FOR TESTING ONLY
  async removeAllUser() {
    if (process.env.NODE_ENV === 'test') {
      await this.userModel.deleteMany({});
      return `This action removes all users.`;
    } else {
      throw new Error(
        'removeAllUser method is only allowed in test environment',
      );
    }
  }
}
