export type ResourceCategory =
  | "ACADEMIC"
  | "VA_BENEFITS"
  | "CAMPUS_COMMUNITY"
  | "WELLNESS_SUPPORT"
  | "ORIENTATION";

export type ResourceFileType = "PDF" | "DOCX" | "LINK";

export type ResourceItem = {
  id: string;                 // stable unique id
  title: string;
  category: ResourceCategory;
  description: string;
  fileType: ResourceFileType; // PDF / DOCX / LINK
  href: string;               // /resources/foo.pdf or external link
  fileSize?: string;          // e.g., "220 KB"
  lastUpdated?: string;       // e.g., "2026-01-05"
  printable?: boolean;        // show Print button (true for PDFs)
  tags?: string[];            // optional: filtering/search later
};
