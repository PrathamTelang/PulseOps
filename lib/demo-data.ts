const REGIONS = ["North", "South", "East", "West", "Central"];
const TEAMS = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta"];
const STATUSES = ["Active", "Pending", "Resolved", "Escalated"];
const NAMES = [
  "Arjun Sharma", "Priya Patel", "Rahul Verma", "Ananya Gupta",
  "Vikram Singh", "Sneha Reddy", "Amit Kumar", "Divya Joshi",
  "Rohan Desai", "Neha Kapoor", "Karan Mehta", "Isha Nair",
  "Manoj Tiwari", "Pooja Rao", "Siddharth Menon"
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randDate(daysBack: number): string {
  const d = new Date();
  d.setDate(d.getDate() - rand(0, daysBack));
  return d.toISOString().split("T")[0];
}

export function generateDemoData() {
  const rows: Record<string, unknown>[] = [];

  for (let i = 0; i < 50; i++) {
    const region = REGIONS[rand(0, REGIONS.length - 1)];
    const team = TEAMS[rand(0, TEAMS.length - 1)];
    const name = NAMES[rand(0, NAMES.length - 1)];

    rows.push({
      "Employee ID": `EMP${String(rand(1000, 9999))}`,
      "Employee Name": name,
      Region: region,
      Team: team,
      "Settlement Rate": rand(65, 100),
      "Pending Cases": rand(0, 50),
      "Productivity Score": rand(50, 100),
      "TAT (Hours)": rand(2, 48),
      "Health Score": rand(60, 100),
      Status: STATUSES[rand(0, STATUSES.length - 1)],
      "Report Date": randDate(30),
    });
  }

  const rows2: Record<string, unknown>[] = [];
  for (let i = 0; i < 20; i++) {
    rows2.push({
      "Employee ID": `EMP${String(rand(1000, 9999))}`,
      "Employee Name": NAMES[rand(0, NAMES.length - 1)],
      Region: REGIONS[rand(0, REGIONS.length - 1)],
      "Cases Resolved": rand(10, 100),
      "Cases Escalated": rand(0, 15),
      "Customer Rating": rand(3, 5),
    });
  }

  return [
    { sheetName: "Operations", rows },
    { sheetName: "Performance", rows: rows2 },
  ];
}
