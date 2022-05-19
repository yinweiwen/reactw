--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.15
-- Dumped by pg_dump version 10.19 (Ubuntu 10.19-0ubuntu0.18.04.1)

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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: department; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.department (
    id integer NOT NULL,
    name character varying(128) NOT NULL,
    dependence integer,
    type integer NOT NULL
);


--
-- Name: COLUMN department.dependence; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.department.dependence IS '上级部门/从属';


--
-- Name: COLUMN department.type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.department.type IS '市1，区县2，乡镇3，村4';


--
-- Name: department_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;


--
-- Name: places; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.places (
    id integer NOT NULL,
    name character varying NOT NULL,
    describe character varying,
    "userId" bigint
);


--
-- Name: TABLE places; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.places IS '场所信息';


--
-- Name: COLUMN places.name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.places.name IS '场所名称';


--
-- Name: COLUMN places.describe; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.places.describe IS '描述';


--
-- Name: COLUMN places."userId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.places."userId" IS '场所创建用户ID';


--
-- Name: places_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.places_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.places_id_seq OWNED BY public.places.id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post (
    id integer NOT NULL,
    name character varying(128) NOT NULL,
    department_id integer NOT NULL
);


--
-- Name: TABLE post; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.post IS '职位表';


--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- Name: region_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.region_type (
    id integer NOT NULL,
    type character varying(128) NOT NULL
);


--
-- Name: region_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.region_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: region_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.region_type_id_seq OWNED BY public.region_type.id;


--
-- Name: report_collection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.report_collection (
    id integer NOT NULL,
    "regionId" integer,
    "dateTime" timestamp without time zone NOT NULL,
    "placeCount" integer,
    "hiddenDangerCount" integer,
    "hiddenDangerItem12Count" character varying,
    "userId" integer
);


--
-- Name: TABLE report_collection; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.report_collection IS '各县区每日汇总表';


--
-- Name: COLUMN report_collection."regionId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_collection."regionId" IS '县区（id）';


--
-- Name: COLUMN report_collection."placeCount"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_collection."placeCount" IS '场所总数';


--
-- Name: COLUMN report_collection."hiddenDangerCount"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_collection."hiddenDangerCount" IS '排查隐患总数';


--
-- Name: COLUMN report_collection."hiddenDangerItem12Count"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_collection."hiddenDangerItem12Count" IS '排查隐患详细类目  1-12 项  总数
数组输出字符串 以逗号分割
如 1,0,5,6,8,..  ';


--
-- Name: COLUMN report_collection."userId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_collection."userId" IS '填报人(县区联络员)';


--
-- Name: report_collection_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.report_collection_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: report_collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.report_collection_id_seq OWNED BY public.report_collection.id;


--
-- Name: report_configition; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.report_configition (
    id integer NOT NULL,
    "reportName" character varying(255),
    "regionId" integer,
    "reportTypeId" integer,
    "excuteTime" character varying(50),
    "isEnable" boolean
);


--
-- Name: TABLE report_configition; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.report_configition IS '报表生成配置';


--
-- Name: COLUMN report_configition.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_configition.id IS '序号';


--
-- Name: COLUMN report_configition."reportName"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_configition."reportName" IS '报表名称';


--
-- Name: COLUMN report_configition."regionId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_configition."regionId" IS '区域id';


--
-- Name: COLUMN report_configition."reportTypeId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_configition."reportTypeId" IS '报表类型';


--
-- Name: COLUMN report_configition."excuteTime"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_configition."excuteTime" IS '生成时间 整点 24小时制';


--
-- Name: COLUMN report_configition."isEnable"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_configition."isEnable" IS '启用状态';


--
-- Name: report_configition_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.report_configition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: report_configition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.report_configition_id_seq OWNED BY public.report_configition.id;


--
-- Name: report_rectify; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.report_rectify (
    id bigint NOT NULL,
    name character varying(255),
    address character varying(255),
    "hiddenDanger" character varying(1024),
    "correctiveAction" character varying(1024),
    punishment character varying(1024),
    "regionId" integer NOT NULL,
    "userId" integer,
    "isAudit" boolean,
    "dateTime" timestamp without time zone NOT NULL
);


--
-- Name: TABLE report_rectify; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.report_rectify IS '整治表';


--
-- Name: COLUMN report_rectify.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify.id IS '序号';


--
-- Name: COLUMN report_rectify.name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify.name IS '名称';


--
-- Name: COLUMN report_rectify.address; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify.address IS '地址';


--
-- Name: COLUMN report_rectify."hiddenDanger"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify."hiddenDanger" IS '排查发现隐患';


--
-- Name: COLUMN report_rectify."correctiveAction"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify."correctiveAction" IS '采取措施';


--
-- Name: COLUMN report_rectify.punishment; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify.punishment IS '实施处罚，强制措施情况';


--
-- Name: COLUMN report_rectify."regionId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify."regionId" IS '区域id';


--
-- Name: COLUMN report_rectify."userId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify."userId" IS '上报用户id';


--
-- Name: COLUMN report_rectify."isAudit"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_rectify."isAudit" IS '市级 确认审核';


--
-- Name: report_countyCollect_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."report_countyCollect_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: report_countyCollect_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."report_countyCollect_id_seq" OWNED BY public.report_rectify.id;


--
-- Name: report_downManage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."report_downManage" (
    id integer NOT NULL,
    "reportName" character varying NOT NULL,
    "regionId" integer NOT NULL,
    "reportTypeId" integer NOT NULL,
    "filePath" character varying NOT NULL,
    "creatTime" timestamp without time zone NOT NULL
);


--
-- Name: TABLE "report_downManage"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public."report_downManage" IS '报表管理/报表配置';


--
-- Name: COLUMN "report_downManage"."reportName"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."report_downManage"."reportName" IS '报表名称';


--
-- Name: COLUMN "report_downManage"."regionId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."report_downManage"."regionId" IS '区域id';


--
-- Name: COLUMN "report_downManage"."reportTypeId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."report_downManage"."reportTypeId" IS '报表类型id
1.整治表
2.汇总表';


--
-- Name: COLUMN "report_downManage"."filePath"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."report_downManage"."filePath" IS '文件路径';


--
-- Name: report_downManage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."report_downManage_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: report_downManage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."report_downManage_id_seq" OWNED BY public."report_downManage".id;


--
-- Name: report_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.report_template (
    id integer NOT NULL,
    name character varying NOT NULL,
    path character varying NOT NULL
);


--
-- Name: TABLE report_template; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.report_template IS '报表模板';


--
-- Name: COLUMN report_template.path; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_template.path IS '模板路径';


--
-- Name: report_template_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.report_template_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: report_template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.report_template_id_seq OWNED BY public.report_template.id;


--
-- Name: report_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.report_type (
    id integer NOT NULL,
    name character varying(255),
    "templatePath" character varying
);


--
-- Name: TABLE report_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.report_type IS '报表类型';


--
-- Name: COLUMN report_type."templatePath"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.report_type."templatePath" IS '报表模板文件路径';


--
-- Name: resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resource (
    code character varying(128) NOT NULL,
    name character varying(128) NOT NULL,
    parent_resource character varying(128)
);


--
-- Name: TABLE resource; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.resource IS '权限字典';


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(512) NOT NULL,
    department_id integer NOT NULL,
    email character varying(128),
    enable boolean DEFAULT true NOT NULL,
    delete boolean DEFAULT false NOT NULL,
    phone character varying(20) NOT NULL,
    post character varying(64)
);


--
-- Name: COLUMN "user".username; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".username IS '用户名 账号';


--
-- Name: COLUMN "user".department_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".department_id IS '部门id';


--
-- Name: COLUMN "user".enable; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".enable IS '启用状态';


--
-- Name: COLUMN "user".phone; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".phone IS '手机号(小程序使用手机号登录)';


