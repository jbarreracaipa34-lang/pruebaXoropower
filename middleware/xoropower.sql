--
-- PostgreSQL database dump
--

\restrict EkKLf1lYY0xhMe761JjnULXExgDYWIKkLnURvciMppHjqOORIBn2gXrux1Z7LMP

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-17 15:09:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5003 (class 0 OID 25019)
-- Dependencies: 224
-- Data for Name: niveles_dificultad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.niveles_dificultad (id_nivel_dificultad, nombre, descripcion) FROM stdin;
1	Básico	Nivel inicial para principiantes
2	Intermedio	Para estudiantes con conocimientos previos
3	Avanzado	Nivel experto para maestros en formación
\.


--
-- TOC entry 5004 (class 0 OID 25031)
-- Dependencies: 225
-- Data for Name: modulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modulos (id_modulo, id_nivel_dificultad, titulo, descripcion, orden, modulo_pre_requisito, timestamp_creacion, timestamp_actualizacion) FROM stdin;
1c269621-d51b-4589-9727-0c4ad53715da	1	Ritmo Básico: El Pulso	Aprende a seguir el compás y coordinar ambas manos con el ejercicio de escala.	1	\N	2026-05-13 17:47:42.692773-05	2026-05-13 17:47:42.692773-05
\.


--
-- TOC entry 5006 (class 0 OID 25258)
-- Dependencies: 227
-- Data for Name: secciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.secciones (id_seccion, modulo_id, nivel, titulo, descripcion, orden, timestamp_creacion) FROM stdin;
08803abd-1826-47bf-b7ae-14a7f26b1235	1c269621-d51b-4589-9727-0c4ad53715da	basico	Iniciación al Ritmo	Domina el agarre básico y aprende a seguir el pulso musical.	1	2026-05-13 17:47:42.709739-05
\.


--
-- TOC entry 5007 (class 0 OID 25280)
-- Dependencies: 228
-- Data for Name: actividades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.actividades (id_actividad, seccion_id, tipo, titulo, texto_cuerpo, url_video, orden, timestamp_creacion) FROM stdin;
d016a960-e5f1-4a89-949b-7f086423d957	08803abd-1826-47bf-b7ae-14a7f26b1235	ejercicio	Iniciación al Ritmo	Domina el agarre básico y aprende a seguir el pulso musical.	\N	2	2026-05-13 17:47:42.717023-05
519d5e12-88eb-4f1a-9532-2e5c0bd3affe	08803abd-1826-47bf-b7ae-14a7f26b1235	ejercicio	Iniciación al Ritmo	Domina el agarre básico y aprende a seguir el pulso musical.	\N	3	2026-05-13 17:47:42.717023-05
fae4ed9d-2216-4a79-961f-b8115af45c34	08803abd-1826-47bf-b7ae-14a7f26b1235	ejercicio	Iniciación al Ritmo	Domina el agarre básico y aprende a seguir el pulso musical.	\N	1	2026-05-13 17:47:42.717023-05
\.


--
-- TOC entry 5001 (class 0 OID 24986)
-- Dependencies: 222
-- Data for Name: avatares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.avatares (id_avatar, nombre, url_imagen) FROM stdin;
5	Juanda	🤠
42	Admin Principal	🤠
43	prueba	🤠
\.


