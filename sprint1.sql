PGDMP     /                	    z           qap1    14.5    14.5 #               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24576    qap1    DATABASE     O   CREATE DATABASE qap1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE qap1;
                postgres    false                        0    0    DATABASE qap1    COMMENT     4   COMMENT ON DATABASE qap1 IS 'Database for QAP 1. ';
                   postgres    false    3615                        2615    24577    qap1    SCHEMA        CREATE SCHEMA qap1;
    DROP SCHEMA qap1;
                postgres    false            !           0    0    SCHEMA qap1    COMMENT     -   COMMENT ON SCHEMA qap1 IS 'Schema for QAP1';
                   postgres    false    5            �            1259    32876 	   aircrafts    TABLE     z   CREATE TABLE qap1.aircrafts (
    id bigint NOT NULL,
    type text,
    airline_name text,
    number_passengers text
);
    DROP TABLE qap1.aircrafts;
       qap1         heap    postgres    false    5            "           0    0    TABLE aircrafts    COMMENT     9   COMMENT ON TABLE qap1.aircrafts IS 'Table of Aircrafts';
          qap1          postgres    false    212            �            1259    32883    aircrafts_airports    TABLE     p   CREATE TABLE qap1.aircrafts_airports (
    id bigint NOT NULL,
    aircraft_id bigint,
    airport_id bigint
);
 $   DROP TABLE qap1.aircrafts_airports;
       qap1         heap    postgres    false    5            #           0    0    TABLE aircrafts_airports    COMMENT     O   COMMENT ON TABLE qap1.aircrafts_airports IS 'Table of Aircrafts and Airports';
          qap1          postgres    false    213            �            1259    24715    airports    TABLE     �   CREATE TABLE qap1.airports (
    id bigint NOT NULL,
    airport_name text,
    code character varying(3),
    city_id bigint
);
    DROP TABLE qap1.airports;
       qap1         heap    postgres    false    5            $           0    0    TABLE airports    COMMENT     7   COMMENT ON TABLE qap1.airports IS 'Table of Airports';
          qap1          postgres    false    211            �            1259    24578    cities    TABLE     p   CREATE TABLE qap1.cities (
    id bigint NOT NULL,
    city_name text,
    country text,
    population text
);
    DROP TABLE qap1.cities;
       qap1         heap    postgres    false    5            %           0    0    TABLE cities    COMMENT     3   COMMENT ON TABLE qap1.cities IS 'Table of Cities';
          qap1          postgres    false    210            �            1259    32896 
   passengers    TABLE     �   CREATE TABLE qap1.passengers (
    id bigint NOT NULL,
    first_name text,
    last_name text,
    phone_number character varying(11)
);
    DROP TABLE qap1.passengers;
       qap1         heap    postgres    false    5            &           0    0    TABLE passengers    COMMENT     ;   COMMENT ON TABLE qap1.passengers IS 'Table of Passengers';
          qap1          postgres    false    214            �            1259    32903    passengers_aircrafts    TABLE     t   CREATE TABLE qap1.passengers_aircrafts (
    id bigint NOT NULL,
    passenger_id bigint,
    aircraft_id bigint
);
 &   DROP TABLE qap1.passengers_aircrafts;
       qap1         heap    postgres    false    5            '           0    0    TABLE passengers_aircrafts    COMMENT     S   COMMENT ON TABLE qap1.passengers_aircrafts IS 'Table of Passengers and Aircrafts';
          qap1          postgres    false    215                      0    32876 	   aircrafts 
   TABLE DATA           L   COPY qap1.aircrafts (id, type, airline_name, number_passengers) FROM stdin;
    qap1          postgres    false    212   9#                 0    32883    aircrafts_airports 
   TABLE DATA           G   COPY qap1.aircrafts_airports (id, aircraft_id, airport_id) FROM stdin;
    qap1          postgres    false    213   �#                 0    24715    airports 
   TABLE DATA           A   COPY qap1.airports (id, airport_name, code, city_id) FROM stdin;
    qap1          postgres    false    211   �$                 0    24578    cities 
   TABLE DATA           B   COPY qap1.cities (id, city_name, country, population) FROM stdin;
    qap1          postgres    false    210   S%                 0    32896 
   passengers 
   TABLE DATA           K   COPY qap1.passengers (id, first_name, last_name, phone_number) FROM stdin;
    qap1          postgres    false    214   �%                 0    32903    passengers_aircrafts 
   TABLE DATA           K   COPY qap1.passengers_aircrafts (id, passenger_id, aircraft_id) FROM stdin;
    qap1          postgres    false    215   �'                  2606    32882    aircrafts aircrafts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY qap1.aircrafts
    ADD CONSTRAINT aircrafts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY qap1.aircrafts DROP CONSTRAINT aircrafts_pkey;
       qap1            postgres    false    212            }           2606    24721    airports airports_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY qap1.airports
    ADD CONSTRAINT airports_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY qap1.airports DROP CONSTRAINT airports_pkey;
       qap1            postgres    false    211            {           2606    24582    cities city_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY qap1.cities
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY qap1.cities DROP CONSTRAINT city_pkey;
       qap1            postgres    false    210            �           2606    32907 .   passengers_aircrafts passengers_aircrafts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY qap1.passengers_aircrafts
    ADD CONSTRAINT passengers_aircrafts_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY qap1.passengers_aircrafts DROP CONSTRAINT passengers_aircrafts_pkey;
       qap1            postgres    false    215            �           2606    32902    passengers passengers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY qap1.passengers
    ADD CONSTRAINT passengers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY qap1.passengers DROP CONSTRAINT passengers_pkey;
       qap1            postgres    false    214            �           2606    32886    aircrafts_airports aircrafts_id    FK CONSTRAINT     �   ALTER TABLE ONLY qap1.aircrafts_airports
    ADD CONSTRAINT aircrafts_id FOREIGN KEY (aircraft_id) REFERENCES qap1.aircrafts(id);
 G   ALTER TABLE ONLY qap1.aircrafts_airports DROP CONSTRAINT aircrafts_id;
       qap1          postgres    false    213    3455    212            �           2606    32913 !   passengers_aircrafts aircrafts_id    FK CONSTRAINT     �   ALTER TABLE ONLY qap1.passengers_aircrafts
    ADD CONSTRAINT aircrafts_id FOREIGN KEY (aircraft_id) REFERENCES qap1.aircrafts(id);
 I   ALTER TABLE ONLY qap1.passengers_aircrafts DROP CONSTRAINT aircrafts_id;
       qap1          postgres    false    212    215    3455            �           2606    32891    aircrafts_airports airports_id    FK CONSTRAINT        ALTER TABLE ONLY qap1.aircrafts_airports
    ADD CONSTRAINT airports_id FOREIGN KEY (airport_id) REFERENCES qap1.airports(id);
 F   ALTER TABLE ONLY qap1.aircrafts_airports DROP CONSTRAINT airports_id;
       qap1          postgres    false    211    213    3453            �           2606    24722    airports cities_id    FK CONSTRAINT     n   ALTER TABLE ONLY qap1.airports
    ADD CONSTRAINT cities_id FOREIGN KEY (city_id) REFERENCES qap1.cities(id);
 :   ALTER TABLE ONLY qap1.airports DROP CONSTRAINT cities_id;
       qap1          postgres    false    3451    211    210            �           2606    32908 "   passengers_aircrafts passengers_id    FK CONSTRAINT     �   ALTER TABLE ONLY qap1.passengers_aircrafts
    ADD CONSTRAINT passengers_id FOREIGN KEY (passenger_id) REFERENCES qap1.passengers(id);
 J   ALTER TABLE ONLY qap1.passengers_aircrafts DROP CONSTRAINT passengers_id;
       qap1          postgres    false    3457    214    215               �   x�e���0�继���^��0���rF�M�cx{]����OB���E�]M���7�no#ePA��|D�'ЕE�����v�Ra� K����w�}��d��ɿ<ۅk�z_��
)oKr��/<�՘N;�/4x��(e��X��g4J����ӻR�{�c��az� �"�ee         �   x�%��C1Ϩ��C6�������r�2B��1d405�az�ХttУ�n��A>Ji�|�("��TH��67�y �76���O`�q�dwx��A$���7�k�.J����Evq4����f����G�ý"         �   x�u��
�@������
"�����b�Bm̀Cu&�#��7��6m���!��,��W�3�iC�4�dȃ��&���#��uv��,}�!���Z^�P1R�Z����T��V�O��$�V8�,RX��O\�������.8kG����Y���p�_���ғ�X\fB�7��T�         y   x�5�1
�@���)r�!�Nvݤ�*j!jg3!`ؑ���D�^�����=�YS�a�������iQ8���P�sm�����֊M��CJ���p�j+��^�"�襮w[� p����Z"� �� �         �  x�%��n�0���������6C�%HV�C��a"�"K����ۏ�]�H�C)x��N���RKo�	R
�[�����9�'c�FX7:RK�3�Q>����6+,<c�5xI崰་�	�b-� �sʋ�ک(:��c"�o��Є\g�����D���u����g��εQ9�p��Ay��Gi��<�����u�D����-Q�=ް�O�D)���Tv׆���r�〔�M��}�40_M��h����a�J傥Y��Ӗ�-�㿚`��V�RR�!�<��G\&�N�('���.=��8���]g�<��V���fbC��F��g,�����uL�t19DxM���q�g6ď@�+f^2���kj4wr��s�Z���8t���e{�Ė zk�ӎ?�5�km�a����V�����8#�k���\��i�B[�=γwi,�7c�9#~}B��Y��         �   x��ˑ!�V0[�����Xi.nSô���9�5�����B�6�u������������������y\5��їh�%�l)�C\�v��y��'m�����zC{)�'6�����E�x��WО:���_��1�G�~�\SY���b��[3�R\T�E#���_�(W��}�@Sɑ�C���|��������C_��Y覘�5����q�\��>i2bZ䫎8*�sŋy����?�II�     