--
-- Name: COLUMN "user".post; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user".post IS '职位';


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_placeSecurityRecord; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user_placeSecurityRecord" (
    id bigint NOT NULL,
    "time" timestamp(0) without time zone,
    "placeId" integer,
    "hiddenDangerItem12" json,
    description character varying(1024),
    "audit1ManId" integer,
    "audit2ManId" integer,
    "regionId" integer,
    "userId" bigint,
    "placeType" character varying,
    address character varying,
    phone character varying NOT NULL,
    dimension real,
    floors integer,
    "numberOfPeople" integer,
    location character varying,
    "isEnable" boolean,
    "rejectManId" integer,
    "rejectReasons" character varying,
    "isDraft" boolean,
    "placeOwner" character varying(50),
    "localtionDescribe" character varying(512),
    "correctiveAction" character varying(1024),
    punishment character varying(1024)
);


--
-- Name: TABLE "user_placeSecurityRecord"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public."user_placeSecurityRecord" IS '填报记录-合用场所安全隐患排查';


--
-- Name: COLUMN "user_placeSecurityRecord".id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord".id IS 'id';


--
-- Name: COLUMN "user_placeSecurityRecord"."time"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."time" IS '录入时间';


--
-- Name: COLUMN "user_placeSecurityRecord"."placeId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."placeId" IS '场所id';


--
-- Name: COLUMN "user_placeSecurityRecord"."hiddenDangerItem12"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."hiddenDangerItem12" IS '12项隐患信息';


--
-- Name: COLUMN "user_placeSecurityRecord".description; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord".description IS '存在具体问题描述';


--
-- Name: COLUMN "user_placeSecurityRecord"."audit1ManId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."audit1ManId" IS '乡镇人审核';


--
-- Name: COLUMN "user_placeSecurityRecord"."audit2ManId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."audit2ManId" IS '区县人复核';


--
-- Name: COLUMN "user_placeSecurityRecord"."regionId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."regionId" IS '所属县/区';


--
-- Name: COLUMN "user_placeSecurityRecord"."userId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."userId" IS '用户id，填报人';


--
-- Name: COLUMN "user_placeSecurityRecord"."placeType"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."placeType" IS '场所性质';


--
-- Name: COLUMN "user_placeSecurityRecord".address; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord".address IS '场所地址';


--
-- Name: COLUMN "user_placeSecurityRecord".phone; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord".phone IS '负责人手机号';


--
-- Name: COLUMN "user_placeSecurityRecord".dimension; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord".dimension IS '面积';


--
-- Name: COLUMN "user_placeSecurityRecord".floors; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord".floors IS '多少层';


--
-- Name: COLUMN "user_placeSecurityRecord"."numberOfPeople"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."numberOfPeople" IS '常住人数';


--
-- Name: COLUMN "user_placeSecurityRecord".location; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord".location IS '经纬度';


--
-- Name: COLUMN "user_placeSecurityRecord"."isEnable"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."isEnable" IS '是否为合用场所';


--
-- Name: COLUMN "user_placeSecurityRecord"."rejectManId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."rejectManId" IS '驳回人';


--
-- Name: COLUMN "user_placeSecurityRecord"."rejectReasons"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."rejectReasons" IS '驳回意见';


--
-- Name: COLUMN "user_placeSecurityRecord"."isDraft"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."isDraft" IS '是否草稿';


--
-- Name: COLUMN "user_placeSecurityRecord"."placeOwner"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."placeOwner" IS '场所负责人';


--
-- Name: COLUMN "user_placeSecurityRecord"."correctiveAction"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord"."correctiveAction" IS '采取整改措施';


--
-- Name: COLUMN "user_placeSecurityRecord".punishment; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public."user_placeSecurityRecord".punishment IS '实施处罚，强制措施情况';


--
-- Name: user_placeSecurityRecord_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."user_placeSecurityRecord_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_placeSecurityRecord_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."user_placeSecurityRecord_id_seq" OWNED BY public."user_placeSecurityRecord".id;


--
-- Name: user_resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_resource (
    id integer NOT NULL,
    user_id integer NOT NULL,
    resource character varying(128) NOT NULL
);


--
-- Name: user_resource_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_resource_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_resource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_resource_id_seq OWNED BY public.user_resource.id;


--
-- Name: user_token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_token (
    token uuid NOT NULL,
    user_info jsonb NOT NULL,
    expired timestamp with time zone NOT NULL
);


--
-- Name: department id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.department ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);


