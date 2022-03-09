import { Card, Group, Skeleton } from "@mantine/core";
import { FC } from "react";

type Props = {
  amount: number;
};

export const CardSkeletons: FC<Props> = ({ amount }) => {
  return (
    <>
      {Array.from({ length: amount }, (x, i) => i).map((item) => (
        <Card shadow="sm" padding="lg" sx={{ width: "100%" }} key={item}>
          <Card.Section sx={{ padding: 20 }}>
            <Group align="center" mb="xl">
              <Skeleton height={50} circle />
              <Skeleton height={16} radius="xl" width="70%" />
            </Group>
            <Skeleton height={16} radius="xl" mb="xl" />
            <Skeleton height={16} mt={10} radius="xl" />
            <Skeleton height={16} mt={10} radius="xl" />
            <Skeleton height={16} mt={10} radius="xl" />
            <Skeleton height={16} mt={10} width="70%" radius="xl" />
          </Card.Section>
        </Card>
      ))}
    </>
  );
};
