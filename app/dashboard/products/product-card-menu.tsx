import { Ellipsis } from 'lucide-react';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { Product } from '~/model/types/product';
import { useProductState } from './use-state';

export const ProductCardMenu: FC<Product> = (product) => {
  const { openDeleteModal, openManageVariantModal } = useProductState();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="text-primary" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <a href={`/dashboard/products/${product.id}`}>Edit</a>
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

        <DropdownMenuItem onClick={() => openManageVariantModal(product)}>Manage Variant</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive" onClick={() => openDeleteModal(product)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