--
-- Name: places id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.places ALTER COLUMN id SET DEFAULT nextval('public.places_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Name: region_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.region_type ALTER COLUMN id SET DEFAULT nextval('public.region_type_id_seq'::regclass);


--
-- Name: report_collection id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_collection ALTER COLUMN id SET DEFAULT nextval('public.report_collection_id_seq'::regclass);


--
-- Name: report_configition id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_configition ALTER COLUMN id SET DEFAULT nextval('public.report_configition_id_seq'::regclass);


--
-- Name: report_downManage id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."report_downManage" ALTER COLUMN id SET DEFAULT nextval('public."report_downManage_id_seq"'::regclass);


--
-- Name: report_rectify id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_rectify ALTER COLUMN id SET DEFAULT nextval('public."report_countyCollect_id_seq"'::regclass);


--
-- Name: report_template id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_template ALTER COLUMN id SET DEFAULT nextval('public.report_template_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_placeSecurityRecord id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user_placeSecurityRecord" ALTER COLUMN id SET DEFAULT nextval('public."user_placeSecurityRecord_id_seq"'::regclass);


--
-- Name: user_resource id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_resource ALTER COLUMN id SET DEFAULT nextval('public.user_resource_id_seq'::regclass);


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.department (id, name, dependence, type) FROM stdin;
565	瀛上村	1871	4
3	青山湖区	1	2
9	太平乡	2	3
10	扬子洲乡	3	3
2	湾里区辖	1	2
4	南昌县辖	1	2
11	泾口乡	4	3
12	南新乡	4	3
13	塔城乡	4	3
14	太平乡-村1	9	4
15	太平乡-村2	9	4
16	扬子洲乡-村1	10	4
17	泾口乡-村1	11	4
18	南新乡-村1	12	4
19	塔城乡-村1	13	4
1	南昌市	\N	1
37	安义县	1	2
409	龙津镇	37	3
410	文峰社区	409	4
411	东门社区	409	4
412	西门社区	409	4
413	向阳社区	409	4
414	京庄社区	409	4
415	和平社区	409	4
416	朝阳社区	409	4
417	蔚蓝社区	409	4
418	阳湖村	409	4
419	凤山村	409	4
420	前进村	409	4
421	码头村	409	4
422	喻家村	409	4
423	台山村	409	4
424	城北村	409	4
425	湖上村	409	4
426	鼎湖镇	37	3
427	西路村	426	4
428	鼎湖村	426	4
429	炉南村	426	4
430	板溪村	426	4
431	前溪村	426	4
432	花园村	426	4
433	沙井村	426	4
434	湖溪村	426	4
435	莲花村	426	4
436	田埠村	426	4
437	戴坊村	426	4
438	柏树村	426	4
439	榨下村	426	4
440	中州村	426	4
441	胜利社区	426	4
442	城南社区	426	4
443	万埠镇	37	3
444	洲上村	443	4
445	坪源村	443	4
446	桃一村	443	4
447	桃二村	443	4
448	万坪村	443	4
449	下庄村	443	4
450	大花村	443	4
451	前岸村	443	4
452	团北村	443	4
453	大垅村	443	4
454	南楼村	443	4
455	青湖村	443	4
456	郭上村	443	4
457	王家村	443	4
458	罗山村	443	4
459	文埠村	443	4
460	老街	443	4
461	新街	443	4
462	石鼻镇	37	3
463	石鼻村	462	4
464	邹家村	462	4
465	古楼村	462	4
466	果田村	462	4
467	联合村	462	4
468	对门村	462	4
469	堎上村	462	4
470	京台村	462	4
471	罗田村	462	4
472	邓家村	462	4
473	向坊村	462	4
474	东庄村	462	4
475	潘家村	462	4
476	赤岗村	462	4
477	燕坊村	462	4
478	赤石村	462	4
479	集镇	462	4
480	石鼻镇赤石村干部	37	3
481	东阳镇	37	3
482	北山村	481	4
483	徐埠村	481	4
484	东阳村	481	4
485	塘口村	481	4
486	战坪村	481	4
487	黄城村	481	4
488	石牛村	481	4
489	闵埠村	481	4
490	云溪村	481	4
491	新华村	481	4
492	马源村	481	4
493	徐埠社区	481	4
494	长埠镇	37	3
495	车田村	494	4
496	长埠村	494	4
497	大路村	494	4
498	云庄村	494	4
499	义基村	494	4
500	老下村	494	4
501	江下村	494	4
502	下桥村	494	4
503	上桥村	494	4
504	幸福社区	494	4
505	村干部	494	4
506	黄洲镇	37	3
507	街上社区	506	4
508	黄洲村	506	4
509	茅店村	506	4
510	圳溪村	506	4
511	新福村	506	4
512	塘下村	506	4
513	南果村	506	4
514	乔乐乡	37	3
515	前泽村	514	4
516	乔乐村	514	4
517	马溪村	514	4
518	社坑村	514	4
519	石湖村	514	4
520	林场	514	4
521	方岗社	514	4
522	方岗村	514	4
523	新民乡	37	3
524	乌溪村	523	4
525	隔港社区	523	4
526	郭家山社区	523	4
527	峤岭村	523	4
528	罗丰村	523	4
529	新民村	523	4
530	珠珞村	523	4
531	山上村	523	4
532	合水村	523	4
533	尚礼村	523	4
534	庄上社区	523	4
535	吊钟村	523	4
536	塘边村	523	4
537	向家坪社区	523	4
538	隔港	523	4
539	郭家山	523	4
540	庄上	523	4
541	长均乡	37	3
542	龙翔社区	541	4
543	观察村	541	4
544	把口村	541	4
545	长均村	541	4
546	新基村	541	4
547	天坪村	541	4
548	六溪村	541	4
549	曹村村	541	4
550	京庄村	541	4
551	白沙村	541	4
552	龙翔	541	4
553	把口	541	4
554	长均	541	4
555	新基	541	4
556	天坪	541	4
557	六溪	541	4
558	曹村	541	4
559	京庄	541	4
560	白沙	541	4
561	红山管理处	37	3
562	金垦社区	561	4
563	雁都社区	561	4
564	红山社区	561	4
\.


--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.places (id, name, describe, "userId") FROM stdin;
1	飞尚科技宿舍楼	无描述	1
8	XXXX场所	\N	2
9	XXXX场所-2	\N	2
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post (id, name, department_id) FROM stdin;
1	超级管理员	1
\.


--
-- Data for Name: region_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.region_type (id, type) FROM stdin;
\.


--
-- Data for Name: report_collection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.report_collection (id, "regionId", "dateTime", "placeCount", "hiddenDangerCount", "hiddenDangerItem12Count", "userId") FROM stdin;
3	2	2022-03-12 00:00:00	233	3333	1,2,3,4,5,6,7,8,9,10,11,12	2
4	2	2022-03-06 00:00:00	233	3333	1,2,3,4,5,6,7,8,9,10,11,12	2
6	4	2022-03-05 00:00:00	233	3333	1,2,3,4,5,6,7,8,9,10,11,12	2
2	2	2022-03-04 00:00:00	233	3333	1,2,3,4,5,6,7,8,9,10,11,12	\N
1	4	2022-03-12 00:00:00	233	3333	1,2,3,4,5,6,7,8,9,10,11,12	\N
5	4	2022-03-12 00:00:00	233	3333	1,2,3,4,5,6,7,8,9,10,11,12	\N
93	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
94	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
95	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
96	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
97	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
98	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
99	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
100	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
101	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
102	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
103	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
104	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
105	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
106	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
107	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
108	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
109	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
110	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
111	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
112	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
113	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
114	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
115	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
116	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
117	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
118	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
119	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
120	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
121	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
122	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
123	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
124	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
125	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
126	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
127	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
128	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
129	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
130	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
131	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
132	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
133	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
134	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
135	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
136	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
137	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
138	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
139	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
140	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
141	3	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	2
142	4	2022-03-15 00:00:00	1	1	0,0,0,0,0,0,0,0,0,0,0,1	4
143	3	2022-03-18 22:00:00	23	24	25	\N
144	2	2022-03-30 17:38:00	2	12	2,0,2,2,0,0,0,0,2,2,0,2	\N
145	2	2022-03-30 17:38:43	2	12	2,0,2,2,0,0,0,0,2,2,0,2	\N
\.


--
-- Data for Name: report_configition; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.report_configition (id, "reportName", "regionId", "reportTypeId", "excuteTime", "isEnable") FROM stdin;
10	123123123	2	1	00	f
11	122222222	4	1	22	f
6	12	2	2	17:10	t
7	TESTNAME	2	1	17:10	t
27	5282	3	3	01:30	t
28	7867867	2	3	03:00	t
30	44	2	2	01:00	t
\.


--
-- Data for Name: report_downManage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."report_downManage" (id, "reportName", "regionId", "reportTypeId", "filePath", "creatTime") FROM stdin;
2	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
3	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
4	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
5	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
6	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
7	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
9	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
10	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
11	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
12	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
13	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
14	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
15	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
16	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
17	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-14 09:41:39
1	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-12 09:41:39
8	工程日志填写统计表_全部工程团队_2022-02	2	1	files/工程日志填写统计表_全部工程团队_2022-02.xls	2022-03-13 09:41:39
67	202231511各县区汇总表	1	2	./src/files/202231511各县区汇总表.xlsx	2022-03-15 00:00:00
68	202231511各县区汇总表	1	2	./src/files/202231511各县区汇总表.xlsx	2022-03-15 00:00:00
69	202231511各县区汇总表	1	2	./src/files/202231511各县区汇总表.xlsx	2022-03-15 00:00:00
70	202231511各县区汇总表	1	2	./src/files/202231511各县区汇总表.xlsx	2022-03-15 00:00:00
71	202231511各县区汇总表	1	2	./src/files/202231511各县区汇总表.xlsx	2022-03-15 00:00:00
72	202231511各县区汇总表	1	2	./src/files/202231511各县区汇总表.xlsx	2022-03-15 00:00:00
73	202231514各县区汇总表	1	2	./src/files/202231514各县区汇总表.xlsx	2022-03-15 00:00:00
74	202231514各县区汇总表	1	2	./src/files/202231514各县区汇总表.xlsx	2022-03-15 00:00:00
75	202231514各县区汇总表	1	2	./src/files/202231514各县区汇总表.xlsx	2022-03-15 00:00:00
76	202231514各县区汇总表	1	2	./src/files/202231514各县区汇总表.xlsx	2022-03-15 00:00:00
77	202231514各县区汇总表	1	2	./src/files/202231514各县区汇总表.xlsx	2022-03-15 00:00:00
78	202231514各县区汇总表	1	2	./src/files/202231514各县区汇总表.xlsx	2022-03-15 00:00:00
79	202231514各县区汇总表	1	2	./src/files/202231514各县区汇总表.xlsx	2022-03-15 00:00:00
80	202231514各县区汇总表	1	2	./src/files/202231514各县区汇总表.xlsx	2022-03-15 00:00:00
81	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
82	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
83	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
84	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
85	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
86	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
87	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
88	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
89	202231515各县区汇总表	1	2	./src/files/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
90	202231515各县区汇总表	1	2	./src/files888/202231515各县区汇总表.xlsx	2022-03-15 00:00:00
91	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
92	202231516各县区汇总表	1	2	./src/files/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
93	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
94	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
95	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
96	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
97	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
98	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
99	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
100	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
101	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
102	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
103	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
104	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
105	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
106	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
107	202231516各县区汇总表	1	2	./src/files888/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
108	202231516各县区汇总表	1	2	./src/files/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
109	202231516各县区汇总表	1	2	./src/files/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
110	202231516各县区汇总表	1	2	./src/files/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
111	202231516各县区汇总表	1	2	./src/files/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
112	202231516各县区汇总表	1	2	./src/files/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
113	202231516各县区汇总表	1	2	./src/files/202231516各县区汇总表.xlsx	2022-03-15 00:00:00
114	202231517各县区汇总表	1	2	./src/files/202231517各县区汇总表.xlsx	2022-03-15 00:00:00
117	202233016dsafa整治详细表	2	3	./src/files/202233016dsafa整治详细表.xlsx	2022-03-30 16:09:57
118	202233016dsafa整治详细表	2	3	./src/files/202233016dsafa整治详细表.xlsx	2022-03-30 16:34:08
119	202233016dsafa整治详细表	2	3	./src/files/202233016dsafa整治详细表.xlsx	2022-03-30 16:40:36
120	202233016dsafa整治详细表	2	3	./src/files/202233016dsafa整治详细表.xlsx	2022-03-30 16:41:59
121	202233016dsafa整治详细表	2	3	./src/files/202233016dsafa整治详细表.xlsx	2022-03-30 16:47:26
122	202233016dsafa整治详细表	2	3	./src/files/202233016dsafa整治详细表.xlsx	2022-03-30 16:48:59
123	202233016dsafa整治详细表	2	3	./src/files/202233016dsafa整治详细表.xlsx	2022-03-30 16:49:52
124	202233017南昌市各县区汇总表	1	2	/home/device/src/files/202233017南昌市各县区汇总表.xlsx	2022-03-30 17:20:03
125	202233017湾里区辖整治表	2	1	/home/device/src/files/202233017湾里区辖整治表.xlsx	2022-03-30 17:27:47
126	202233017湾里区辖整治表	2	1	/home/device/src/files/202233017湾里区辖整治表.xlsx	2022-03-30 17:28:59
127	202233017湾里区辖整治表	2	1	/home/device/src/files/202233017湾里区辖整治表.xlsx	2022-03-30 17:30:56
128	202233017湾里区辖整治表	2	1	/home/device/src/files/202233017湾里区辖整治表.xlsx	2022-03-30 17:38:00
129	202233017湾里区辖各县区汇总表	2	2	/home/device/src/files/202233017湾里区辖各县区汇总表.xlsx	2022-03-30 17:38:00
130	202233017湾里区辖整治表	2	1	./src/files/202233017湾里区辖整治表.xlsx	2022-03-30 17:38:43
131	202233017湾里区辖各县区汇总表	2	2	./src/files/202233017湾里区辖各县区汇总表.xlsx	2022-03-30 17:38:43
132	202241317湾里区辖各县区汇总表	2	2	./src/files/202241317湾里区辖各县区汇总表.xlsx	2022-04-13 17:46:14
\.


--
-- Data for Name: report_rectify; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.report_rectify (id, name, address, "hiddenDanger", "correctiveAction", punishment, "regionId", "userId", "isAudit", "dateTime") FROM stdin;
3	场所3	xxx地址2	第13项填写内容xx	1123	111	3	1	f	2022-03-14 09:33:47.97
5	dsafa	XX村XX街道	无			3	1	f	2022-03-14 00:00:00
6	dsafa	XX村XX街道	无			3	1	f	2022-03-14 00:00:00
7	dsafa	XX村XX街道	无			3	1	f	2022-03-14 00:00:00
8	dsafa	XX村XX街道	无			3	1	f	2022-03-14 00:00:00
11	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:28:10
12	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:28:59
13	XXXX场所	XX村XX街道	fererer	1	1	2	\N	f	2022-03-30 17:28:59
14	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:29:58
15	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:30:42
16	XXXX场所	XX村XX街道	fererer	1	1	2	\N	f	2022-03-30 17:30:42
17	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:30:56
18	XXXX场所	XX村XX街道	fererer	1	1	2	\N	f	2022-03-30 17:30:56
19	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:31:19
20	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:31:19
21	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:35:03
22	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:35:38
23	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:38:00
24	XXXX场所	XX村XX街道	fererer	1	1	2	\N	f	2022-03-30 17:38:00
25	XXXX场所	XX村XX街道	3434343	1	1	2	\N	f	2022-03-30 17:38:43
26	XXXX场所	XX村XX街道	fererer	1	1	2	\N	f	2022-03-30 17:38:43
1	场所1	xxx地址	第13项填写内容xxx	\N	\N	2	2	t	2022-03-13 09:33:45.616
2	场所2	xxx地址1	第13项填写内容xx	ttttest	\N	2	2	t	2022-03-14 09:33:47.97
9	XXXX场所	XX村XX街道	3434343	1	1	2	7	f	2022-03-30 17:27:47
10	XXXX场所	XX村XX街道	fererer	1	1	2	7	f	2022-03-30 17:27:47
\.


--
-- Data for Name: report_template; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.report_template (id, name, path) FROM stdin;
\.


--
-- Data for Name: report_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.report_type (id, name, "templatePath") FROM stdin;
1	县区排查整治汇总表	\N
2	各县区每日汇总表	\N
3	县区排查整治汇总表详细表	\N
\.


--
-- Data for Name: resource; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.resource (code, name, parent_resource) FROM stdin;
TIANBAOXINXI	填报信息	\N
REPORT_MANAGE	报表管理	\N
REPROT_CONFIG	报表配置	REPORT_MANAGE
ORG_MANAGE	组织管理	\N
ORG_MEMBER	部门成员	ORG_MANAGE
ORG_AUTH	权限配置	ORG_MANAGE
TIANBAOXINXI_CHANK	复核调查报告	TIANBAOXINXI
TIANBAOXINXI_APPROVE	审核上报调查报告	TIANBAOXINXI
TIANBAOXINXI_HZB_WRITE	确认整治汇总表	TIANBAOXINXI
REPORT_LIST	整治汇总查看	REPORT_MANAGE
REPORT_EDIT	整治汇总编辑	REPORT_MANAGE
REPORT_DOWN	报表下载 	REPORT_MANAGE
TIANBAOXINXI_HZB_APPROVE	审核上传每日报表	TIANBAOXINXI
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, name, username, password, department_id, email, enable, delete, phone, post) FROM stdin;
33	1231	321312	e10adc3949ba59abbe56e057f20f883e	1	2123@123.com	f	t	321312	\N
36	111	kkk	e10adc3949ba59abbe56e057f20f883e	1	21@f.com	t	f	kkk	\N
2	南新乡-村1-调查员	NanXin1	e10adc3949ba59abbe56e057f20f883e	18	\N	t	f	15623564589	\N
18	eeeeeeeeee33333333	fefefefefefe	e10adc3949ba59abbe56e057f20f883e	1	3333@123.com	t	t	fefefefefefe	\N
7	南新乡-审核人	NanXin11	e10adc3949ba59abbe56e057f20f883e	12	\N	t	f	18856565656	\N
4	泾口乡-村1-调查员	JingKou1	e10adc3949ba59abbe56e057f20f883e	17	\N	t	f	15623232323	\N
8	泾口乡-审核人	JingKou11	e10adc3949ba59abbe56e057f20f883e	11	\N	t	f	123	\N
5	南昌县辖-复核人	NanChang111	e10adc3949ba59abbe56e057f20f883e	4	\N	t	f	178898989	\N
9	222	SuperAdmin2222	e10adc3949ba59abbe56e057f20f883e	2	222@123.com	t	f	SuperAdmin	\N
24	erwrewr666	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
25	erwrewr444	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
26	erwrewr4444	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
13	cccc33	ccccc3434	d41d8cd98f00b204e9800998ecf8427e	2	24322@123.com	t	f	ccccc3434	34343
10	ee23232	12333544888	e10adc3949ba59abbe56e057f20f883e	2	ewwe@123.com	t	t	12333544888	\N
30	erwrewr432342	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
31	erwrewr4324234	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
32	erwrewr4443222	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
27	erwrewr44444	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
28	erwrewr3242334	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
11	陈飒飒	c2	c33367701511b4f6020ec61ded352059	1	3434@123.com	t	f	c2	ww
21	erwrewr2	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
22	erwrewr232323	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
34	2322	3232	a62cbc0945c874538c20ec9af7ecdd43	2	wwww@123.com	f	f	3232	\N
35	催催催	132145666911	e10adc3949ba59abbe56e057f20f883e	1	123@123.com	t	f	132145666911	出差
20	erwrewr222	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
23	erwrewr3	fsfsfsdfs	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	t	fsfsfsdfs	f
19	erwrewr	fsfsfsdfs	c33367701511b4f6020ec61ded352059	3	rrrr@123.com	t	f	fsfsfsdfs	f
1	管理员	SuperAdmin	e10adc3949ba59abbe56e057f20f883e	1	\N	t	f	15751773176	\N
29	erwrewr43242342	15751773172	e10adc3949ba59abbe56e057f20f883e	3	rrrr@123.com	t	f	15751773172	f
3	xiang	xiang	e10adc3949ba59abbe56e057f20f883e	14	\N	t	f	13111111111	\N
\.


--
-- Data for Name: user_placeSecurityRecord; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user_placeSecurityRecord" (id, "time", "placeId", "hiddenDangerItem12", description, "audit1ManId", "audit2ManId", "regionId", "userId", "placeType", address, phone, dimension, floors, "numberOfPeople", location, "isEnable", "rejectManId", "rejectReasons", "isDraft", "placeOwner", "localtionDescribe", "correctiveAction", punishment) FROM stdin;
9	2022-03-04 00:00:00	8	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":false,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	无	\N	\N	4	4	公共	XX村XX街道	17756562323	45	2	5	114,112	f	\N	\N	f	张三	\N	\N	\N
10	2022-03-15 00:00:00	8	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":false,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	无	\N	2	4	4	公共	XX村XX街道	17756562323	45	2	5	114,112	f	\N	\N	f	张三	\N	\N	\N
11	2022-03-06 00:00:00	1	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":false,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	无	\N	\N	4	1	公共	XX村XX街道	17756562323	45	2	5	114,112	f	\N	\N	f	张三	\N	\N	\N
8	2022-03-03 00:00:00	8	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":false,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	无	\N	\N	2	4	公共	XX村XX街道	17756562323	45	2	5	114,112	f	\N	\N	f	张三	\N	\N	\N
2	2022-02-28 00:00:00	8	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":false,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	无	7	5	12	2	公共	XX村XX街道	17756562323	45	2	5	114,112	f	\N	\N	f	张三	\N	\N	\N
7	2022-03-30 08:00:00	8	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":false,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	3434343	2	2	2	2	公共	XX村XX街道	17756562323	45	2	5	114,112	f	\N	\N	f	张三	\N	1	1
1	2022-03-15 00:00:00	1	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":true,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	无	\N	\N	18	2	公共	XX村XX街道	17756562323	45	2	5	114,112	f	3	驳回意见	f	张三	\N	采取措施	实施处罚，强制措施情况
6	2022-03-15 00:00:00	8	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":false,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	无	\N	\N	2	2	公共	XX村XX街道	17756562323	45	2	5	114,112	f	1	\N	f	张三	\N	1	1
4	2022-03-30 08:00:00	8	[{"itemIndex":1,"value":false,"photos":null},{"itemIndex":2,"value":false,"photos":null},{"itemIndex":3,"value":false,"photos":null},{"itemIndex":4,"value":false,"photos":null},{"itemIndex":5,"value":false,"photos":null},{"itemIndex":6,"value":false,"photos":null},{"itemIndex":7,"value":false,"photos":null},{"itemIndex":8,"value":false,"photos":null},{"itemIndex":9,"value":false,"photos":null},{"itemIndex":10,"value":false,"photos":null},{"itemIndex":11,"value":false,"photos":null},{"itemIndex":12,"value":true,"description":"物品搁置杂乱","photos":"1.jpg,2.png"}]	fererer	2	2	2	2	公共	XX村XX街道	17756562323	45	2	5	114,112	f	1	\N	f	张三	\N	1	1
\.


--
-- Data for Name: user_resource; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_resource (id, user_id, resource) FROM stdin;
45	36	REPORT_MANAGE
46	36	REPROT_CONFIG
47	36	REPORT_DOWN
48	36	REPORT_LIST
2	1	TIANBAOXINXI
3	1	REPORT_MANAGE
5	1	REPORT_DOWN
6	1	REPROT_CONFIG
7	1	ORG_MANAGE
8	1	ORG_MEMBER
9	1	ORG_AUTH
10	1	TIANBAOXINXI_CHANK
11	1	TIANBAOXINXI_APPROVE
12	1	TIANBAOXINXI_HZB_WRITE
13	1	TIANBAOXINXI_HZB_APPROVE
23	2	TIANBAOXINXI
24	2	TIANBAOXINXI_CHANK
25	2	TIANBAOXINXI_APPROVE
26	2	TIANBAOXINXI_HZB_WRITE
27	2	TIANBAOXINXI_HZB_APPROVE
30	11	REPORT_MANAGE
31	11	REPROT_CONFIG
33	11	REPORT_EDIT
34	18	REPORT_MANAGE
35	18	REPROT_CONFIG
37	18	REPORT_EDIT
39	1	REPORT_EDIT
40	11	REPORT_DOWN
41	33	REPORT_MANAGE
42	33	REPROT_CONFIG
\.


--
-- Data for Name: user_token; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_token (token, user_info, expired) FROM stdin;
465b0f25-55d5-44c1-87f7-7f3cc1a0e5dc	{"authorized": true}	2022-03-19 18:23:34.93+08
5e1f57a8-742f-4824-b62a-6b5004323838	{"id": 2, "name": "Admin", "post": null, "email": null, "phone": "15623564589", "token": "5e1f57a8-742f-4824-b62a-6b5004323838", "delete": false, "enable": true, "username": "admin", "resources": [{"code": "TIANBAOXINXI", "name": "填报信息"}, {"code": "IF_APPROVE_INFO", "name": "是否审核填报信息"}, {"code": "IF_CHANK_INFO", "name": "是否复核填报信息"}], "authorized": true, "departmentId": 18, "userRegionType": 4, "attentionRegion": {"id": 1, "name": "南昌市", "type": 1, "nextRegin": {"id": 4, "name": "南昌县辖", "type": 2, "nextRegin": {"id": 12, "name": "南新乡", "type": 3, "nextRegin": {"id": 18, "name": "南新乡-村1", "type": 4, "dependence": 12}, "dependence": 4}, "dependence": 1}, "dependence": null}}	2022-04-12 12:06:47+08
e6d8e05e-d300-4afa-8e64-5135359ee1c5	{"id": 2, "name": "Admin", "post": null, "email": null, "phone": "15623564589", "delete": false, "enable": true, "username": "admin", "departmentId": 18}	2022-04-12 12:07:23+08
e488b40f-e548-4534-aa9d-b672ef43acaf	{"id": 2, "name": "Admin", "post": null, "email": null, "phone": "15623564589", "delete": false, "enable": true, "username": "admin", "departmentId": 18}	2022-04-12 12:12:10+08
05405c11-4ac7-4be5-8dc0-cad47ea313a2	{"id": 2, "name": "Admin", "post": null, "email": null, "phone": "15623564589", "delete": false, "enable": true, "username": "admin", "departmentId": 18}	2022-04-12 12:12:36+08
9bae6b79-884f-433a-b37f-6c7249284fcf	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "9bae6b79-884f-433a-b37f-6c7249284fcf", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-12 13:35:09+08
5c8db839-d20a-49cc-8e67-2171e666389f	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "5c8db839-d20a-49cc-8e67-2171e666389f", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-12 15:18:58+08
f79b994c-c434-47cc-a2bb-a2e6188fce5f	{"id": 2, "name": "Admin", "post": null, "email": null, "phone": "15623564589", "token": "f79b994c-c434-47cc-a2bb-a2e6188fce5f", "delete": false, "enable": true, "username": "admin", "authorized": true, "departmentId": 18}	2022-04-12 16:01:02+08
d4f3149b-ec4a-439e-9be9-ea7000a029e5	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "d4f3149b-ec4a-439e-9be9-ea7000a029e5", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-12 17:34:34+08
0994b678-d06d-41ef-8b8c-a8edc655067c	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "0994b678-d06d-41ef-8b8c-a8edc655067c", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 09:52:37+08
a4dfd22d-82e6-48b4-ab1b-b353505a18f9	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "a4dfd22d-82e6-48b4-ab1b-b353505a18f9", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 10:04:12+08
cfffb9ea-e765-43ea-a4f3-032aeabafcd8	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "cfffb9ea-e765-43ea-a4f3-032aeabafcd8", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 11:06:03+08
8c285562-b517-4963-a887-1449f8c6d7c0	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "8c285562-b517-4963-a887-1449f8c6d7c0", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 11:09:24+08
ae56ba47-e253-411f-a0c7-3197bb71c986	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "ae56ba47-e253-411f-a0c7-3197bb71c986", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 11:11:57+08
700b14c7-f247-4790-91e3-5385dbf8ecef	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "700b14c7-f247-4790-91e3-5385dbf8ecef", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 11:20:23+08
0ee82c54-51fd-42aa-8c9a-59bae8344ed1	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "0ee82c54-51fd-42aa-8c9a-59bae8344ed1", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 11:45:03+08
13779aba-7ba5-4ec7-879c-f38bae631560	{"id": 2, "name": "Admin", "post": null, "email": null, "phone": "15623564589", "token": "13779aba-7ba5-4ec7-879c-f38bae631560", "delete": false, "enable": true, "username": "admin", "authorized": true, "departmentId": 18}	2022-04-13 14:23:16+08
1aa9089d-bab4-4bbc-881e-6e59b9afdf25	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "1aa9089d-bab4-4bbc-881e-6e59b9afdf25", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 15:10:57+08
2c35d8ff-f0f0-4038-badd-223cc466e2ad	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "2c35d8ff-f0f0-4038-badd-223cc466e2ad", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 15:18:45+08
163933be-9d80-4cd4-870f-d5d3f73ce88c	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "163933be-9d80-4cd4-870f-d5d3f73ce88c", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-13 18:53:15+08
accfd05a-c5d0-408f-acfa-ba6a7801648c	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "accfd05a-c5d0-408f-acfa-ba6a7801648c", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-14 09:09:53+08
6e0f54c1-a588-489f-866c-db4fce9474a5	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "6e0f54c1-a588-489f-866c-db4fce9474a5", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-14 09:21:54+08
9346e404-f453-4796-9aec-6e0fa292dba9	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "9346e404-f453-4796-9aec-6e0fa292dba9", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-14 09:23:53+08
720c050a-2139-491e-a863-28126a530ec6	{"id": 2, "name": "南新乡-村1-调查员", "post": null, "email": null, "phone": "15623564589", "token": "720c050a-2139-491e-a863-28126a530ec6", "delete": false, "enable": true, "username": "NanXin1", "authorized": true, "departmentId": 18}	2022-04-14 14:42:46+08
d9742a4f-9f47-4544-8b17-6a95d487357b	{"id": 2, "name": "南新乡-村1-调查员", "post": null, "email": null, "phone": "15623564589", "token": "d9742a4f-9f47-4544-8b17-6a95d487357b", "delete": false, "enable": true, "username": "NanXin1", "authorized": true, "departmentId": 18}	2022-04-14 14:43:21+08
fdb338cf-9a5b-4e45-b659-ac10f2d6040f	{"id": 2, "name": "南新乡-村1-调查员", "post": null, "email": null, "phone": "15623564589", "token": "fdb338cf-9a5b-4e45-b659-ac10f2d6040f", "delete": false, "enable": true, "username": "NanXin1", "authorized": true, "departmentId": 18}	2022-04-14 14:44:17+08
656613ab-fb93-4d4d-b69b-7f1c51102e71	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "656613ab-fb93-4d4d-b69b-7f1c51102e71", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_LIST", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "TIANBAOXINXI_ZZHZ_APPROVE", "TIANBAOXINXI_UPDATE", "REPORT_EDIT"]}	2022-04-14 16:01:52+08
27fc4e09-33e6-4c3b-8cd6-0a46395054d0	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "27fc4e09-33e6-4c3b-8cd6-0a46395054d0", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_LIST", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "TIANBAOXINXI_ZZHZ_APPROVE", "TIANBAOXINXI_UPDATE", "REPORT_EDIT"]}	2022-04-14 16:40:59+08
3b7e804f-29f5-4c88-ac51-c62c31ef2864	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "3b7e804f-29f5-4c88-ac51-c62c31ef2864", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_LIST", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "TIANBAOXINXI_ZZHZ_APPROVE", "TIANBAOXINXI_UPDATE", "REPORT_EDIT"]}	2022-04-14 20:56:04+08
1a9da973-e840-4257-a849-59b5ececd6b9	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "123456789", "token": "1a9da973-e840-4257-a849-59b5ececd6b9", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_LIST", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "TIANBAOXINXI_ZZHZ_APPROVE", "TIANBAOXINXI_UPDATE", "REPORT_EDIT"]}	2022-04-14 21:21:39+08
08efb466-374a-4799-babd-d64c727108a0	{"id": 29, "name": "erwrewr43242342", "post": "f", "email": "rrrr@123.com", "phone": "15751773176", "token": "08efb466-374a-4799-babd-d64c727108a0", "delete": false, "enable": true, "username": "15751773176", "authorized": true, "departmentId": 3}	2022-04-14 22:25:25+08
0c304b90-6365-4c7a-9170-91e2f7bd376d	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "0c304b90-6365-4c7a-9170-91e2f7bd376d", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1}	2022-04-14 22:28:28+08
afca8233-8ecd-4ec3-977a-dea11ffa181e	{"id": 2, "name": "南新乡-村1-调查员", "post": null, "email": null, "phone": "15623564589", "token": "afca8233-8ecd-4ec3-977a-dea11ffa181e", "delete": false, "enable": true, "username": "NanXin1", "authorized": true, "departmentId": 18}	2022-04-14 22:39:42+08
b5632cea-273d-4765-9d74-7e040026bc33	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "b5632cea-273d-4765-9d74-7e040026bc33", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_LIST", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "TIANBAOXINXI_ZZHZ_APPROVE", "TIANBAOXINXI_UPDATE", "REPORT_EDIT"]}	2022-04-15 10:22:28+08
637ee853-2c12-4ab9-a6cc-2343a625f249	{"id": 36, "name": "xxxx", "post": null, "email": "21@f.com", "phone": "kkk", "token": "637ee853-2c12-4ab9-a6cc-2343a625f249", "delete": false, "enable": true, "username": "kkk", "authorized": true, "departmentId": 1, "userResources": ["REPORT_MANAGE", "REPROT_CONFIG", "REPORT_DOWN", "REPORT_LIST"]}	2022-04-16 09:42:22+08
efe1011f-5357-4877-ae60-1489e3131930	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "efe1011f-5357-4877-ae60-1489e3131930", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-04-16 09:48:30+08
a15e77ee-92fd-4165-ba09-3242eec60734	{"id": 36, "name": "xxxx", "post": null, "email": "21@f.com", "phone": "kkk", "token": "a15e77ee-92fd-4165-ba09-3242eec60734", "delete": false, "enable": true, "username": "kkk", "authorized": true, "departmentId": 1, "userResources": ["REPORT_MANAGE", "REPROT_CONFIG", "REPORT_DOWN", "REPORT_LIST"]}	2022-04-16 09:48:56+08
a5f8bcbb-9dce-4a83-a575-e17ea5f1c9ac	{"id": 2, "name": "南新乡-村1-调查员", "post": null, "email": null, "phone": "15623564589", "token": "a5f8bcbb-9dce-4a83-a575-e17ea5f1c9ac", "delete": false, "enable": true, "username": "NanXin1", "authorized": true, "departmentId": 18}	2022-04-20 09:48:46+08
6a7f7fad-5e47-4ace-ace8-636e69457f33	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "6a7f7fad-5e47-4ace-ace8-636e69457f33", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-04-21 09:54:08+08
51ee4487-bf46-4a88-9cf6-b782262e40fe	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "51ee4487-bf46-4a88-9cf6-b782262e40fe", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-04-29 17:42:23+08
0ba0d0d9-21a2-4711-a6e9-0b72da2d2175	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "0ba0d0d9-21a2-4711-a6e9-0b72da2d2175", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-04-29 17:44:13+08
32ff2299-19ab-4917-a765-ecea2109c4c3	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "32ff2299-19ab-4917-a765-ecea2109c4c3", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-15 14:37:11+08
64367c87-9893-40af-851e-5483e9b80ced	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "64367c87-9893-40af-851e-5483e9b80ced", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-18 09:04:41+08
c9e7515e-0108-46ec-bc0d-16afbecc9c7d	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "c9e7515e-0108-46ec-bc0d-16afbecc9c7d", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-18 16:31:46+08
eaa27d2f-bc16-44d1-a730-df56a2c2fdfc	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "eaa27d2f-bc16-44d1-a730-df56a2c2fdfc", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 08:39:41+08
6be42981-ddf1-4ec9-82bb-18806b2b517e	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "6be42981-ddf1-4ec9-82bb-18806b2b517e", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 09:05:25+08
a33cf747-58b6-4534-9dde-64c6bbad16bb	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "a33cf747-58b6-4534-9dde-64c6bbad16bb", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 09:09:01+08
25906f0b-7122-462b-b878-91ab5fd9a3e2	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "25906f0b-7122-462b-b878-91ab5fd9a3e2", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 11:15:47+08
20d2bc2d-f3fb-42f4-abc4-b786514e3dd0	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "20d2bc2d-f3fb-42f4-abc4-b786514e3dd0", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 11:16:11+08
ac391a43-fdce-4e4b-bceb-cb6d9151a54f	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "ac391a43-fdce-4e4b-bceb-cb6d9151a54f", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 11:18:21+08
8cf188f3-a33a-446a-9f53-e4578eae192f	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "8cf188f3-a33a-446a-9f53-e4578eae192f", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 11:19:17+08
85569e73-c744-4b8b-9890-22f64df6eeb4	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "85569e73-c744-4b8b-9890-22f64df6eeb4", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:44:44+08
f1810f40-4da9-42c3-9d07-0e3e51c54914	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "f1810f40-4da9-42c3-9d07-0e3e51c54914", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:50:18+08
f0eda197-b5ae-410c-88f2-d92875539cfa	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "f0eda197-b5ae-410c-88f2-d92875539cfa", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:51:41+08
b92bc07b-8d90-406d-bfd1-20d444494181	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "b92bc07b-8d90-406d-bfd1-20d444494181", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:51:58+08
a89db3d0-2cae-4e2e-b65c-a09e88bfbe4d	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "a89db3d0-2cae-4e2e-b65c-a09e88bfbe4d", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:54:31+08
6651b0fa-2670-4c86-bd24-c3ecd61c1521	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "6651b0fa-2670-4c86-bd24-c3ecd61c1521", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:54:52+08
19dc5175-d2bf-4a89-bf1f-032f6a14aec7	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "19dc5175-d2bf-4a89-bf1f-032f6a14aec7", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:56:54+08
1395f817-b1f4-432d-90f7-6c72dba49abe	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "1395f817-b1f4-432d-90f7-6c72dba49abe", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:58:37+08
6e3ea1a9-2c56-41fe-a115-6fa6d16fe2f0	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "6e3ea1a9-2c56-41fe-a115-6fa6d16fe2f0", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:59:05+08
9c225a63-75b1-4256-9063-9c9fcd131e3f	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "9c225a63-75b1-4256-9063-9c9fcd131e3f", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:59:12+08
036a6253-5ef3-42e1-9f26-fc66333f9a38	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "036a6253-5ef3-42e1-9f26-fc66333f9a38", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 13:59:49+08
a6e21421-0f71-4884-8160-8012269bda24	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "a6e21421-0f71-4884-8160-8012269bda24", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:00:59+08
5a4ade51-cf53-4119-9cdf-8388c3137b05	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "5a4ade51-cf53-4119-9cdf-8388c3137b05", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:01:30+08
020721ba-af7b-4152-ae38-c4f0eae08869	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "020721ba-af7b-4152-ae38-c4f0eae08869", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:02:34+08
7989de2b-c844-4617-aea8-ce8fda2eae92	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "7989de2b-c844-4617-aea8-ce8fda2eae92", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:03:03+08
25937a03-4239-4412-a729-b593c4e94e69	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "25937a03-4239-4412-a729-b593c4e94e69", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:03:18+08
c357a145-7a30-44c2-bfd4-60ff26835053	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "c357a145-7a30-44c2-bfd4-60ff26835053", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:06:59+08
e72f54b6-291d-4d95-bb98-5f89bf38bf7b	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "e72f54b6-291d-4d95-bb98-5f89bf38bf7b", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:08:06+08
cd6a6082-c59d-49c1-952d-2c44d06e14ae	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "cd6a6082-c59d-49c1-952d-2c44d06e14ae", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:10:33+08
b3c4703f-ee6b-4705-a41a-2466c0d08571	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "b3c4703f-ee6b-4705-a41a-2466c0d08571", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:33:10+08
0e052c47-f5a2-4224-9223-8cd28eca53ad	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "0e052c47-f5a2-4224-9223-8cd28eca53ad", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:39:31+08
f49d18be-dcda-421c-a255-ff84850e6e7d	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "f49d18be-dcda-421c-a255-ff84850e6e7d", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:40:49+08
88324265-cd97-44ae-ab88-416e89246cd4	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "88324265-cd97-44ae-ab88-416e89246cd4", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:43:45+08
4547d5c3-06a7-45d8-a2d4-af972a77e3a1	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "4547d5c3-06a7-45d8-a2d4-af972a77e3a1", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:48:34+08
ec2e2ac6-fd70-4ecf-9541-4a99defc2b2c	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "ec2e2ac6-fd70-4ecf-9541-4a99defc2b2c", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:52:51+08
027d7ec8-2d58-4372-988e-971640f74da1	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "027d7ec8-2d58-4372-988e-971640f74da1", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 14:56:24+08
627d7699-ee68-49ed-a9d3-ccf6f7d7f487	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "627d7699-ee68-49ed-a9d3-ccf6f7d7f487", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 15:03:27+08
f17f3036-7392-4f50-87b5-2fac0eea5a4b	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "f17f3036-7392-4f50-87b5-2fac0eea5a4b", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 15:14:32+08
42288e52-7493-48fe-b11a-fe60f94683db	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "42288e52-7493-48fe-b11a-fe60f94683db", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 15:44:58+08
19f2bcd3-8a35-414b-8f0a-fe6f8d0b3834	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "19f2bcd3-8a35-414b-8f0a-fe6f8d0b3834", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 15:51:02+08
9e2c02e7-68de-4cb9-a2c3-2a8e6011f367	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "9e2c02e7-68de-4cb9-a2c3-2a8e6011f367", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 15:57:14+08
1d1532c0-d3a0-43f2-862d-0cff4b84ab0a	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "1d1532c0-d3a0-43f2-862d-0cff4b84ab0a", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-19 15:59:16+08
0ed58a08-2ac1-4b1e-b8aa-931407bc335c	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "0ed58a08-2ac1-4b1e-b8aa-931407bc335c", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-20 10:00:57+08
112db930-7aa8-46f4-a964-21c85ac543cb	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "112db930-7aa8-46f4-a964-21c85ac543cb", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-20 10:13:17+08
a42b7965-7e83-4c2d-a6e8-756179235093	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "a42b7965-7e83-4c2d-a6e8-756179235093", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-20 11:37:30+08
33864458-2efe-4015-a2ac-067c1c7fa9ed	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "33864458-2efe-4015-a2ac-067c1c7fa9ed", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-20 15:27:20+08
14bbf298-960a-45a4-899d-be1ad0f9d567	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "14bbf298-960a-45a4-899d-be1ad0f9d567", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-20 16:23:07+08
f291b2c0-aeed-4148-91ca-eb8c0ca5cd0a	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "f291b2c0-aeed-4148-91ca-eb8c0ca5cd0a", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-20 16:52:13+08
914eb10e-4e7e-45b5-8a99-a7b3cd2f74c5	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "914eb10e-4e7e-45b5-8a99-a7b3cd2f74c5", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-20 16:58:22+08
309d0d03-123e-4153-ba37-8d920f72eccf	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "309d0d03-123e-4153-ba37-8d920f72eccf", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-20 16:59:11+08
256f8daf-2457-4f63-bd23-cb58b7e8ddab	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "256f8daf-2457-4f63-bd23-cb58b7e8ddab", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-21 18:07:39+08
cca8b764-a7d5-4b85-ba23-dd1f2cd10b29	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "cca8b764-a7d5-4b85-ba23-dd1f2cd10b29", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-22 09:15:26+08
ace7522e-3295-49e2-91b7-636a1c847d52	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "ace7522e-3295-49e2-91b7-636a1c847d52", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-24 13:30:02+08
a48eb8d0-c214-4750-b91e-5a25abc40e9b	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "a48eb8d0-c214-4750-b91e-5a25abc40e9b", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-05-25 14:03:18+08
d10c1d7d-80e1-4b43-9e46-8c8ba00ae1ad	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "d10c1d7d-80e1-4b43-9e46-8c8ba00ae1ad", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-06-04 14:23:27+08
8ebc8866-e000-476f-8ab0-14e60cdfa78f	{"id": 1, "name": "管理员", "post": null, "email": null, "phone": "15751773176", "token": "8ebc8866-e000-476f-8ab0-14e60cdfa78f", "delete": false, "enable": true, "username": "SuperAdmin", "authorized": true, "departmentId": 1, "userResources": ["TIANBAOXINXI", "REPORT_MANAGE", "REPORT_DOWN", "REPROT_CONFIG", "ORG_MANAGE", "ORG_MEMBER", "ORG_AUTH", "TIANBAOXINXI_CHANK", "TIANBAOXINXI_APPROVE", "TIANBAOXINXI_HZB_WRITE", "TIANBAOXINXI_HZB_APPROVE", "REPORT_EDIT"]}	2022-06-04 15:09:24+08
\.


