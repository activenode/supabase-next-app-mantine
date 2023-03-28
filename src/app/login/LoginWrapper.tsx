"use client";

import { createStyles } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    minHeight: "100dvh",
    backgroundSize: "cover",
    backgroundImage: "url(/auth.avif)",
  },
}));

export const LoginWrapper = ({ children }: { children: ReactNode }) => {
  const { classes } = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};
