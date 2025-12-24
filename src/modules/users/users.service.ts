import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Post, PostDocument } from '../posts/schemas/post.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) { }


  create(data: Partial<User>) {
    return this.userModel.create(data);
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, data: Partial<User>) {
    return this.userModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );
  }

  async delete(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) return null;

    await this.postModel.deleteMany({ user: id });
    await this.userModel.findByIdAndDelete(id);

    return {
      success: true,
      message: "User and related posts deleted"
    }
  }
}
