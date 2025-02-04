import { create } from 'zustand';
import { Product } from '~/model/types/product';
import { devtools } from 'zustand/middleware';

type State = {
  product?: Product;

  isDeleteModalOpen: boolean;
  openDeleteModal: (product: Product) => void;
  closeDeleteModal: () => void;

  isManageVariantModalOpen: boolean;
  openManageVariantModal: (product: Product) => void;
  closeManageVariantModal: () => void;
};

export const useProductState = create<State>()(
  devtools((set) => ({
    isDeleteModalOpen: false,
    openDeleteModal: (product) => set(() => ({ isDeleteModalOpen: true, product })),
    closeDeleteModal: () => set(() => ({ isDeleteModalOpen: false, product: undefined })),

    isManageVariantModalOpen: false,
    openManageVariantModal: (product) => set(() => ({ isManageVariantModalOpen: true, product })),
    closeManageVariantModal: () => set(() => ({ isManageVariantModalOpen: false, product: undefined }))
  }))
);