--
-- TOC entry 5008 (class 0 OID 25339)
-- Dependencies: 229
-- Data for Name: ejercicios_ritmo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ejercicios_ritmo (id, titulo, descripcion, nivel, tempo_bpm, secuencia_notas, fecha_creacion, video_url, paso_a_paso) FROM stdin;
7ab3c673-201a-45b6-85a3-e1c813b8fef4	Ejercicio: Manos Juntas	Pon a prueba tu coordinacion. Sigue el pulso visual y presiona los botones en el momento exacto para dominar la base de la maraca.	basico	80	"[{\\"ms\\":750,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":750,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1500,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":2250,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":2250,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3000,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3000,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3750,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3750,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":4500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":4500,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":5250,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":5250,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":6000,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":6000,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":6750,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":6750,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":7500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":7500,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":8250,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":8250,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":9000,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":9000,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":9750,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":9750,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":10500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":10500,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":11250,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":11250,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":12000,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":12000,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"}]"	2026-06-08 19:01:41.137215	raw:joropo	Manten la sujecion correcta en ambas manos.\nObserva la linea de tiempo (el pulso musical).\nSincroniza tu movimiento con la llegada de las notas.
a1b2c3d4-e5f6-7890-abcd-ef1234567890	Ejercicio: Mano Derecha	Practica el ritmo solo con la mano derecha. Sigue las notas rojas del pentagrama superior.	basico	80	"[{\\"ms\\":750,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":2250,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3000,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3750,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":4500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":5250,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":6000,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"}]"	2026-06-08 18:12:37.250163	raw:derechaa	Sujeta la maraca con la mano derecha de forma firme y relajada.\nObserva las notas rojas en el pentagrama superior (D).\nPresiona el botón DERECHO cuando la nota cruce la línea de tiempo.
b2c3d4e5-f6a7-8901-bcde-f23456789012	Ejercicio: Mano Izquierda	Practica el ritmo solo con la mano izquierda. Sigue las notas azules del pentagrama inferior.	basico	80	[{"ms": 750, "mano": "izquierda", "color": "azul", "texto": "arriba"}, {"ms": 1500, "mano": "izquierda", "color": "azul", "texto": "abajo"}, {"ms": 2250, "mano": "izquierda", "color": "azul", "texto": "arriba"}, {"ms": 3000, "mano": "izquierda", "color": "azul", "texto": "abajo"}, {"ms": 3750, "mano": "izquierda", "color": "azul", "texto": "arriba"}, {"ms": 4500, "mano": "izquierda", "color": "azul", "texto": "abajo"}, {"ms": 5250, "mano": "izquierda", "color": "azul", "texto": "arriba"}, {"ms": 6000, "mano": "izquierda", "color": "azul", "texto": "abajo"}]	2026-06-08 18:12:37.256773	raw:izquierdaa	Sujeta la maraca con la mano izquierda de forma natural.\nObserva las notas azules en el pentagrama inferior (I).\nPresiona el botón IZQUIERDO cuando la nota cruce la línea de tiempo.
9688c607-fba6-4c57-82b0-af71debfb028	Síncopa Intermedia	Aprende a golpear a contratiempo alternando derecha e izquierda a 120 BPM.	intermedio	120	"[{\\"ms\\":100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":350,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":850,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1350,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1850,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":2100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":2350,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":2600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":2850,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3350,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3850,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":4100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":4350,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":4600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":4850,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":5100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":5350,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":5600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":5850,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":6100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":6350,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":6600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":6850,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":7100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":7350,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":7600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":7850,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"}]"	2026-06-15 23:49:05.00467	raw:ejerciciointermedio1	1. Asegúrate de tocar a contratiempo cuando veas notas desplazadas.\n2. Alterna golpes rápidos según aparezcan las semicorcheas.\n3. Usa los botones IZQ y DER coordinando ambas manos a 120 BPM.
11568db6-ce60-4129-8ed5-49d8aec64058	Semicorcheas Rápidas	Ejercita la velocidad alternando golpes rápidos en semicorcheas a 120 BPM.	intermedio	120	"[{\\"ms\\":100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ACENTO!\\"},{\\"ms\\":225,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":350,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":475,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ACENTO!\\"},{\\"ms\\":725,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":850,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":975,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ACENTO!\\"},{\\"ms\\":1225,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1350,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1475,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ACENTO!\\"},{\\"ms\\":1725,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1850,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1975,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":2100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ACENTO!\\"},{\\"ms\\":2225,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":2350,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":2475,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":2600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ACENTO!\\"},{\\"ms\\":2725,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":2850,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":2975,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ACENTO!\\"},{\\"ms\\":3225,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3350,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3475,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3600,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ACENTO!\\"},{\\"ms\\":3725,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3850,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3975,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"}]"	2026-06-15 23:49:05.015798	raw:ejercicio2int	1. Asegúrate de tocar a contratiempo cuando veas notas desplazadas.\n2. Alterna golpes rápidos según aparezcan las semicorcheas.\n3. Usa los botones IZQ y DER coordinando ambas manos a 120 BPM.
8d7b25a6-9c90-461c-be9f-395f5e85c0c4	Polirritmo 4 vs 3	Toca 4 negras con la mano derecha y 3 negras con la izquierda al mismo tiempo.	intermedio	100	"[{\\"ms\\":100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":700,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":1300,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":1900,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":2500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":3100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":3700,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":4300,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":4900,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":5500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":6100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":6700,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":7300,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":7900,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":8500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":9100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"4/4\\"},{\\"ms\\":100,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":900,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":1700,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":2500,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":3300,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":4100,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":4900,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":5700,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":6500,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":7300,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":8100,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"},{\\"ms\\":8900,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"3/4\\"}]"	2026-06-15 23:49:05.017699	raw:ejercicio3int	1. Asegúrate de tocar a contratiempo cuando veas notas desplazadas.\n2. Alterna golpes rápidos según aparezcan las semicorcheas.\n3. Usa los botones IZQ y DER coordinando ambas manos a 120 BPM.
60865bf6-415f-4dc1-b955-dda485891532	Joropo Llanero (3+3+2)	Domina el patrón base del joropo con la acentuación clásica llanera a 140 BPM.	avanzado	140	"[{\\"ms\\":100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ESCOBILLAO!\\"},{\\"ms\\":742,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1384,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1812,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ESCOBILLAO!\\"},{\\"ms\\":2454,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3096,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3524,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ESCOBILLAO!\\"},{\\"ms\\":4166,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":4808,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":5236,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡ESCOBILLAO!\\"},{\\"ms\\":5878,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":6520,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"}]"	2026-06-15 23:49:05.019811	raw:ejercicio1avan	1. Sigue el patrón de acentuación clásico del Joropo Llanero (3+3+2).\n2. Mantén la concentración en los silencios e irregularidades.\n3. Ejecuta con precisión y velocidad a 140 BPM.
646c2a6c-cabb-4e90-a9d5-699f03157776	Ritmo Irregular	Pon a prueba tu agilidad con contratiempos, dobles golpes y silencios a 140 BPM.	avanzado	140	"[{\\"ms\\":100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡FUERTE!\\"},{\\"ms\\":742,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":956,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1170,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1384,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":1584,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":1812,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡FUERTE!\\"},{\\"ms\\":2454,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":2668,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":2882,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3096,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":3296,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":3524,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡FUERTE!\\"},{\\"ms\\":4166,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":4380,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":4594,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":4808,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":5008,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":5236,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"¡FUERTE!\\"},{\\"ms\\":5878,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":6092,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":6306,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":6520,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"abajo\\"},{\\"ms\\":6720,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"}]"	2026-06-15 23:49:05.021054	raw:ejercicio2avan	1. Sigue el patrón de acentuación clásico del Joropo Llanero (3+3+2).\n2. Mantén la concentración en los silencios e irregularidades.\n3. Ejecuta con precisión y velocidad a 140 BPM.
9ddd9706-a284-4d97-a1bd-2fcb6505f7ca	Ostinato y Variación	Mantén un pulso constante con la mano derecha mientras la izquierda hace variaciones.	avanzado	100	"[{\\"ms\\":100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":700,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":1300,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":1900,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":400,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"contra\\"},{\\"ms\\":1000,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"contra\\"},{\\"ms\\":1600,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"contra\\"},{\\"ms\\":2200,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"contra\\"},{\\"ms\\":2500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":3100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":3700,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":4300,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":2800,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"doble\\"},{\\"ms\\":2950,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":4000,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"doble\\"},{\\"ms\\":4150,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"arriba\\"},{\\"ms\\":4900,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":5500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":6100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":6700,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":4900,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"tres\\"},{\\"ms\\":5300,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"si\\"},{\\"ms\\":5700,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"llo\\"},{\\"ms\\":7300,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":7900,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":8500,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":9100,\\"mano\\":\\"derecha\\",\\"color\\":\\"rojo\\",\\"texto\\":\\"pulso\\"},{\\"ms\\":7300,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"¡RÁPIDO!\\"},{\\"ms\\":7600,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"¡RÁPIDO!\\"},{\\"ms\\":7900,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"¡RÁPIDO!\\"},{\\"ms\\":8200,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"¡RÁPIDO!\\"},{\\"ms\\":8500,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"¡RÁPIDO!\\"},{\\"ms\\":8800,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"¡RÁPIDO!\\"},{\\"ms\\":9100,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"¡RÁPIDO!\\"},{\\"ms\\":9400,\\"mano\\":\\"izquierda\\",\\"color\\":\\"azul\\",\\"texto\\":\\"¡RÁPIDO!\\"}]"	2026-06-15 23:49:05.02226	raw:ejercicio3avan	1. Mantén un pulso constante con la mano derecha.\n2. Deja que la mano izquierda fluya en su propia métrica o variación.\n3. Escucha la superposición de ambos ritmos.
\.


--
-- TOC entry 4999 (class 0 OID 24968)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, email, nombre_usuario, password_hash, timestamp_registro, timestamp_ultimo_acceso, rol) FROM stdin;
f1b1a574-9131-4b2e-a813-299433bee39a	prueba@gmail.com	prueba	$2a$10$5hqpbXKl.k5RBu6SgH1/V.EEMc64kI5q.FFP169/Exf8wadEs3qBq	2026-06-16 15:53:22.202316-05	2026-06-16 15:57:29.462131-05	estudiante
eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	juda.ortiz@gmail.com	Juanda	$2a$10$EPAvn80T8Mw4utkJI0iT3usH9Au3J.Fzt2j14V8B1IFsfLVlZTX3u	2026-05-30 22:20:43.415407-05	2026-06-17 11:09:24.318707-05	estudiante
f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	admin@xoropower.com	Admin Principal	$2a$10$X6RAeP5BeZtu.UKCI79pde8oFxuhnHlaLfGVaPAU1FpQGF1EiTF8m	2026-05-30 23:12:42.690743-05	2026-06-17 11:26:35.288328-05	admin
\.


