import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest_mongo_demo'),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
