/**
 * DTO (Data Transfer Object) for creating a new diary entry
 *
 * This defines what data is required when someone creates an entry
 * Used in: POST /api/entries
 */

export class CreateEntryDto {
  title: string; // Entry title
  body: string; // Entry content
  isDraft?: boolean; // Optional - is this a draft?
}
