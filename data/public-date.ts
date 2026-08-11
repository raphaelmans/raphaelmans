const publicDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

const daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;

function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function isValidPublicDate(value: string) {
  const match = publicDatePattern.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year < 1 || month < 1 || month > 12 || day < 1) return false;

  const maximumDay = month === 2 && isLeapYear(year) ? 29 : daysByMonth[month - 1];
  return day <= maximumDay;
}
