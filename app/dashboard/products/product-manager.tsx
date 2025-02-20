'use client';

import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { FC, useEffect } from 'react';
import { UploadImage } from '~/components/pattern/UploadImage';
import { Textarea } from '~/components/ui/textarea';
import { useProduct } from '~/services/use-product';
import { Text } from '~/components/ui/text';
import { Plus, PlusCircle, Trash } from 'lucide-react';
import { Collapsible } from '~/components/ui/collapsible';
import { ProductManagerType } from './model';
import { UseForms } from './use-forms';
import { cn } from '~/utils/css';
import { useFieldArray } from 'react-hook-form';
import { formatRp } from '~/utils/rupiah';
import { If } from '~/components/ui/if';
import { useProductId } from '~/services/use-product-id';

const MAX_ITEMS = 7;
const MAX_VARIANTS = 4;

type Props = {
  id?: string;
};

type VariantItemsFormProps = {
  itemIndex: number;
};

const VariantItemsForm: FC<VariantItemsFormProps> = ({ itemIndex }) => {
  const { formContext } = UseForms();

  const basePrice = formContext.watch('price');

  const item = useFieldArray({
    name: `variants.${itemIndex}.items`
  });

  return (
    <div className="flex gap-2 justify-end">
      <ul className="space-y-2 list-disc">
        {item.fields.map((field, index) => (
          <li key={field.id} className="flex gap-2">
            <FormField
              control={formContext.control}
              name={`variants.${itemIndex}.items.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <Input className="h-9" placeholder="variant, ex: red, XL" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formContext.control}
              name={`variants.${itemIndex}.items.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <Input className="h-9" type="number" placeholder="price of variant item" {...field} />

                  <If condition={basePrice && field.value && field.value < basePrice}>
                    <small className="text-warning">Warn: lower then base-price {formatRp(basePrice)}</small>
                  </If>

                  <FormMessage />
                </FormItem>
              )}
            />
          </li>
        ))}
      </ul>

      <Button
        variant="outline"
        size="icon"
        className="shrink-0 size-9"
        aria-label="add variant"
        disabled={item.fields.length >= MAX_ITEMS}
        onClick={() => item.append({ name: '', price: '' })}
      >
        <PlusCircle className="size-4" />
      </Button>
    </div>
  );
};

export const ManageProduct: FC<Props> = ({ id }) => {
  const { createNewProduct } = useProduct();
  const { form, variant } = UseForms();
  console.log('form', id);

  const { data, isLoading } = useProductId({ id });

  useEffect(() => {
    if (data) {
      console.log('data', data.data);

      form.reset(data.data);
    }
  }, [data, form]);

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (values: ProductManagerType) => {
    const { variants, ...value } = values;
    createNewProduct({ ...value, variants });
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

            <div className={cn('space-y-4', !variant.fields.length && 'hidden')}>
              {variant.fields.map((field, index) => (
                <Collapsible
                  key={field.id}
                  label={
                    <div className="flex items-center space-x-4 w-full">
                      <FormField
                        control={form.control}
                        name={`variants.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input className="h-9" placeholder="ex: size, color" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        size="icon"
                        variant="destructive"
                        className="shrink-0 size-9 border-0"
                        aria-label="delete variant"
                        onClick={() => variant.remove(index)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  }
                >
                  <VariantItemsForm itemIndex={index} />
                </Collapsible>
              ))}
            </div>

            <div className="flex">
              <Button
                size="sm"
                variant="outline"
                aria-label="add variant"
                disabled={variant.fields.length >= MAX_VARIANTS}
                onClick={() => variant.append({ name: '', items: [] })}
              >
                <Plus className="size-4" /> Add variant
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className=" w-full -bottom-6 mt-6 flex justify-center left-0">
        <Button type="submit" form="manage-product">
          {id ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>
    </>
  );
};
