import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { Entry, EntrySchema } from './schemas/entry.schema';

/**
 * Entries Module - Organizes all entry-related components
 *
 * This module bundles together:
 * - Schema (Entry model)
 * - Controller (handles HTTP requests)
 * - Service (business logic)
 */

@Module({
  imports: [
    // Register the Entry model with Mongoose
    MongooseModule.forFeature([{ name: Entry.name, schema: EntrySchema }]),
  ],
  controllers: [EntriesController], // HTTP request handlers
  providers: [EntriesService], // Business logic
  exports: [EntriesService], // Make service available to other modules
})
export class EntriesModule {}