--
-- TOC entry 5010 (class 0 OID 33469)
-- Dependencies: 231
-- Data for Name: historial_precision; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historial_precision (id, id_usuario, id_ejercicio, precision_porcentaje, aciertos, fallos, perdidos, fecha) FROM stdin;
\.


--
-- TOC entry 5005 (class 0 OID 25193)
-- Dependencies: 226
-- Data for Name: progreso_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.progreso_usuario (id_progreso, id_usuario, id_ejercicio, id_leccion, id_modulo, completado, puntuacion_mas_alta, porcentaje_avance, veces_intentado, timestamp_ultimo_intento, timestamp_completado) FROM stdin;
43a028a4-47b5-471e-9090-1e8b9da67dcf	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	9688c607-fba6-4c57-82b0-af71debfb028	\N	\N	t	100	100.00	2	2026-06-17 11:10:54.014668-05	2026-06-17 11:10:54.014668-05
4246bf35-5072-4cd9-bb86-77f7b0986d2a	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	11568db6-ce60-4129-8ed5-49d8aec64058	\N	\N	t	100	100.00	1	2026-06-17 11:16:24.156881-05	\N
69a1765e-538f-4a85-8b03-926125196ae1	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	8d7b25a6-9c90-461c-be9f-395f5e85c0c4	\N	\N	t	92	92.00	1	2026-06-17 11:16:51.662269-05	\N
0d66910e-24f5-4810-9d5f-f9371761bae6	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	60865bf6-415f-4dc1-b955-dda485891532	\N	\N	t	100	100.00	1	2026-06-17 11:17:11.593217-05	\N
a4fd327e-3bc1-421d-8fdb-cb1c5cdabef5	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	646c2a6c-cabb-4e90-a9d5-699f03157776	\N	\N	t	100	100.00	1	2026-06-17 11:17:27.536665-05	\N
eb714c44-2773-476d-a750-a4b5c5e30e6c	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	9ddd9706-a284-4d97-a1bd-2fcb6505f7ca	\N	\N	t	100	100.00	1	2026-06-17 11:17:55.006582-05	\N
fd88a7c9-9725-460c-983a-2e2c38a6a719	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	b2c3d4e5-f6a7-8901-bcde-f23456789012	\N	\N	t	100	100.00	1	2026-06-08 18:46:48.354368-05	\N
048fef2b-0cd6-4671-bc5f-77a93ae76956	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	7ab3c673-201a-45b6-85a3-e1c813b8fef4	\N	\N	t	100	100.00	2	2026-06-08 19:10:30.021848-05	2026-06-08 19:10:30.021848-05
42720437-d935-4851-8ed2-8472395562f2	f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	00000000-0000-0000-0000-000000000040	\N	\N	t	90	90.00	1	2026-06-08 19:24:26.295528-05	\N
78dc7369-cbd1-4f1f-9e03-10e30f14a0c7	f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	7ab3c673-201a-45b6-85a3-e1c813b8fef4	\N	\N	f	0	0.00	2	2026-06-08 23:13:51.384428-05	\N
56a4d8aa-bb1c-494e-9fb5-199ac2879c38	f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	00000000-0000-0000-0000-000000000050	\N	\N	f	0	0.00	2	2026-06-09 15:08:38.258338-05	\N
49e58f3a-3d1a-430e-b0e2-39513d1b8df7	f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	00000000-0000-0000-0000-000000000070	\N	\N	f	0	0.00	2	2026-06-09 15:09:16.320345-05	\N
72614371-05f8-46e8-9c15-fb93513ce925	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	a1b2c3d4-e5f6-7890-abcd-ef1234567890	\N	\N	t	100	100.00	3	2026-06-16 16:19:05.120056-05	2026-06-08 18:46:31.031117-05
c52f138d-fbb7-434f-a28a-f11bd2d32c64	f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	11568db6-ce60-4129-8ed5-49d8aec64058	\N	\N	f	0	0.00	2	2026-06-16 16:21:40.218767-05	\N
6065b481-99fc-47e0-b082-e2013227cd2b	f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	646c2a6c-cabb-4e90-a9d5-699f03157776	\N	\N	f	0	0.00	1	2026-06-16 16:22:10.416784-05	\N
b8897d56-0567-41e0-a58e-a949a6c860cd	f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	a1b2c3d4-e5f6-7890-abcd-ef1234567890	\N	\N	f	0	0.00	3	2026-06-17 08:22:05.925413-05	\N
\.


--
-- TOC entry 5009 (class 0 OID 33452)
-- Dependencies: 230
-- Data for Name: rachas_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rachas_usuario (id, id_usuario, racha_actual, racha_maxima, ultima_fecha) FROM stdin;
75418e66-c019-47d8-8297-7733392755dd	f8a0d0f1-d7ea-4ed3-afeb-3b0c01ce0676	2	2	2026-06-17
e12dde8c-f1da-4a04-90cb-87d0430b7a84	eaf34dc7-fae8-477c-ad0b-4d9d16f94d5f	2	2	2026-06-17
\.


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 221
-- Name: avatares_id_avatar_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.avatares_id_avatar_seq', 43, true);


--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 223
-- Name: niveles_dificultad_id_nivel_dificultad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.niveles_dificultad_id_nivel_dificultad_seq', 3, true);


-- Completed on 2026-06-17 15:09:25

--
-- PostgreSQL database dump complete
--

\unrestrict EkKLf1lYY0xhMe761JjnULXExgDYWIKkLnURvciMppHjqOORIBn2gXrux1Z7LMP

