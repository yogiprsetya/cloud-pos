'use client';

import { ChangeEvent, ComponentProps, forwardRef, useCallback, useId, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useImageResizer } from '~/hooks/use-image-resizer';
import { cn } from '~/utils/css';
import { If } from '../ui/if';
import { Button } from '../ui/button';
import { CloudUpload } from 'lucide-react';

interface Props extends Omit<ComponentProps<'input'>, 'onChange'> {
  label: string;
  className?: string;
  onUploaded?: (file: string) => void;
}

const WIDTH = 500;
const HEIGHT = 375;

export const UploadImage = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [preview, setPreview] = useState<File | null>(null);

  const elementId = useId();

  const { resizeFile } = useImageResizer({ width: WIDTH, height: HEIGHT });

  const handleUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files;

      if (file && file[0]) {
        const image = await resizeFile(file[0]);
        setPreview(image);
      }
    },
    [resizeFile],
  );

  const upload = useCallback(() => {
    console.log(preview);
  }, [preview]);

  return (
    <div className={cn('grid grid-cols-4 w-full items-center', props.className)}>
      <Label htmlFor={elementId} className="text-right mr-4">
        {props.label}
      </Label>

      <Input id={elementId} type="file" ref={ref} onChange={handleUpload} className="col-span-3" />

      <If condition={preview}>
        {(src) => (
          <div className="relative col-span-4 mt-6">
            <img
              src={URL.createObjectURL(src)}
              alt="product image preview"
              className="w-full rounded"
            />

            <Button
              onClick={upload}
              className="absolute top-2 right-2"
              size="sm"
              variant="secondary"
            >
              <CloudUpload /> Upload
            </Button>
          </div>
        )}
      </If>
    </div>
  );
});

UploadImage.displayName = 'UploadImage';