export interface ColumnProfile {
  name: string;
  type: "text" | "number" | "date" | "boolean" | "empty";
  missing: number;
}

export interface SheetProfile {
  sheetName: string;
  rows: number;
  columns: number;
  profiles: ColumnProfile[];
}

export interface SheetData {
  sheetName: string;
  rows: Record<string, unknown>[];
}

export interface KpiMetric {
  label: string;
  value: string;
  change: number;
  icon: string;
  color: string;
  bgColor: string;
}

export interface Insight {
  id: string;
  type: "positive" | "negative" | "neutral";
  message: string;
  category: string;
}

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  status: "Completed" | "Pending" | "In Progress";
  color: "green" | "orange" | "blue";
}

export interface ChartConfig {
  type: "line" | "bar";
  title: string;
  description: string;
  data: { label: string; value: number }[];
  color: string;
}

export interface ProcessingStep {
  id: string;
  label: string;
  status: "pending" | "processing" | "done";
}

export interface UploadedFile {
  name: string;
  sheets: SheetData[];
  profiles: SheetProfile[];
}
