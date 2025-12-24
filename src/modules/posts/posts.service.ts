import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    private usersService: UsersService,
  ) { }

  async create(data: {
    title: string;
    content?: string;
    userId: string;
  }) {
    const user = await this.usersService.findById(data.userId);
    if (!user) {
      throw new BadRequestException('User topilmadi');
    }

    return this.postModel.create({
      title: data.title,
      content: data.content,
      user: data.userId,
    });
  }

  findAll() {
    return this.postModel.find().populate('user', 'name email');
  }

  findByUser(userId: string) {
    return this.postModel.find({ user: userId });
  }

  update(
    id: string,
    data: { title?: string; content?: string },
  ) {
    return this.postModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );
  }

  async delete(id: string) {
    await this.postModel.findByIdAndDelete(id);
    return {
      success: true,
      message: "Post deleted"
    }
  }
}
