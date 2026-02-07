import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available everywhere
    }),

    // Connect to MongoDB
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/diary-app',
    ),

    // Import Entries Module (contains all diary entry routes)
    EntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
