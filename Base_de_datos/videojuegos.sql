-- Table: public.videojuegos

-- DROP TABLE IF EXISTS public.videojuegos;

CREATE TABLE IF NOT EXISTS public.videojuegos
(
    titulo character varying(50) COLLATE pg_catalog."default",
    stock numeric(1000,0),
    empresa character varying(30) COLLATE pg_catalog."default" NOT NULL,
    estreno timestamp without time zone,
    plataforma character varying(20) COLLATE pg_catalog."default",
    precio numeric,
    CONSTRAINT videojuegos_pkey PRIMARY KEY (titulo)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.videojuegos
    OWNER to postgres;