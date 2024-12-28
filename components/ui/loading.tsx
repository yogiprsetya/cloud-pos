import { LoaderCircle } from 'lucide-react';
import { FC } from 'react';
import { cn } from '~/utils/css';

type Props = {
  className?: string;
};

export const Loading: FC<Props> = ({ className }) => (
  <div title="Loading occure, please wait" className={cn('max-w-fit size-4', className)}>
    <LoaderCircle className="animate-spin w-full h-full stroke-secondary-foreground" />
  </div>
);
