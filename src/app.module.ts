import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://SONofaLEGEND:UZJDRvW9R5UnKCGZ@ac-n7ebncv-shard-00-00.ihq7cc5.mongodb.net:27017,ac-n7ebncv-shard-00-01.ihq7cc5.mongodb.net:27017,ac-n7ebncv-shard-00-02.ihq7cc5.mongodb.net:27017/?ssl=true&replicaSet=atlas-tc0qfe-shard-0&authSource=admin&retryWrites=true&w=majority'),
    SharedModule,
    AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
