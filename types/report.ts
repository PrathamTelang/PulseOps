export interface EmployeeReport {
  id: number;
  name: string;
  region: string;

  pending: number;
  settlementRatio: number;
  productivity: number;

  tat: string;

  risk: "low" | "medium" | "high";
}