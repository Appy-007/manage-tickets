import { format } from 'date-fns';

export const formattedDate = (inputDate: string) => {
  // format(date, "MMM d, yyyy h:mm a")
  // MMM = Dec, d = 25, yyyy = 2025, h:mm = 9:55, a = PM
  return format(new Date(inputDate), "MMM d, yyyy h:mm a");
};