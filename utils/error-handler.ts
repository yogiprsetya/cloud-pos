import { type AxiosError } from 'axios';
import { toast } from '~/hooks/useToast';

type ResponseType = {
  success: false;
  message: string;
  errors: Record<string, string>[];
};

const panicResponse = {
  success: false,
  message: 'Internal Server Error',
};

export const errorHandler = (err: AxiosError<ResponseType>) => {
  const data = err.response?.data;

  if (data?.message != undefined) {
    const msg = data?.errors.length
      ? typeof data?.errors === 'object'
        ? data?.errors.map((er) => er.message).join(' ')
        : data?.errors
      : data?.message;

    toast({
      title: 'Error occured',
      description: msg,
      variant: 'destructive',
      duration: 5000,
    });

    return err.response?.data ?? panicResponse;
  }

  toast({
    title: 'Error',
    description: 'Internal Server Error',
    variant: 'destructive',
    duration: 5000,
  });

  return panicResponse;
};
