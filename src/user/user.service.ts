import { BadRequestException, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Response } from 'express';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

import {
  ValidLogFormat,
  ValidLogTypes,
  customLogger,
} from 'src/helper/customLogger';

import { IResponse } from 'src/interface/IResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto, res: Response) {
    customLogger('CREATING USER', ValidLogTypes.log, ValidLogFormat.center);
    const { email, password } = createUserDto;
    let response: IResponse;

    try {
      customLogger(
        `Verify email: ${email}.`,
        ValidLogTypes.log,
        ValidLogFormat.right,
      );

      const existEmail = await this.userRepository.findOne({
        where: { email },
      });

      if (existEmail) {
        response = {
          success: false,
          message: `The email: ${email} already exist.`,
          error_code: 400,
          data: {},
        };

        customLogger(
          `The email: ${email} already exist.`,
          ValidLogTypes.error,
          ValidLogFormat.right,
        );

        return res.status(400).json(response);
      }

      customLogger(
        `Creating new user.`,
        ValidLogTypes.log,
        ValidLogFormat.right,
      );
      const newUser = await this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(password, 10),
      });

      customLogger(
        `Saving in data base.`,
        ValidLogTypes.log,
        ValidLogFormat.right,
      );
      await this.userRepository.save(newUser);

      response = {
        success: true,
        message: `The user was created succesfully.`,
        data: {
          user: newUser,
        },
      };

      return res.status(201).json(response);
    } catch (error) {
      const { code, detail } = error;

      customLogger(detail, ValidLogTypes.error, ValidLogFormat.right);

      const response: IResponse = {
        success: false,
        message: 'Internal server error, verify API logs.',
        data: {},
        error_code: code,
      };

      return res.status(500).json(response);
    } finally {
      customLogger();
    }
  }

  findAll() {
    try {
      throw new BadRequestException('this is a bad req');
    } catch (error) {
      return new InternalServerErrorException(
        'this is a internal server error',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
