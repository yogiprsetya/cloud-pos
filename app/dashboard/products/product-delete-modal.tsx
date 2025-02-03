import { ComponentPropsWithoutRef, FC } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import { type Product } from '~/model/types/product';

type DialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>;

type Props = DialogProps & {
  data?: Product;
};

export const ModalDeleteProduct: FC<Props> = ({ data, ...props }) => {
  if (!data) return null;

  return (
    <Dialog {...props}>
      {/* <DialogTrigger asChild>{trigger}</DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Are you sure you want to delete <b>{data?.name}</b>?, this action cannot be undone.
        </DialogDescription>

        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
