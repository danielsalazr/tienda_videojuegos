-- Table: public.desarrolladora

-- DROP TABLE IF EXISTS public.desarrolladora;

CREATE TABLE IF NOT EXISTS public.desarrolladora
(
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    descripcion character varying COLLATE pg_catalog."default",
    inicio numeric,
    nit numeric,
    CONSTRAINT desarrolladora_pkey PRIMARY KEY (nombre)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.desarrolladora
    OWNER to postgres;