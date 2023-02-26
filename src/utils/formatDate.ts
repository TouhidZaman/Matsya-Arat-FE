import { format } from "date-fns";
/**
 * It takes a date and returns a 'DD-MM-YYYY' formatted date
 * @param date - The date to format.
 */
export const getFormattedDate = (date: Date) => format(date, "dd/MM/yyyy");
