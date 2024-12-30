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
import { FC, ReactNode, useEffect, useState } from 'react';
import { UploadImage } from '~/components/pattern/UploadImage';
import { If } from '~/components/ui/if';
import { Textarea } from '~/components/ui/textarea';

const baseForm: z.ZodType<Pick<Product, 'name' | 'price' | 'description'>> = z.object({
  description: z.string(),
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(50),
});

const imageForm: z.ZodType<Pick<Product, 'image'>> = z.object({
  image: z.string(),
});

type FormType = {
  main: z.infer<typeof baseForm>;
  image: z.infer<typeof imageForm>;
};

const Schema = {
  main: baseForm,
  image: imageForm,
};

const DefaultValue = {
  main: {
    name: '',
    price: 0,
    description: '',
  },
  image: {
    image: '',
  },
};

type Props = {
  trigger: ReactNode;
  initData?: Product;
  initStep?: keyof FormType;
};

export const AddProduct: FC<Props> = ({ trigger, initData, initStep = 'main' }) => {
  const [step, setStep] = useState<keyof FormType>(initStep);

  const form = useForm<FormType[typeof step]>({
    resolver: zodResolver(Schema[step]),
    defaultValues: DefaultValue[step],
  });

  const onSubmit = (values: FormType[typeof step]) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (step === 'main') {
      setStep('image');
    }
  };

  useEffect(() => {
    if (!initData) return;

    if (initStep === 'main') {
      form.setValue('name', initData.name);
      form.setValue('price', initData.price);
      form.setValue('description', initData.description);
    }
  }, [form, initData, initStep]);

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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="product-form"
            className="grid gap-4 py-4"
          >
            <If condition={step === 'main'}>
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
            </If>

            <If condition={step === 'image'}>
              <UploadImage label="Image" />
            </If>
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" form="product-form">
            {step === 'main' ? 'Create Product' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
