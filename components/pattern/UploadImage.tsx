'use client';

import { ChangeEvent, ComponentProps, forwardRef, useCallback, useId, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useImageResizer } from '~/hooks/useImageResizer';
import { cn } from '~/utils/css';
import { If } from '../ui/if';
import { Button } from '../ui/button';
import { CloudUpload } from 'lucide-react';
import { useUpload } from '~/services/use-upload';

interface Props extends Omit<ComponentProps<'input'>, 'onChange'> {
  label: string;
  className?: string;
  existingImageUrl?: string | null;
  onUploaded?: (file: string) => void;
}

const WIDTH = 400;
const HEIGHT = 300;

export const UploadImage = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [preview, setPreview] = useState<File | null>(null);

  const elementId = useId();
  const { resizeFile } = useImageResizer({ width: WIDTH, height: HEIGHT });
  const { upload, isUploading } = useUpload();

  const handleUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files;

      if (file && file[0]) {
        const image = await resizeFile(file[0]);
        setPreview(image);
      }
    },
    [resizeFile]
  );

  const onUpload = useCallback(async () => {
    if (preview) {
      const up = await upload(preview);

      if (up.success && props.onUploaded && 'data' in up) {
        props.onUploaded(`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${up.data.fullPath}`);
      }
    }
  }, [preview, props, upload]);

  return (
    <div className={cn('space-y-2', props.className)}>
      <Label htmlFor={elementId}>{props.label}</Label>

      <Input id={elementId} type="file" ref={ref} onChange={handleUpload} />

      <If condition={preview || props.existingImageUrl}>
        {(src) => (
          <div className="relative">
            <img
              src={typeof src === 'string' ? src : URL.createObjectURL(src)}
              alt="product image preview"
              className="w-full rounded object-cover"
              style={{ maxHeight: HEIGHT }}
            />

            <If condition={preview}>
              <Button
                onClick={onUpload}
                className="absolute top-2 right-2"
                size="sm"
                variant="secondary"
                disabled={isUploading}
              >
                <CloudUpload /> {isUploading ? 'Uploading ...' : 'Upload'}
              </Button>
            </If>
          </div>
        )}
      </If>
    </div>
  );
});

UploadImage.displayName = 'UploadImage';
