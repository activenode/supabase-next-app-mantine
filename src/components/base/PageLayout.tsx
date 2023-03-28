"use client";

import { AppShell, createStyles, Navbar, Text } from "@mantine/core";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useHeaderHeight } from "./LayoutHeader";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },
  link: {
    display: "block",
    padding: "0.8rem 1.1rem 0.8rem 1.35rem",
    textDecoration: "none",
    background: "white",
    marginBottom: 18,
    borderRadius: 12,
    boxShadow: "4px 4px 12px 0px rgba(0, 0, 0, 0.06)",
    color: "black",
  },
  linkActive: {
    background: theme.colors[theme.primaryColor][5],
    color: "white",
    boxShadow: "4px 4px 12px 0px rgba(129, 121, 121, 0.23125)",
  },
}));

const menuLinks: Array<{ label: string; href: string }> = [
  {
    label: "Home",
    href: "home",
  },
  {
    label: "Settings",
    href: "settings",
  },
];

export const PageLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { host_id: number };
}) => {
  const { classes, cx } = useStyles();
  const pathname = usePathname();
  const headerHeight = useHeaderHeight();
  const activeHref = pathname;
  const { host_id } = params;

  return (
    <AppShell
      navbar={
        <Navbar
          width={{ base: 300 }}
          sx={(theme) => {
            return {
              background: "#f9f9f9",
            };
          }}
        >
          <Navbar.Section>
            <Text ta="center" component="div" pt={headerHeight}>
              Some Title
            </Text>
          </Navbar.Section>
          <Navbar.Section p={20}>
            {menuLinks.map((link) => {
              const { label, href } = link;
              const actualPath = `${process.env.NEXT_PUBLIC_LOGIN_TENANT_PATH}/${host_id}/${href}`;

              console.log(actualPath);

              return (
                <a
                  className={cx([
                    classes.link,
                    { [classes.linkActive]: actualPath === activeHref },
                  ])}
                  href={actualPath}
                  key={label}
                >
                  {label}
                </a>
              );
            })}
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};
