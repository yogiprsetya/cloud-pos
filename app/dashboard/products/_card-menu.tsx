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
import { FormStepEnum, useManageProductDialogState } from './_manage-product/use-state';

export const CardMenu: FC<Product> = (props) => {
  const { toggleModal, setInitStep, setInitData } = useManageProductDialogState();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="text-primary" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setInitData(props);
            setInitStep(FormStepEnum.Main);
            toggleModal();
          }}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setInitData(props);
            setInitStep(FormStepEnum.Image);
            toggleModal();
          }}
        >
          Change Image
        </DropdownMenuItem>

        <DropdownMenuItem>Manage Variant</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
