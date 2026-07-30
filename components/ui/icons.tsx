export {
  LayoutDashboard,
  Upload,
  BarChart3,
  FileSpreadsheet,
  Settings,
  Bell,
  Search,
  Activity,
  TrendingUp,
  Clock3,
  ShieldCheck,
  AlertTriangle,
  UploadCloud,
  FileText,
  Download,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Info,
  Lightbulb,
  TrendingDown,
  Sparkles,
  PanelRightOpen,
  Sun,
  Moon,
  LogOut,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";

export function PulseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12h4l2-6 4 12 2-6 2 6 2-4h2" />
    </svg>
  );
}

export function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
