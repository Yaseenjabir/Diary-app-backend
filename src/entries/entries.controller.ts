import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

/**
 * Entries Controller - Handles HTTP requests for diary entries
 *
 * This is the "receptionist" - receives requests and calls the service
 * All routes start with /api/entries
 */

@Controller('api/entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  /**
   * CREATE - POST /api/entries
   * Creates a new diary entry
   *
   * Example request body:
   * {
   *   "title": "My first thought",
   *   "body": "I imagine she has a beautiful smile...",
   *   "isDraft": false
   * }
   */
  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }

  /**
   * READ ALL - GET /api/entries
   * Gets all diary entries with optional filters
   *
   * Query parameters:
   * - search: Search text (searches in title and body)
   * - startDate: Filter from this date (YYYY-MM-DD)
   * - endDate: Filter until this date (YYYY-MM-DD)
   *
   * Examples:
   * - GET /api/entries
   * - GET /api/entries?search=smile
   * - GET /api/entries?startDate=2026-01-01&endDate=2026-01-31
   */
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.entriesService.findAll(search, startDate, endDate);
  }

  /**
   * READ ONE - GET /api/entries/:id
   * Gets a single diary entry by ID
   *
   * Example:
   * - GET /api/entries/65abc123def456789
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(id);
  }

  /**
   * UPDATE - PUT /api/entries/:id
   * Updates an existing diary entry
   *
   * Example request body (all fields optional):
   * {
   *   "title": "Updated title",
   *   "body": "Updated content"
   * }
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entriesService.update(id, updateEntryDto);
  }

  /**
   * DELETE - DELETE /api/entries/:id
   * Deletes a diary entry
   *
   * Example:
   * - DELETE /api/entries/65abc123def456789
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entriesService.remove(id);
  }
}
