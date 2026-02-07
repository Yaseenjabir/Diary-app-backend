/**
 * DTO for updating an existing diary entry
 *
 * All fields are optional - you can update just title, just body, or both
 * Used in: PUT /api/entries/:id
 */

export class UpdateEntryDto {
  title?: string; // Optional - new title
  body?: string; // Optional - new content
  isDraft?: boolean; // Optional - change draft status
}
