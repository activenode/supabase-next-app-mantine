"use client";
import { getAbsoluteSelfUrl } from "@/utils/getAbsoluteSelfUrl";
import { useMagicLogin } from "@/utils/hooks/useLogin";
import { usePromiseFnWithLoadingState as usePromiseFnWithState } from "@/utils/hooks/usePromiseFnWithLoadingState";

import {
  Alert,
  Button,
  createStyles,
  Paper,
  rem,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMemo } from "react";

const useStyles = createStyles((theme) => ({
  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    width: "50%",
    paddingTop: rem(20),
    paddingBottom: rem(20),
    backdropFilter: "blur(20px)",
    boxShadow: "3px 0 10px 3px " + theme.fn.rgba("black", 0.3),

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export const Login = () => {
  const { classes } = useStyles();

  const [getMagicLink, isLoading, success] = usePromiseFnWithState(
    useMagicLogin(
      useMemo(
        () => ({
          emailRedirectTo: getAbsoluteSelfUrl(
            process.env.NEXT_PUBLIC_DOORPATH!
          ),
        }),
        []
      )
    )
  );

  const form = useForm({
    initialValues: {
      email: "",
    },
  });

  return (
    <>
      <Paper
        component="form"
        className={classes.form}
        radius={0}
        p={40}
        onSubmit={form.onSubmit(({ email }) => {
          getMagicLink(email);
        })}
      >
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Login
        </Title>

        <Stack>
          <TextInput
            label={"Email address"}
            placeholder="hello@your.mail"
            size="md"
            {...form.getInputProps("email")}
            disabled={isLoading}
          />
          {/* <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        /> */}

          <Button fullWidth size="md" loading={isLoading} type="submit">
            {"Get Magic Link"}
          </Button>

          {success && (
            <Alert variant="outline" color="green" ta="center">
              {"Magic Link was sent. Check your inbox."}
            </Alert>
          )}
        </Stack>

        {/* <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"a">
            href="#"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text> */}
      </Paper>
    </>
  );
};
