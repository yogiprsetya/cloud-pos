'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/components/pattern/DataTable';
import { Searchbar } from '~/components/pattern/Searchbar';

type Stock = {
  id: number;
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

export const columns: ColumnDef<Stock>[] = [
  {
    header: 'SKU',
    accessorKey: 'sku',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
  },
];

export const ProductPortfolio = () => {
  return (
    <>
      <div className="flex mb-4">
        <Searchbar className="w-72" />
      </div>

      <DataTable columns={columns} data={[]} />
    </>
  );
};
