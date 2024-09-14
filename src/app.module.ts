import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { KnexModule } from 'nestjs-knex';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: {
        client: process.env.DB_CLIENT,
        connection: {
          database: process.env.DB_NAME,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
        },
        migrations: {
          directory: './src/db/migrations',
        },
      },
    }),
    PostsModule,
  ],
  providers: [],
})
export class AppModule {}
