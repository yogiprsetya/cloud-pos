import { Ellipsis } from 'lucide-react';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { useProductState } from './use-state';
import Link from 'next/link';
import type { InferSelectModel } from 'drizzle-orm';
import { product } from '~/db/schema/product';

type Product = InferSelectModel<typeof product>;

export const ProductCardMenu: FC<Product> = (product) => {
  const { openDeleteModal } = useProductState();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="text-primary" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/products/${product.id}`}>Edit</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            // setInitData(props);
            // setInitStep(FormStepEnum.Image);
            // toggleModal();
          }}
        >
          Change Image
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive" onClick={() => openDeleteModal(product)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
