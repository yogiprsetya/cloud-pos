import { useFieldArray, useForm } from 'react-hook-form';
import { ProductManagerSchema, ProductManagerType } from './model';
import { zodResolver } from '@hookform/resolvers/zod';

export const UseForms = () => {
  const form = useForm<ProductManagerType>({
    resolver: zodResolver(ProductManagerSchema),
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

  return {
    variantLabel,
    form
  };
};
