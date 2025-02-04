'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar';
import { Home, Package2, GalleryVerticalEnd, ShoppingCart, Shirt } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { If } from '~/components/ui/if';

const productItems = [
  {
    title: 'Product',
    url: '/dashboard/products',
    icon: Shirt
  },
  {
    title: 'Stock',
    url: '/dashboard/stocks',
    icon: Package2
  }
];

const posItems = [
  {
    title: 'Point of Sale',
    url: '/dashboard/point-of-sale',
    icon: ShoppingCart
  }
];

const Groups = (props: { children: ReactNode; title?: string }) => (
  <SidebarGroup>
    <If condition={props.title}>
      <SidebarGroupLabel>{props.title}</SidebarGroupLabel>
    </If>

    <SidebarGroupContent>
      <SidebarMenu>{props.children}</SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

const Header = () => (
  <SidebarHeader className="flex flex-row">
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
      <GalleryVerticalEnd className="size-4" />
    </div>

    <div className="leading-none">
      <h1 className="font-semibold">UMKM Toolkit</h1>
      <p className="text-sm">Small business digital toolkit</p>
    </div>
  </SidebarHeader>
);

export const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <Header />

      <SidebarContent>
        <Groups>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
              <a href="/dashboard">
                <Home />
                <span>Home</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Groups>

        <Groups title="Sales">
          {posItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </Groups>

        <Groups title="Warehouses">
          {productItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </Groups>
      </SidebarContent>
    </Sidebar>
  );
};
