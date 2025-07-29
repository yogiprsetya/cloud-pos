'use client';

import { ChangeEvent, ComponentProps, forwardRef, useCallback, useId, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useImageResizer } from '~/src/hooks/useImageResizer';
import { cn } from '~/src/utils/css';
import { If } from '../ui/if';
import { Button } from '../ui/button';
import { CloudUpload, MessageCircleWarning } from 'lucide-react';
import { useUpload } from '~/services/use-upload';

interface Props extends Omit<ComponentProps<'input'>, 'onChange'> {
  label: string;
  className?: string;
  existingImageUrl?: string | null;
  onUploaded?: (file: string) => void;
}

const WIDTH = 380;

export const UploadImage = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [preview, setPreview] = useState<File | null>(null);

  const elementId = useId();
  const { resizeFile } = useImageResizer({ maxWidth: WIDTH });
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
          <div className="flex gap-4 items-center">
            <img
              src={typeof src === 'string' ? src : URL.createObjectURL(src)}
              alt="product image preview"
              className="size-40 rounded-md object-cover"
            />

            <If condition={preview}>
              <div className="space-y-1">
                <Button onClick={onUpload} className="" size="sm" variant="outline" disabled={isUploading}>
                  <CloudUpload /> {isUploading ? 'Uploading ...' : 'Upload'}
                </Button>

                <div className="text-sm flex items-center gap-1">
                  <MessageCircleWarning className="size-4" />
                  <p>Upload image before create product.</p>
                </div>
              </div>
            </If>
          </div>
        )}
      </If>
    </div>
  );
});

UploadImage.displayName = 'UploadImage';
