--
-- Name: r_host_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.r_host_users (
    id bigint PRIMARY KEY,
    host bigint NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE public.r_host_users OWNER TO postgres;

--
-- Name: r_host_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.r_host_users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.r_host_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: r_hosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.r_hosts (
    id bigint PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    host_slug text NOT NULL
);


ALTER TABLE public.r_hosts OWNER TO postgres;


CREATE TABLE public.r_posts (
    id bigint PRIMARY KEY,
    content text,
    title text,
    host bigint NOT NULL
);

ALTER TABLE public.r_posts OWNER TO postgres;

ALTER TABLE public.r_posts ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.r_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE public.r_hosts ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.r_recipe_host_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE public.r_hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.r_host_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select self" ON public.r_host_users FOR SELECT TO authenticated USING ((uuid = auth.uid()));
CREATE POLICY "select assigned hosts" ON public.r_hosts FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.r_host_users x WHERE x.host=id)
);

ALTER TABLE ONLY public.r_host_users
    ADD CONSTRAINT r_host_users_uuid_fkey FOREIGN KEY (uuid) REFERENCES auth.users(id);
ALTER TABLE ONLY public.r_host_users
    ADD CONSTRAINT r_host_users_host_fkey FOREIGN KEY (host) REFERENCES public.r_hosts(id);
ALTER TABLE ONLY public.r_posts
    ADD CONSTRAINT r_posts_host_fkey FOREIGN KEY (host) REFERENCES public.r_hosts(id);

INSERT INTO public.r_hosts (id, host_slug) VALUES (1, 'test-host');