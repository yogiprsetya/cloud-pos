'use client';

import { Searchbar } from '~/components/pattern/Searchbar';
import { Loading } from '~/components/ui/loading';
import { useProduct } from '~/services/use-product';
import { ProductCardMenu } from './product-card-menu';
import { If } from '~/components/ui/if';
import { FC, Fragment, useMemo } from 'react';
import { Product } from '~/model/types/product';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Card } from '~/components/ui/card';
import { Boxes } from 'lucide-react';
import { formatRp } from '~/utils/rupiah';

type Props = ReturnType<typeof useProduct>;

export const ProductPortfolio: FC<Props> = ({ isLoading, setSearchKeyword, data }) => {
  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Price', accessorKey: 'price' },
      { header: 'Stock', accessorKey: 'stock' },
      { header: 'Category', accessorKey: 'category' },
      {
        header: 'Menu',
        accessorKey: 'menu',
        cell: ({ row }) => <ProductCardMenu {...row.original} />
      }
    ],
    []
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <div className="flex mb-6">
        <Searchbar className="w-72" onChange={setSearchKeyword} />
      </div>

      {isLoading ? (
        <Loading className="size-6 mx-auto" />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <If
            condition={table.getRowModel().rows?.length}
            fallback="Data product is empty, please create."
          >
            {table.getRowModel().rows.map((row) => {
              const cellMenu = row.getVisibleCells().find((cell) => cell.column.id === 'menu');
              const menuEl = cellMenu
                ? flexRender(cellMenu.column.columnDef.cell, cellMenu.getContext())
                : null;

              return (
                <Card key={row.original.id} className="overflow-hidden">
                  <div className="h-40 w-full bg-secondary flex items-center justify-center">
                    {row.original.image ? (
                      <img
                        src={row.original.image}
                        alt={row.original.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Boxes className="text-primary size-8" />
                    )}
                  </div>

                  <div className="p-4 h-full">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{row.original.name}</h3>
                      {menuEl}
                    </div>

                    <p className="text-xs">{formatRp(row.original.price)}</p>

                    <If condition={row.original.description}>
                      <p className="text-sm mt-2">{row.original.description}</p>
                    </If>
                  </div>
                </Card>
              );
            })}
          </If>
        </div>
      )}
    </>
  );
};
