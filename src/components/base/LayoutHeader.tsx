"use client";
import { useStandardSpacing } from "@/config/style/spacing";
import { useLogout } from "@/utils/hooks/useLogout";
import {
  Box,
  Button,
  Group,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";

export const useHeaderHeight = () => {
  return 60;
};

export const LayoutHeader = ({ children }: { children?: ReactNode }) => {
  const height = useHeaderHeight();
  const standardSpacing = useStandardSpacing();
  const theme = useMantineTheme();
  const logout = useLogout();

  return (
    <>
      <Box
        h={height}
        pos="fixed"
        w="100vw"
        top={0}
        left={0}
        sx={(theme) => {
          return {
            backdropFilter: "blur(4px)",
            background: "white",
            borderBottom: `1px solid ${theme.colors.gray[1]}`,
          };
        }}
      >
        <Box pl="var(--mantine-navbar-width)" h="100%">
          <Group miw="100%" h="100%" px={standardSpacing}>
            <MantineProvider
              theme={{
                ...theme,
                components: {
                  Button: {
                    defaultProps: {
                      variant: "outline",
                    },
                  },
                },
              }}
            >
              <Box>{children}</Box>
            </MantineProvider>

            <Button
              variant="subtle"
              ml="auto"
              onClick={() => {
                logout().finally(() => {
                  console.log("logout");
                });
              }}
            >
              Logout
            </Button>
          </Group>
        </Box>
      </Box>
      <Box h={height} pb={20}></Box>
    </>
  );
};
