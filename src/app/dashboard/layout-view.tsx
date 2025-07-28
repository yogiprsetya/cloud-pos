import { FC, ReactNode } from 'react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { If } from '~/components/ui/if';

type Props = {
  title: string;
  description: string;
  actionElement?: ReactNode;
  children: ReactNode;
};

export const LayoutView: FC<Props> = ({ title, description, actionElement, children }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>

      <If condition={actionElement}>
        <CardAction>{actionElement}</CardAction>
      </If>
    </CardHeader>

    <CardContent>{children}</CardContent>
  </Card>
);
