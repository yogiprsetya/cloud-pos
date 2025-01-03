import { create } from 'zustand';
import { Product } from '~/model/types/product';
import { devtools } from 'zustand/middleware';

export enum FormStepEnum {
  Main = 'Main',
  Image = 'Image',
}

export type DialogState = {
  isOpen: boolean;
  toggleModal: () => void;
  initData: Product | null;
  initStep: FormStepEnum;
  setInitData: (data: Product) => void;
  setInitStep: (step: FormStepEnum) => void;
};

export const useManageProductDialogState = create<DialogState>()(
  devtools((set) => ({
    isOpen: false,
    toggleModal: () =>
      set((state: DialogState) => {
        return {
          isOpen: !state.isOpen,
          initData: state.isOpen ? null : state.initData,
          initStep: state.isOpen ? FormStepEnum.Main : state.initStep,
        };
      }),
    initData: null,
    initStep: FormStepEnum.Main,
    setInitData: (data: Product) => set(() => ({ initData: data })),
    setInitStep: (step: FormStepEnum) => set(() => ({ initStep: step })),
  })),
);
