import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy", { locale: fr });
};