--
-- Name: department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.department_id_seq', 565, true);


--
-- Name: places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.places_id_seq', 11, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_id_seq', 1, true);


--
-- Name: region_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.region_type_id_seq', 1, false);


--
-- Name: report_collection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.report_collection_id_seq', 145, true);


--
-- Name: report_configition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.report_configition_id_seq', 31, true);


--
-- Name: report_countyCollect_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."report_countyCollect_id_seq"', 26, true);


--
-- Name: report_downManage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."report_downManage_id_seq"', 132, true);


--
-- Name: report_template_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.report_template_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 36, true);


--
-- Name: user_placeSecurityRecord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."user_placeSecurityRecord_id_seq"', 12, true);


--
-- Name: user_resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_resource_id_seq', 48, true);


--
-- Name: department department_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pk PRIMARY KEY (id);


--
-- Name: places places_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_pk PRIMARY KEY (id);


--
-- Name: post post_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pk PRIMARY KEY (id);


--
-- Name: user_resource post_resource_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_resource
    ADD CONSTRAINT post_resource_pk PRIMARY KEY (id);


--
-- Name: region_type region_type_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.region_type
    ADD CONSTRAINT region_type_pk PRIMARY KEY (id);


--
-- Name: report_collection report_collection_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_collection
    ADD CONSTRAINT report_collection_pk PRIMARY KEY (id);


