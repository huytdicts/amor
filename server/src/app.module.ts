import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { UserModule } from './user/user.module';
import { ValidateModule } from './validate/validate.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        port: configService.get<number>('MYSQL_PORT') || 6603, //* In case you don't have a .env file
        username: configService.get<string>('MYSQL_USER') || 'mike',
        database: configService.get<string>('MYSQL_DATABASE') || 'db',
        password: configService.get<string>('MYSQL_PASSWORD') || 'mike@123',
        autoLoadEntities: true,
        entities: [__dirname + ['/**/**/*.entity.{.ts,.js}']],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    HelperModule,
    AuthModule,
    ValidateModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
