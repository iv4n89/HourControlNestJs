import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourControlModule } from './hour-control/hour-control.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './db/db.sqlite',
    autoLoadEntities: true,
    synchronize: true,
  }), HourControlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
