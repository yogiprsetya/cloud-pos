'use client';

import { Boxes } from 'lucide-react';
// import { ColumnDef } from '@tanstack/react-table';
// import { DataTable } from '~/components/pattern/DataTable';
import { Searchbar } from '~/components/pattern/Searchbar';
import { If } from '~/components/ui/if';
import { useProduct } from '~/services/use-product';

// type Stock = {
//   id: number;
//   sku: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// export const columns: ColumnDef<Stock>[] = [
//   {
//     header: 'SKU',
//     accessorKey: 'sku',
//   },
//   {
//     header: 'Name',
//     accessorKey: 'name',
//   },
//   {
//     header: 'Price',
//     accessorKey: 'price',
//   },
//   {
//     header: 'Quantity',
//     accessorKey: 'quantity',
//   },
// ];

export const ProductPortfolio = () => {
  const { data, setSearchKeyword } = useProduct();

  return (
    <>
      <div className="flex mb-6">
        <Searchbar className="w-72" onChange={setSearchKeyword} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {data?.data.map((product) => (
          <div key={product.id} className="rounded-md bg-white overflow-hidden border">
            <div className="min-h-40 w-full bg-muted flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <Boxes className="text-primary size-8" />
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>

              <If condition={product.description}>
                <p className="text-sm">{product.description}</p>
              </If>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
