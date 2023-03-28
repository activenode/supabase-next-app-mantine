import { useMantineTheme } from "@mantine/core";

export const useStandardSpacing = () => {
  const theme = useMantineTheme();

  return theme.spacing.md;
};
