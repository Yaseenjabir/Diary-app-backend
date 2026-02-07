import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Entry Schema - Defines the structure of a diary entry in MongoDB
 *
 * @Prop() decorator tells Mongoose this is a database field
 * Document type makes this a Mongoose document with save(), delete(), etc methods
 
**/
@Schema({ timestamps: true }) // Automatically creates createdAt and updatedAt fields
export class Entry extends Document {
  @Prop({ required: true, maxlength: 200 })
  title: string; // Entry title (max 200 characters)

  @Prop({ required: true })
  body: string; // Entry content (unlimited length)

  @Prop({ default: false })
  isDraft: boolean; // Is this a draft? (default: false)

  // createdAt and updatedAt are added automatically by timestamps: true
}

// Create the Mongoose schema from the class
export const EntrySchema = SchemaFactory.createForClass(Entry);