--
-- Name: report_configition report_configition_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_configition
    ADD CONSTRAINT report_configition_pk PRIMARY KEY (id);


--
-- Name: report_downManage report_downmanage_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."report_downManage"
    ADD CONSTRAINT report_downmanage_pk PRIMARY KEY (id);


--
-- Name: report_rectify report_rectify_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_rectify
    ADD CONSTRAINT report_rectify_pk PRIMARY KEY (id);


--
-- Name: report_template report_template_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_template
    ADD CONSTRAINT report_template_pk PRIMARY KEY (id);


--
-- Name: report_type report_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_type
    ADD CONSTRAINT report_type_pkey PRIMARY KEY (id);


--
-- Name: resource resource_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_pk PRIMARY KEY (code);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- Name: user_placeSecurityRecord user_placesecurityrecord_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user_placeSecurityRecord"
    ADD CONSTRAINT user_placesecurityrecord_pk PRIMARY KEY (id);


--
-- Name: user_token user_token_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_token
    ADD CONSTRAINT user_token_pk PRIMARY KEY (token);


--
-- Name: department_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX department_id_uindex ON public.department USING btree (id);


--
-- Name: places_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX places_id_uindex ON public.places USING btree (id);


--
-- Name: post_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX post_id_uindex ON public.post USING btree (id);


