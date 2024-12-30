import { FC, ReactNode } from 'react';
import { If } from '~/components/ui/if';
import { Text } from '~/components/ui/text';

type Props = {
  title: string;
  description: string;
  actionElement?: ReactNode;
  children: ReactNode;
};

export const LayoutView: FC<Props> = ({ title, description, actionElement, children }) => (
  <>
    <div className="flex mb-8 items-end justify-between">
      <header>
        <Text tag="h1" variant="heading-2">
          {title}
        </Text>

        <Text className="text-secondary-foreground">{description}</Text>
      </header>

      <If condition={actionElement}>
        <nav className="flex gap-2">{actionElement}</nav>
      </If>
    </div>

    {children}
  </>
);
