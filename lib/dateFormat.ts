import { format } from "date-fns";

export const formattedDate = (inputDate: string) => {
  const date = new Date(inputDate);

  return format(
    new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes()
      )
    ),
    "MMM d, yyyy h:mm a"
  );
};