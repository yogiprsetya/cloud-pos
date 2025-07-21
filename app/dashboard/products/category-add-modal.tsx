import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { useProductState } from './use-state';
import { Plus, Trash2, X } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { If } from '~/components/ui/if';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useProductCategories } from '~/services/use-product-categories';
import { ColumnDef } from '@tanstack/react-table';
import type { ProductCategory } from '~/model/types/product';
import { DataTable } from '~/components/pattern/DataTable';

export const CategoryAddModal = () => {
  const [addMode, setAddMode] = useState(false);
  const [catName, setCatName] = useState('');

  const state = useProductState();
  const { data, deleteCategory, addCategory, isLoading, isMutating } = useProductCategories();

  const columns: ColumnDef<ProductCategory>[] = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex justify-between items-center">
            <Text tag="span">{row.original.name}</Text>

            <Button
              size="icon"
              onClick={() => deleteCategory(row.original.id)}
              disabled={isMutating}
              variant="ghost"
            >
              <Trash2 />
            </Button>
          </div>
        )
      }
    ],
    [deleteCategory]
  );

  const createProductCat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await addCategory({ name: catName });

    if (res) {
      setAddMode(false);
      setCatName('');
    }
  };

  return (
    <Dialog open={state.isCategoryModalOpen} onOpenChange={() => state.closeCategoryModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <div>
          <If condition={!addMode}>
            <DataTable size="sm" columns={columns} isLoading={isLoading} data={data?.data ?? []} />
          </If>

          <If condition={addMode}>
            <form onSubmit={createProductCat} id="form-add-category">
              <Label className="space-y-1 w-full">
                <Text variant="small">Category Name</Text>
                <Input onChange={(e) => setCatName(e.target.value)} />
              </Label>
            </form>
          </If>
        </div>

        <DialogFooter>
          <If condition={!addMode}>
            <Button onClick={() => setAddMode(true)}>
              <Plus />
              Add
            </Button>
          </If>

          <If condition={addMode}>
            <Button variant="destructive" disabled={isMutating} size="sm" onClick={() => setAddMode(false)}>
              <X />
              Cancel
            </Button>

            <Button
              size="sm"
              form="form-add-category"
              type="submit"
              disabled={catName.length < 2 || isMutating}
            >
              Save
            </Button>
          </If>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
