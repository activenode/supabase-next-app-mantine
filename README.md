# The (multi-tenant) Supabase + Mantine v6 + NextJS App Directory Template

tl;dr: If you clone this and follow the instructions you have the basis for a
NextJS `/app`-based Supabase project which allows you to have multi-tenant services.

## What does multi-tenant mean?

Multi-Tenant means: E.g. you build a blogging software. Now you want 3 users to be able to go to
yourbloggingservice.com/blog_id/createPost .

The blog

## What if I don't want multi-tenant but a simple login system?

### Option 1: The future-safe

1. You automatically have single-tenant when everyone is assigned to the same tenant (host)

### Option 2: The simplified

1. Remove the tenant access check in `m/[host_id]/layout.tsx`
1. Move the files within `[host_id]` one level up such that you can remove `[host_id]` directory as it will be empty
1. Set `NEXT_PUBLIC_AFTER_LOGIN_PATH=/m/settings` in your `.env.local`

## How to setup?

### Step 1

Create an `.env.local` file with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-subabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SK=your-secret-key

NEXT_PUBLIC_AFTER_SIGNOUT_PATH=/login
NEXT_PUBLIC_AFTER_LOGIN_PATH=/m/1/settings
NEXT_PUBLIC_DOORPATH=/login/door
NEXT_PUBLIC_LOGIN_TENANT_PATH=/m

NEXT_PUBLIC_HOST=localhost
NEXT_PUBLIC_PROTOCOL_PREFIX=http://
NEXT_PUBLIC_HOST_PORT=3000
```

### Step 2

Execute the contents of `base.sql` within your SQL Console of Supabase

### Step 3

Create yourself as a user in your supabase project

### Step 4

Create a new `host_user` (e.g. in the Supabase UI) by creating a row in `r_host_users` and referencing the existing host and your auth user.

### Step 5

Run `npm run dev` and see that a login appears. You should be able to login and use it now.
