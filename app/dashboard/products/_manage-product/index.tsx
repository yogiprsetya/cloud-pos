'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Product } from '~/model/types/product';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { FC } from 'react';
import { UploadImage } from '~/components/pattern/UploadImage';
import { Textarea } from '~/components/ui/textarea';
import { useProduct } from '~/services/use-product';
import { FormStepEnum, type DialogState } from './use-state';

const baseForm: z.ZodType<Pick<Product, 'name' | 'price' | 'description'>> = z.object({
  description: z.string(),
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(50),
});

const imageForm: z.ZodType<Pick<Product, 'image'>> = z.object({
  description: z.string(),
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(50),
  image: z.string().min(1).nonempty(),
});

type Props = DialogState & {
  initStep?: FormStepEnum;
  handleCreate: ReturnType<typeof useProduct>['initNewProduct'];
  onCreated: () => void;
  onSetImage: ReturnType<typeof useProduct>['setProductImage'];
};

const Main: FC<Pick<Props, 'handleCreate' | 'onCreated' | 'initData'>> = (props) => {
  const form = useForm<z.infer<typeof baseForm>>({
    resolver: zodResolver(baseForm),
    defaultValues: props.initData
      ? {
          name: props.initData.name,
          price: props.initData.price,
          description: props.initData.description,
        }
      : {
          name: '',
          price: 0,
          description: '',
        },
  });

  const onSubmit = (values: z.infer<typeof baseForm>) => {
    props.handleCreate({ name: values.name, description: values.description, price: values.price });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="product-form" className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center">
              <FormLabel className="text-right mr-4">Name</FormLabel>

              <FormControl>
                <Input placeholder="Product name" className="col-span-3" {...field} />
              </FormControl>

              <FormMessage className="col-span-3 col-end-5 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center">
              <FormLabel className="text-right mr-4">Price</FormLabel>

              <FormControl>
                <Input
                  placeholder="Product price"
                  type="number"
                  className="col-span-3"
                  {...field}
                />
              </FormControl>

              <FormMessage className="col-span-3 col-end-5 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4">
              <FormLabel className="text-right mr-4 mt-2">Description</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this product"
                  className="resize-none col-span-3"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>

              <FormMessage className="col-span-3 col-end-5 mt-1" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const ProductImage: FC<Pick<Props, 'initData' | 'onSetImage'>> = ({ initData, onSetImage }) => {
  const form = useForm<z.infer<typeof imageForm>>({
    resolver: zodResolver(imageForm),
    defaultValues: {
      image: '',
    },
  });

  const onSubmit = (values: z.infer<typeof imageForm>) => {
    if (initData?.id && values.image) {
      onSetImage(initData.id, values.image);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="product-form">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <UploadImage label="Image" existingImageUrl={field.value} onUploaded={field.onChange} />
          )}
        />
      </form>
    </Form>
  );
};

export const ManageProduct: FC<Omit<Props, 'onCreated' | 'setInitData' | 'setInitStep'>> = ({
  initData,
  initStep = FormStepEnum.Image,
  handleCreate,
  isOpen,
  toggleModal,
  onSetImage,
}) => {
  const RenderForm = {
    Main: (
      <Main
        handleCreate={handleCreate}
        // onCreated={() => setStep(FormStepEnum.Image)}
        initData={initData}
        onCreated={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    ),
    Image: <ProductImage onSetImage={onSetImage} initData={initData} />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>

          <DialogDescription>
            Fill in the form below to create a new product. <small>(1/3)</small>
          </DialogDescription>
        </DialogHeader>

        {RenderForm[initStep]}

        <DialogFooter>
          <Button type="submit" form="product-form">
            {initStep === FormStepEnum.Main ? 'Create Product' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
