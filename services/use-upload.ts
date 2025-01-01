import { useState } from 'react';
import { httpClient } from '~/config/http-client';
import { useToast } from '~/hooks/useToast';
import { HttpRequest } from '~/model/types/http';
import { errorHandler } from '~/utils/error-handler';

type FileRes = {
  id: string;
  path: string;
  fullPath: string;
};

export const useUpload = () => {
  const [isUploading, setUploading] = useState(false);

  const { toast } = useToast();

  const upload = (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    return httpClient
      .post<HttpRequest<FileRes>>('/upload', formData)
      .then((res) => {
        toast({
          title: 'File uploaded',
          description: 'Continue to add product variant',
          duration: 2500,
        });

        return res.data;
      })
      .catch(errorHandler)
      .finally(() => setUploading(false));
  };

  return { upload, isUploading };
};
