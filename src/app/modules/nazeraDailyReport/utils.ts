export interface ITimeEntry {
  amount: string
  mistakes: string;
}

export interface IDayEntry {
  morning: ITimeEntry;
  afternoon: ITimeEntry;
  night: ITimeEntry;
  duaHadithMasala: string;
}

export const calculateWeeklySummary = (dailyEntries: Record<string, IDayEntry>) => {
  let totalPages = 0;
  let totalMistakes = 0;
  let totalDuas = 0;
  let totalHadith = 0;

  Object.values(dailyEntries).forEach(day => {
    totalPages += parseInt(day.morning.amount || '0') +
      parseInt(day.afternoon.amount || '0') +
      parseInt(day.night.amount || '0');

    totalMistakes += parseInt(day.morning.mistakes || '0') +
      parseInt(day.afternoon.mistakes || '0') +
      parseInt(day.night.mistakes || '0');
    const duaMatch = day.duaHadithMasala.match(/দোয়া\s*:\s*(\d+)/i) || day.duaHadithMasala.match(/dua\s*:\s*(\d+)/i);
    const hadithMatch = day.duaHadithMasala.match(/হাদিস\s*:\s*(\d+)/i) || day.duaHadithMasala.match(/hadith\s*:\s*(\d+)/i);

    if (duaMatch) totalDuas += parseInt(duaMatch[1]);
    if (hadithMatch) totalHadith += parseInt(hadithMatch[1]);
  });

  return {
    totalPages,
    totalMistakes,
    totalDuas,
    totalHadith,
  };
};