--
-- Name: region_type_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX region_type_id_uindex ON public.region_type USING btree (id);


--
-- Name: report_collection_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX report_collection_id_uindex ON public.report_collection USING btree (id);


--
-- Name: report_configition_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX report_configition_id_uindex ON public.report_configition USING btree (id);


--
-- Name: report_countycollect_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX report_countycollect_id_uindex ON public.report_rectify USING btree (id);


--
-- Name: report_downmanage_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX report_downmanage_id_uindex ON public."report_downManage" USING btree (id);


--
-- Name: report_template_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX report_template_id_uindex ON public.report_template USING btree (id);


--
-- Name: resource_code_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX resource_code_uindex ON public.resource USING btree (code);


--
-- Name: resource_name_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX resource_name_uindex ON public.resource USING btree (name);


--
-- Name: user_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_id_uindex ON public."user" USING btree (id);


--
-- Name: user_placesecurityrecord_id_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_placesecurityrecord_id_uindex ON public."user_placeSecurityRecord" USING btree (id);


--
-- Name: user_token_token_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_token_token_uindex ON public.user_token USING btree (token);


--
-- Name: places places_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT "places_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: post post_department_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_department_id_fk FOREIGN KEY (department_id) REFERENCES public.department(id);


--
-- Name: user_resource post_resource_post_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_resource
    ADD CONSTRAINT post_resource_post_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_resource post_resource_resource_code_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_resource
    ADD CONSTRAINT post_resource_resource_code_fk FOREIGN KEY (resource) REFERENCES public.resource(code);


