--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: arquivo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arquivo (
    id_arquivo integer NOT NULL,
    nome text NOT NULL,
    mimetype text NOT NULL,
    tamanho integer NOT NULL,
    data_hora_insercao timestamp without time zone
);


ALTER TABLE public.arquivo OWNER TO postgres;

--
-- Name: arquivo_id_arquivo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.arquivo_id_arquivo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.arquivo_id_arquivo_seq OWNER TO postgres;

--
-- Name: arquivo_id_arquivo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.arquivo_id_arquivo_seq OWNED BY public.arquivo.id_arquivo;


--
-- Name: lead; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lead (
    id_lead integer NOT NULL,
    nome text NOT NULL,
    endereco text NOT NULL,
    cep text NOT NULL,
    cpf text NOT NULL,
    id_foto integer
);


ALTER TABLE public.lead OWNER TO postgres;

--
-- Name: lead_id_lead_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lead_id_lead_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lead_id_lead_seq OWNER TO postgres;

--
-- Name: lead_id_lead_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lead_id_lead_seq OWNED BY public.lead.id_lead;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nome text NOT NULL,
    login text NOT NULL,
    senha text NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- Name: arquivo id_arquivo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arquivo ALTER COLUMN id_arquivo SET DEFAULT nextval('public.arquivo_id_arquivo_seq'::regclass);


--
-- Name: lead id_lead; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lead ALTER COLUMN id_lead SET DEFAULT nextval('public.lead_id_lead_seq'::regclass);


--
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- Data for Name: arquivo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.arquivo (id_arquivo, nome, mimetype, tamanho, data_hora_insercao) FROM stdin;
\.


--
-- Data for Name: lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lead (id_lead, nome, endereco, cep, cpf, id_foto) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id_usuario, nome, login, senha) FROM stdin;
1	Desafio Node	desafio	e2b00f30f6c345973ce2d1029d2625776151e1bc246f9792f818778b405a4fdf
\.


--
-- Name: arquivo_id_arquivo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arquivo_id_arquivo_seq', 1, false);


--
-- Name: lead_id_lead_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lead_id_lead_seq', 1, false);


--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 1, true);


--
-- Name: arquivo arquivo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arquivo
    ADD CONSTRAINT arquivo_pkey PRIMARY KEY (id_arquivo);


--
-- Name: lead lead_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lead
    ADD CONSTRAINT lead_cpf_key UNIQUE (cpf);


--
-- Name: lead lead_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lead
    ADD CONSTRAINT lead_pkey PRIMARY KEY (id_lead);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: lead lead_id_foto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lead
    ADD CONSTRAINT lead_id_foto_fkey FOREIGN KEY (id_foto) REFERENCES public.arquivo(id_arquivo);


--
-- PostgreSQL database dump complete
--

