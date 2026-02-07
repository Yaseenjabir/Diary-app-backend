import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry } from './schemas/entry.schema';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

/**
 * Entries Service - Contains all the business logic for diary entries
 *
 * This is where we interact with the database
 * Controller calls these methods → Service talks to MongoDB
 */

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<Entry>,
    // Injects the Entry model so we can query the database
  ) {}

  /**
   * Create a new diary entry
   * @param createEntryDto - Data for the new entry
   * @returns The created entry
   */
  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const newEntry = new this.entryModel(createEntryDto);
    return newEntry.save(); // Save to MongoDB
  }

  /**
   * Get all diary entries
   * Supports optional search and date filtering
   * @param search - Search text (searches in title and body)
   * @param startDate - Filter entries from this date
   * @param endDate - Filter entries until this date
   * @returns Array of entries
   */
  async findAll(
    search?: string,
    startDate?: string,
    endDate?: string,
  ): Promise<Entry[]> {
    // Using any for MongoDB query flexibility - TypeScript can't fully type dynamic queries
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const query: any = {};

    // Add search filter if provided
    if (search) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      query.$or = [
        { title: { $regex: search, $options: 'i' } }, // Case-insensitive search in title
        { body: { $regex: search, $options: 'i' } }, // Case-insensitive search in body
      ];
    }

    // Add date range filter if provided
    if (startDate || endDate) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      query.createdAt = {};
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (startDate) query.createdAt.$gte = new Date(startDate); // Greater than or equal
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (endDate) query.createdAt.$lte = new Date(endDate); // Less than or equal
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.entryModel
      .find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec();
  }

  /**
   * Get a single entry by ID
   * @param id - Entry ID
   * @returns The entry or throws NotFoundException
   */
  async findOne(id: string): Promise<Entry> {
    const entry = await this.entryModel.findById(id).exec();

    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }

    return entry;
  }

  /**
   * Update an existing entry
   * @param id - Entry ID
   * @param updateEntryDto - Fields to update
   * @returns The updated entry
   */
  async update(id: string, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    const updatedEntry = await this.entryModel
      .findByIdAndUpdate(id, updateEntryDto, { new: true }) // new: true returns the updated document
      .exec();

    if (!updatedEntry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }

    return updatedEntry;
  }

  /**
   * Delete an entry
   * @param id - Entry ID
   * @returns Success message
   */
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.entryModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }

    return { message: 'Entry deleted successfully' };
  }
}