--
-- Name: report_collection report_collection_department_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_collection
    ADD CONSTRAINT report_collection_department_id_fk FOREIGN KEY ("regionId") REFERENCES public.department(id);


--
-- Name: report_configition report_configition_department_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_configition
    ADD CONSTRAINT report_configition_department_id_fk FOREIGN KEY ("regionId") REFERENCES public.department(id);


--
-- Name: report_configition report_configuration_reportTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_configition
    ADD CONSTRAINT "report_configuration_reportTypeId_fkey" FOREIGN KEY ("reportTypeId") REFERENCES public.report_type(id);


--
-- Name: report_downManage report_downManage_regionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."report_downManage"
    ADD CONSTRAINT "report_downManage_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES public.department(id);


--
-- Name: report_downManage report_downManage_reportTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."report_downManage"
    ADD CONSTRAINT "report_downManage_reportTypeId_fkey" FOREIGN KEY ("reportTypeId") REFERENCES public.report_type(id);


--
-- Name: report_rectify report_rectify_department_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_rectify
    ADD CONSTRAINT report_rectify_department_id_fk FOREIGN KEY ("regionId") REFERENCES public.department(id);


--
-- Name: user_placeSecurityRecord user_placeSecurityRecord_audit1ManId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user_placeSecurityRecord"
    ADD CONSTRAINT "user_placeSecurityRecord_audit1ManId_fkey" FOREIGN KEY ("audit1ManId") REFERENCES public."user"(id);


--
-- Name: user_placeSecurityRecord user_placeSecurityRecord_audit2ManId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user_placeSecurityRecord"
    ADD CONSTRAINT "user_placeSecurityRecord_audit2ManId_fkey" FOREIGN KEY ("audit2ManId") REFERENCES public."user"(id);


--
-- Name: user_placeSecurityRecord user_placesecurityrecord_department_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user_placeSecurityRecord"
    ADD CONSTRAINT user_placesecurityrecord_department_id_fk FOREIGN KEY ("regionId") REFERENCES public.department(id);


--
-- Name: user_placeSecurityRecord user_placesecurityrecord_places_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user_placeSecurityRecord"
    ADD CONSTRAINT user_placesecurityrecord_places_id_fk FOREIGN KEY ("placeId") REFERENCES public.places(id);


--
-- Name: user_placeSecurityRecord user_placesecurityrecord_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user_placeSecurityRecord"
    ADD CONSTRAINT user_placesecurityrecord_user_id_fk FOREIGN KEY ("rejectManId") REFERENCES public."user"(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

