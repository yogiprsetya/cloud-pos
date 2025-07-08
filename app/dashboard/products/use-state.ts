import { create } from 'zustand';
import { Product } from '~/model/types/product';
import { devtools } from 'zustand/middleware';

type State = {
  product?: Product;

  isDeleteModalOpen: boolean;
  openDeleteModal: (product: Product) => void;
  closeDeleteModal: () => void;

  isCategoryModalOpen: boolean;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
};

export const useProductState = create<State>()(
  devtools((set) => ({
    isDeleteModalOpen: false,
    openDeleteModal: (product) => set(() => ({ isDeleteModalOpen: true, product })),
    closeDeleteModal: () => set(() => ({ isDeleteModalOpen: false, product: undefined })),

    isCategoryModalOpen: false,
    openCategoryModal: () => set(() => ({ isCategoryModalOpen: true })),
    closeCategoryModal: () => set(() => ({ isCategoryModalOpen: false }))
  }))
);
