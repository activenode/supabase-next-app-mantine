export const getAbsoluteSelfUrl = (relativePath: string) => {
  const prefix = process.env.NEXT_PUBLIC_PROTOCOL_PREFIX;
  const host = process.env.NEXT_PUBLIC_HOST;
  const hostPort = process.env.NEXT_PUBLIC_HOST_PORT;

  return `${prefix}${host}${hostPort ? ":" + hostPort : ""}${relativePath}`;
};
