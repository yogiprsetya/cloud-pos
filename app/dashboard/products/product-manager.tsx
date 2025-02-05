'use client';

import { Button } from '~/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Product, ProductVariantItem, ProductVariantLabel } from '~/model/types/product';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { FC } from 'react';
import { UploadImage } from '~/components/pattern/UploadImage';
import { Textarea } from '~/components/ui/textarea';
import { useProduct } from '~/services/use-product';
import { Text } from '~/components/ui/text';
import { Plus } from 'lucide-react';
import { Collapsible } from '~/components/ui/collapsible';

type SchemaType = Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & {
  variant?: Array<
    Pick<ProductVariantLabel, 'name'> & {
      items: Pick<ProductVariantItem, 'name' | 'price'>[];
    }
  >;
};

const schema: z.ZodType<SchemaType> = z.object({
  description: z.string().min(1).nonempty(),
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(50),
  image: z.string().nonempty({ message: 'Please upload product image' }).url(),
  variant: z
    .array(
      z.object({
        name: z.string().min(2).max(100),
        items: z.array(
          z.object({
            name: z.string().min(2).max(100),
            price: z.number().min(1)
          })
        )
      })
    )
    .optional()
});

type Props = {
  initData?: Product;
};

export const ManageProduct: FC<Props> = ({ initData }) => {
  const { createNewProduct } = useProduct();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      image: ''
    }
  });

  const variantLabel = useFieldArray({
    control: form.control,
    name: 'variant'
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    createNewProduct(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="manage-product" className="space-y-4">
          <div className="grid grid-cols-2 gap-6 border bg-card text-card-foreground shadow-sm rounded-lg p-6">
            <Text tag="h1" variant="heading-4" className="col-span-2">
              Informasi Produk
            </Text>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>

                    <FormControl>
                      <Input placeholder="Product price" type="number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about this product"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <UploadImage label="Image" existingImageUrl={field.value} onUploaded={field.onChange} />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6 border bg-card text-card-foreground shadow-sm rounded-lg p-6">
            <Text tag="h1" variant="heading-4" className="col-span-2">
              Variant
            </Text>

            <div className="space-y-4">
              {variantLabel.fields.map((field, index) => (
                <Collapsible
                  label={
                    <FormField
                      control={form.control}
                      name={`variant.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input size={100} className="h-9" placeholder="Ex: size, color" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  }
                  key={field.id}
                >
                  <p>test</p>
                </Collapsible>
              ))}
            </div>

            <div className="flex">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  variantLabel.append({ name: '', items: [] });
                }}
              >
                <Plus className="size-4" /> Add variant
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className=" w-full -bottom-6 mt-6 flex justify-center left-0">
        <Button type="submit" form="manage-product">
          {initData ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>
    </>
  );
};
