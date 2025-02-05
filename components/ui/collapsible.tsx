'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { FC, ReactNode, useState } from 'react';
import { Button } from './button';
import { cn } from '~/utils/css';

const CollapsibleRoot = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

type Props = {
  children: ReactNode;
  label: ReactNode;
  className?: string;
};

const Collapsible: FC<Props> = ({ children, label, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CollapsibleRoot open={isOpen} onOpenChange={setIsOpen} className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between space-x-2 px-4">
        {typeof label === 'string' ? <h4 className="text-sm font-semibold">{label}</h4> : label}

        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon" className="size-9 shrink-0">
            <ChevronsUpDown className="size-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 px-4 borderpb pb-4">{children}</CollapsibleContent>
    </CollapsibleRoot>
  );
};

export { Collapsible };
