import { create } from 'zustand';
import { Product } from '~/model/types/product';
import { devtools } from 'zustand/middleware';

// export enum FormStepEnum {
//   Main = 'Main',
//   Image = 'Image',
// }

type State = {
  isDeleteModalOpen: boolean;
  product?: Product;
  openDeleteModal: (product: Product) => void;
  closeDeleteModal: () => void;
  // isOpen: boolean;
  // toggleModal: () => void;
  // initData: Product | null;
  // initStep: FormStepEnum;
  // setInitData: (data: Product) => void;
  // setInitStep: (step: FormStepEnum) => void;
};

export const useProductState = create<State>()(
  devtools((set) => ({
    isDeleteModalOpen: false,
    openDeleteModal: (product) => set(() => ({ isDeleteModalOpen: true, product })),
    closeDeleteModal: () => set(() => ({ isDeleteModalOpen: false, product: undefined }))
    // toggleModal: () =>
    //   set((state: DialogState) => {
    //     return {
    //       isOpen: !state.isOpen,
    //       initData: state.isOpen ? null : state.initData,
    //       initStep: state.isOpen ? FormStepEnum.Main : state.initStep,
    //     };
    //   }),
    // initData: null,
    // initStep: FormStepEnum.Main,
    // setInitData: (data: Product) => set(() => ({ initData: data })),
    // setInitStep: (step: FormStepEnum) => set(() => ({ initStep: step })),
  }))
);
