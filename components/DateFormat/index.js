import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date, shape) => {
  return format(date, shape, { locale: ptBR })
}