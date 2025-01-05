import { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import { type Product } from '~/model/types/product';

type Props = {
  data: Product;
  trigger: ReactNode;
};

export const ModalDeleteProduct: FC<Props> = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Are you sure you want to delete this product?, this action cannot be undone.
        </DialogDescription>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
