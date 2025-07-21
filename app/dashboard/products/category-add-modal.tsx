import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { useProductState } from './use-state';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { If } from '~/components/ui/if';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';

export const CategoryAddModal = () => {
  const [addMode, setAddMode] = useState(false);
  const [catName, setCatName] = useState('');

  const state = useProductState();

  return (
    <Dialog open={state.isCategoryModalOpen} onOpenChange={() => state.closeCategoryModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <div>
          <If condition={addMode}>
            <form className="flex gap-2 items-end" id="form-add-category">
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
            <Button variant="destructive" size="sm" onClick={() => setAddMode(false)}>
              <X />
              Cancel
            </Button>

            <Button size="sm" form="form-add-category" type="submit" disabled={catName.length < 2}>
              Save
            </Button>
          </If>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
