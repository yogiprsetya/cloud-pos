'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { FC, ReactNode } from 'react';
import { UploadImage } from '~/components/pattern/UploadImage';
import { Textarea } from '~/components/ui/textarea';
import { useProduct } from '~/services/use-product';

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

enum FormStepEnum {
  Main = 'Main',
  Image = 'Image',
}

type Props = {
  trigger: ReactNode;
  initData?: Product;
  initStep?: FormStepEnum;
  onCreate: ReturnType<typeof useProduct>['initNewProduct'];
  onSetImage: ReturnType<typeof useProduct>['setProductImage'];
};

const Main: FC<Pick<Props, 'onCreate' | 'initData'>> = ({ initData, onCreate }) => {
  const form = useForm<z.infer<typeof baseForm>>({
    resolver: zodResolver(baseForm),
    defaultValues: initData
      ? {
          name: initData.name,
          price: initData.price,
          description: initData.description,
        }
      : {
          name: '',
          price: 0,
          description: '',
        },
  });

  const onSubmit = (values: z.infer<typeof baseForm>) => {
    onCreate({ name: values.name, description: values.description, price: values.price });
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
          render={({ field }) => <UploadImage label="Image" existingImageUrl={field.value} />}
        />
      </form>
    </Form>
  );
};

export const ManageProduct: FC<Props> = ({
  trigger,
  initData,
  initStep = FormStepEnum.Main,
  onCreate,
  onSetImage,
}) => {
  // const [step, setStep] = useState<FormStepEnum>(initStep);

  const RenderForm = {
    Main: <Main onCreate={onCreate} initData={initData} />,
    Image: <ProductImage onSetImage={onSetImage} initData={initData} />,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

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
