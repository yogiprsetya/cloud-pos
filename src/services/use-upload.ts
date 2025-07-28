import { useState } from 'react';
import { httpClient } from '~/src/config/http-client';
import { useToast } from '~/src/hooks/useToast';
import { HttpResponse } from '~/src/types/Response';
import { errorHandler } from '~/src/utils/error-handler';

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
      .post<HttpResponse<FileRes>>('/upload', formData)
      .then((res) => {
        toast({
          title: 'File uploaded',
          description: 'Upload successfull',
          duration: 2500
        });

        return res.data;
      })
      .catch(errorHandler)
      .finally(() => setUploading(false));
  };

  return { upload, isUploading };
};
