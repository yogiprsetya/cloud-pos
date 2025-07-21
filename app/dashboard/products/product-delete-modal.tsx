import { FC } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import { useProduct } from '~/services/use-product';
import { useProductState } from './use-state';

export const ModalDeleteProduct: FC = () => {
  const { deleteProductById, isMutating } = useProduct();
  const state = useProductState();

  if (!state.product) return null;

  const handleDelete = async () => {
    const res = await deleteProductById(state.product?.id ?? 0);

    if (res) {
      state.closeDeleteModal();
    }
  };

  return (
    <Dialog open={state.isDeleteModalOpen} onOpenChange={() => state.closeDeleteModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete product</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Are you sure you want to delete <b>{state.product?.name}</b>?, this action cannot be undone.
        </DialogDescription>

        <DialogFooter>
          <Button variant="destructive" disabled={isMutating} onClick={handleDelete}>
            {isMutating ? 'Loading ...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
