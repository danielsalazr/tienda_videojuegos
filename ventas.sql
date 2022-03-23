-- Table: public.ventas

-- DROP TABLE IF EXISTS public.ventas;

CREATE TABLE IF NOT EXISTS public.ventas
(
    fecha timestamp without time zone,
    cantidad numeric,
    titulo character varying COLLATE pg_catalog."default",
    precio_total numeric
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ventas
    OWNER to postgres;