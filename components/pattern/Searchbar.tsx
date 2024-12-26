import { ChangeEvent, FC } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '~/utils/css';

type Props = {
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export const Searchbar: FC<Props> = ({ onChange, className, placeholder = 'Search ...' }) => {
  const onTextChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value),
    500,
  );

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute top-1/2 transform -translate-y-1/2 right-4 w-4 h-4 text-secondary-foreground" />
      <Input type="text" placeholder={placeholder} className="h-full" onChange={onTextChange} />
    </div>
  );
};
