import { Card, Group, Skeleton } from "@mantine/core";
import { FC } from "react";

type Props = {
  amount: number;
  animate?: boolean;
};

export const CardSkeletons: FC<Props> = ({ amount, animate = true }) => {
  return (
    <>
      {Array.from({ length: amount }, (x, i) => i).map((item) => (
        <Card shadow="sm" padding="lg" sx={{ width: "100%" }} key={item}>
          <Card.Section sx={{ padding: 20 }}>
            <Group align="center" mb="xl">
              <Skeleton height={50} circle animate={animate} />
              <Skeleton height={16} radius="xl" width="70%" animate={animate} />
            </Group>
            <Skeleton height={16} radius="xl" mb="xl" animate={animate} />
            <Skeleton height={16} mt={10} radius="xl" animate={animate} />
            <Skeleton height={16} mt={10} radius="xl" animate={animate} />
            <Skeleton height={16} mt={10} radius="xl" animate={animate} />
            <Skeleton
              height={16}
              mt={10}
              width="70%"
              radius="xl"
              animate={animate}
            />
          </Card.Section>
        </Card>
      ))}
    </>
  );
};
