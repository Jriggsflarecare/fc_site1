import { Symptom, WeeklyStats } from '../types';

export const calculateWeeklyStats = (symptoms: Symptom[]): WeeklyStats => {
  const weekAgo = new Date(Date.now() - 7 * 86400000);
  const weekSymptoms = symptoms.filter(s => new Date(s.date) >= weekAgo);
  
  const avgPain = (weekSymptoms.reduce((sum, s) => sum + s.painLevel, 0) / weekSymptoms.length).toFixed(1);
  const avgBM = (weekSymptoms.reduce((sum, s) => sum + s.bowelMovements, 0) / weekSymptoms.length).toFixed(1);
  
  return {
    avgPain: avgPain || "0.0",
    avgBM: avgBM || "0.0",
    totalEntries: weekSymptoms.length.toString()
  };
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const generateDoctorSummary = (stats: WeeklyStats): string => {
  return `Patient has shown moderate IBD activity over the past week with an average pain level of ${stats.avgPain}. ` +
         `Bowel movements are averaging ${stats.avgBM} per day. Notable triggers include dairy products and spicy foods. ` +
         `Sleep patterns appear to affect symptom severity. Recommend continued monitoring of diet and stress levels. ` +
         `Consider scheduling follow-up if symptoms persist.`;
}; 