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
import { useProduct } from '~/services/use-product';
import { useProductState } from './use-state';

type DialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>;

type Props = DialogProps & {
  data?: Product;
};

export const ModalDeleteProduct: FC<Props> = ({ data, ...props }) => {
  const { deleteProductById, isMutating } = useProduct();
  const { closeDeleteModal } = useProductState();

  if (!data) return null;

  const handleDelete = async () => {
    const res = await deleteProductById(data?.id);

    if (res) {
      closeDeleteModal();
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete product</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Are you sure you want to delete <b>{data?.name}</b>?, this action cannot be undone.
        </DialogDescription>

        <DialogFooter>
          <Button variant="secondary">Cancel</Button>

          <Button variant="destructive" disabled={isMutating} onClick={handleDelete}>
            {isMutating ? 'Loading ...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
