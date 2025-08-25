
export interface TimeBoxData {
  date: {
    month: string;
    day: string;
    year: string;
  };
  priorities: string[];
  brainDump: string[];
  schedule: Record<number, { '00': string; '30': string }>;
}
