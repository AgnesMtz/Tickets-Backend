-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2023 at 07:27 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sgtickets`
--

-- --------------------------------------------------------

--
-- Table structure for table `auditory`
--

CREATE TABLE `auditory` (
  `id` int(11) NOT NULL,
  `table` varchar(30) NOT NULL,
  `itemId` int(11) NOT NULL,
  `actionTime` datetime NOT NULL,
  `worker` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `branchoffice`
--

CREATE TABLE `branchoffice` (
  `id` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `address` varchar(150) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `email` varchar(64) NOT NULL,
  `inCharge` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branchoffice`
--

INSERT INTO `branchoffice` (`id`, `clientId`, `address`, `phone`, `email`, `inCharge`, `active`) VALUES
(1, 8, 'Aqui al lado del Tec', '4434030289', 'hola@gmail.com', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `companyName` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `subscription` int(11) NOT NULL,
  `priority` int(11) NOT NULL,
  `workerInCharge` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `companyName`, `active`, `subscription`, `priority`, `workerInCharge`, `userId`) VALUES
(1, 'Gaytan Studio', 1, 1, 2, 8, 23),
(7, 'TAK', 1, 1, 3, 7, 29),
(8, 'Your Mom', 1, 3, 1, 8, 30);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `firstLastName` varchar(30) NOT NULL,
  `secondLastName` varchar(30) NOT NULL,
  `birthDate` date NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `clientId`, `name`, `firstLastName`, `secondLastName`, `birthDate`, `active`) VALUES
(1, 8, 'Lorenzo', 'Pica', 'Culeis', '2023-03-25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `duration`
--

CREATE TABLE `duration` (
  `id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `duration`
--

INSERT INTO `duration` (`id`, `type`) VALUES
(1, 'Una Sola Vez'),
(2, 'Todo el Mes'),
(3, 'Hasta FIN DE MES'),
(4, 'Hasta la fecha del Evento'),
(5, 'Una vez al Mes'),
(6, 'Dos veces al Mes'),
(7, 'Una semana'),
(8, 'Hasta terminar Material');

-- --------------------------------------------------------

--
-- Table structure for table `fechas`
--

CREATE TABLE `fechas` (
  `id` int(11) NOT NULL,
  `taskId` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `isDeleted` tinyint(4) NOT NULL,
  `pautaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `frequency`
--

CREATE TABLE `frequency` (
  `id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL,
  `monday` tinyint(1) NOT NULL,
  `tuesday` tinyint(1) NOT NULL,
  `wednesday` tinyint(1) NOT NULL,
  `thursday` tinyint(1) NOT NULL,
  `friday` tinyint(1) NOT NULL,
  `saturday` tinyint(1) NOT NULL,
  `sunday` tinyint(1) NOT NULL,
  `duration` int(11) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `frequency`
--

INSERT INTO `frequency` (`id`, `type`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`, `duration`, `state`) VALUES
(2, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(3, '', 1, 1, 0, 1, 0, 1, 1, 2, 0),
(4, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(5, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(6, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(7, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(8, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(9, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(10, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(11, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(12, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(13, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(14, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(15, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(16, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(17, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(18, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(19, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(20, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(21, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(22, '', 1, 1, 1, 1, 1, 1, 1, 2, 0),
(23, '', 1, 1, 1, 1, 1, 1, 1, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `originpetition`
--

CREATE TABLE `originpetition` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `originpetition`
--

INSERT INTO `originpetition` (`id`, `name`) VALUES
(1, 'Whatsapp - Mensaje'),
(2, 'Whatsapp - Audio'),
(3, 'Correo'),
(4, 'Llamada'),
(5, 'WEB - Ticket'),
(6, 'Reunión Cliente'),
(7, 'Sesión Fotográfica'),
(8, 'Petición Interna'),
(9, 'Parrilla Mensual'),
(10, 'Video'),
(11, 'Evento');

-- --------------------------------------------------------

--
-- Table structure for table `pauta`
--

CREATE TABLE `pauta` (
  `id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `approved` tinyint(1) NOT NULL,
  `clientId` int(11) NOT NULL,
  `isDeleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pauta`
--

INSERT INTO `pauta` (`id`, `active`, `approved`, `clientId`, `isDeleted`) VALUES
(30, 1, 0, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`id`, `name`) VALUES
(1, 'Director General'),
(2, 'Director Operativo'),
(3, 'Operador Creativo');

-- --------------------------------------------------------

--
-- Table structure for table `priority`
--

CREATE TABLE `priority` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `priority`
--

INSERT INTO `priority` (`id`, `name`) VALUES
(1, 'Urgente'),
(2, 'Importante'),
(3, 'Normal'),
(4, 'Programado');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `worker` int(11) NOT NULL,
  `hourEntry` time NOT NULL,
  `hourExit` time NOT NULL,
  `day` varchar(1) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `socialmedia`
--

CREATE TABLE `socialmedia` (
  `id` int(11) NOT NULL,
  `ticket` int(11) NOT NULL,
  `facebook` tinyint(1) NOT NULL,
  `instagram` tinyint(1) NOT NULL,
  `whatsapp` tinyint(1) NOT NULL,
  `linkedIn` tinyint(1) NOT NULL,
  `tiktok` tinyint(1) NOT NULL,
  `blog` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `socialmedia`
--

INSERT INTO `socialmedia` (`id`, `ticket`, `facebook`, `instagram`, `whatsapp`, `linkedIn`, `tiktok`, `blog`) VALUES
(1, 8, 1, 1, 1, 1, 1, 1),
(2, 9, 1, 1, 1, 1, 1, 1),
(3, 10, 1, 1, 1, 1, 1, 1),
(4, 11, 1, 1, 1, 1, 1, 1),
(5, 12, 1, 1, 1, 1, 1, 1),
(6, 13, 1, 1, 1, 1, 1, 1),
(7, 14, 1, 1, 1, 1, 1, 1),
(8, 15, 1, 1, 1, 1, 1, 1),
(9, 16, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`id`, `type`) VALUES
(1, 'Canceló la reunión'),
(2, 'Correcciones'),
(3, 'Revisión por Diseño'),
(4, 'en Autorización Cliente'),
(5, 'Terminado'),
(6, 'Proceso'),
(7, 'Pausa por Cliente'),
(8, 'Registrado'),
(9, 'Asignado'),
(10, 'Cancelado por GS'),
(11, 'En espera de información'),
(12, 'Cancelado por pago'),
(13, 'Propuesta'),
(14, 'Canceló Cliente'),
(15, 'Pausa por GS');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `name`) VALUES
(1, 'Basico'),
(2, 'Avanzado'),
(3, 'Premium');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `objetivo` varchar(50) NOT NULL,
  `tema` varchar(100) NOT NULL,
  `copy` text NOT NULL,
  `dif` varchar(100) DEFAULT NULL,
  `tipoContenido` varchar(50) NOT NULL,
  `plataforma` varchar(60) NOT NULL,
  `workerId` int(11) NOT NULL,
  `ticketId` int(11) DEFAULT NULL,
  `nuevo` tinyint(1) NOT NULL,
  `republicacion` tinyint(1) NOT NULL,
  `diseñoLink` varchar(150) DEFAULT NULL,
  `pautaId` int(11) NOT NULL,
  `isDeleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `objetivo`, `tema`, `copy`, `dif`, `tipoContenido`, `plataforma`, `workerId`, `ticketId`, `nuevo`, `republicacion`, `diseñoLink`, `pautaId`, `isDeleted`) VALUES
(29, 'Decir Hola mundo', 'SJshuhsiu', 'klhjsiuls', 'hsol', 'publicacion', 'Facebook', 8, NULL, 1, 0, '564154541', 30, 0),
(30, 'Decir Hola mundo', 'SJshuhsiu', 'klhjsiuls', 'hsol', 'publicacion', 'Facebook', 8, NULL, 1, 0, '564154541', 30, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `petition` varchar(100) NOT NULL,
  `originPetition` int(11) NOT NULL,
  `deadline` date NOT NULL,
  `priority` int(11) NOT NULL,
  `applicationDate` datetime NOT NULL,
  `serverLocation` varchar(100) NOT NULL,
  `activitie` varchar(50) NOT NULL,
  `ticketPurpose` int(11) NOT NULL,
  `frequency` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `deliveryDate` datetime NOT NULL,
  `notes` varchar(50) NOT NULL,
  `observations` varchar(50) NOT NULL,
  `corrections` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id`, `clientId`, `petition`, `originPetition`, `deadline`, `priority`, `applicationDate`, `serverLocation`, `activitie`, `ticketPurpose`, `frequency`, `state`, `deliveryDate`, `notes`, `observations`, `corrections`) VALUES
(8, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 15, 9, '2023-05-11 20:56:00', '456', '789', '101112'),
(9, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 16, 9, '2023-05-11 20:56:00', '456', '789', '101112'),
(10, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 17, 9, '2023-05-11 20:56:00', '456', '789', '101112'),
(11, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 18, 9, '2023-05-11 20:56:00', '456', '789', '101112'),
(12, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 19, 9, '2023-05-11 20:56:00', '456', '789', '101112'),
(13, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 20, 9, '2023-05-11 20:56:00', '456', '789', '101112'),
(14, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 21, 9, '2023-05-11 20:56:00', '456', '789', '101112'),
(15, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 22, 9, '2023-05-11 20:56:00', '456', '789', '101112'),
(16, 7, '123', 4, '2023-05-11', 3, '2023-05-11 20:58:00', '12312', '123213', 10, 23, 9, '2023-05-11 20:56:00', '456', '789', '101112');

-- --------------------------------------------------------

--
-- Table structure for table `ticketpurpose`
--

CREATE TABLE `ticketpurpose` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticketpurpose`
--

INSERT INTO `ticketpurpose` (`id`, `name`) VALUES
(1, 'Actualización de Datos'),
(2, 'Análisis'),
(3, 'Activación'),
(4, 'Impresión'),
(5, 'Galería RRSS'),
(6, 'Campaña RRSS'),
(7, 'Publicación RRSS'),
(8, 'WhatsApp'),
(9, 'Evento'),
(10, 'Historia Destacada'),
(11, 'Ebook'),
(12, 'Web'),
(13, 'Envío de Archivos'),
(14, 'Transmisión en Vivo'),
(15, 'Catálogo'),
(16, 'Video'),
(17, 'Planeación'),
(18, 'Carrusel Campaña'),
(19, 'Bocetaje'),
(20, 'Colaboradores'),
(21, 'Barrido Notificaciones'),
(22, 'ADM-Gestión'),
(23, 'Programación Actividades'),
(24, 'Revisión de Material'),
(25, 'Contacto Cliente'),
(26, 'Oficina'),
(27, 'Seguimiento Cuentas'),
(28, 'Metodología Interna'),
(29, 'Perifoneo'),
(30, 'Programar Historias'),
(31, 'Programar Publicación'),
(32, 'Publicar Galería (Album)'),
(33, 'Pantallas Publicitarias'),
(34, 'Presentación PPT'),
(35, 'Correo'),
(36, 'Catálogo Ebook'),
(37, 'Voz en off'),
(38, 'Diseño-Actualizaciones'),
(39, 'Diseño-Correcciones'),
(40, 'Propuesta'),
(41, 'Capacitación'),
(42, 'PDF'),
(43, 'Descarga de Material'),
(44, 'Networking'),
(45, 'Cobranza'),
(46, 'Capacitación al Personal'),
(47, 'Contabilidad'),
(48, 'Publicación Historias'),
(49, 'Logotipo');

-- --------------------------------------------------------

--
-- Table structure for table `ticketworker`
--

CREATE TABLE `ticketworker` (
  `worker` int(11) NOT NULL,
  `ticket` int(11) NOT NULL,
  `ticketCreator` tinyint(1) NOT NULL,
  `inCharge` tinyint(1) NOT NULL,
  `support` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticketworker`
--

INSERT INTO `ticketworker` (`worker`, `ticket`, `ticketCreator`, `inCharge`, `support`) VALUES
(11, 16, 11, 7, 7);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL COMMENT 'Contraseña encriptada',
  `createdAt` date DEFAULT NULL COMMENT 'Cuando se creo el usuario',
  `updatedAt` date DEFAULT NULL COMMENT 'Cuando se actualizo por ultima vez su informacion',
  `verified` tinyint(1) NOT NULL COMMENT 'Verificar si ya ha confirmado la cuenta',
  `token` varchar(250) DEFAULT NULL COMMENT 'Token generado para confirmar y recuperar password'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `createdAt`, `updatedAt`, `verified`, `token`) VALUES
(1, 'l19121050@morelia.tecnm.mx', '$2b$10$1EoS1bgYQ7J5S1P//adXBub/aTA6ozMNXuxxuZMJ4O3AcXQH2B82a', NULL, NULL, 0, NULL),
(16, '19121075@morelia.tecnm.mx', '$2b$10$OUicUEhtBlTyy9j6x6QIkO1YYCMKS4o185BhJir.iflDTpKTSnvBO', '2023-03-15', '2023-03-15', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6IjE5MTIxMDc1QG1vcmVsaWEudGVjbm0ubXgiLCJpYXQiOjE2Nzk2MDM1NzB9-6hsnzAtW_HkiA6S5Tx59Sl_zHbDivObfvCTiT8tBIc'),
(17, 'pepe@gmail.com', '$2b$10$wh7bApKQ/6gp.BCrpIIRvOQrRrAX1rTqC96TuPC0fqA9a3l5ddYgy', '2023-03-16', '2023-03-16', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhnN29qaDE4azRvMWdybG1hajM3IiwiaWF0IjoxNjc4OTg2NTI5LCJ'),
(18, 'ulises@gmail.com', '$2b$10$4iJqdjmWCrf///QFGFKgUOpIQXY9gFtZGPs25ENBbdU3vcM4hHxlm', '2023-03-16', '2023-03-16', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExamhlNHNjMjc4MWdybG12YW5qIiwiaWF0IjoxNjc4OTg3MjA5LCJ'),
(19, 'pablo@gmail.com', '$2b$10$0mP/kD7xZH3TicugssFCx.Rf7UtbT3eudBYDaOrOJo6OxlXwsUNtO', '2023-03-16', '2023-03-16', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwYmdxZXJuNjFvMWdybHBucm0zIiwiaWF0IjoxNjc4OTkwMTEwLCJ'),
(20, 'hector@gmail.com', '$2b$10$SsEFi0qOuaFrrFjRih.vBe.tFAV344DG/tijX/Eg.B2NZwOVsIRyO', '2023-03-17', '2023-03-17', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFvMnB2aGlnODhvMWdybzY4cmU2IiwiaWF0IjoxNjc5MDcwMzU4LCJ'),
(21, 'pollo@gmail.com', '$2b$10$LngX/yz6QG2040jKStf3rOSr4OyFwJQ6otClj6gJVXTrrUDlhIUna', '2023-03-17', '2023-03-17', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijlzb252NGdqc3BnMWdybzZxcXZ1IiwiaWF0IjoxNjc5MDcwOTQ4LCJ'),
(22, 'diejoruiz1993@gmail.com', '$2b$10$abW2F5QcLU8jXokD1Oxoke5MCs3z0S11ULZsRp0rJ1P5m0KBOytxq', '2023-03-17', '2023-03-17', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpZWpvcnVpejE5OTNAZ21haWwuY29tIiwiaWF0IjoxNjc5MDc'),
(23, 'gaytan@gmail.com', '$2b$10$ssFbWLFaojdMimopTIIeO.ftfuCL6onr71ujSfbCNbljKMIQNhmSS', '2023-03-22', '2023-03-22', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0cnZucGVnaDA4MWdzNTZwOXExIiwiaWF0IjoxNjc5NTA3MTA1LCJleHAiOjE2ODIwOTkxMDV9.5MhIws136Ti48eH1b5Ra_fO8hS12FLeP1zZryRLEq3w'),
(29, 'tak@gmail.com', '$2b$10$TeVCSXrzDtrra.ffbkFwvuIYWIYmO6vIXoC5b4K5vdPywWimmauLC', '2023-03-23', '2023-03-23', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im0yMXVocHRpN2ZnMWdzN3V1MHFvIiwiaWF0IjoxNjc5NTk5NTM0LCJleHAiOjE2ODIxOTE1MzR9.mS-TTbsn-ePyJEkoJ2WcR5-WVg1hH_z2PFRVBoImRxU'),
(30, 'mom@gmail.com', '$2b$10$ovBZ/R/eqZ0agRR9eQ9Iv.AQAoL6aY1esD.udoHD5UOB7KugeIpXm', '2023-03-23', '2023-03-23', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlYXQ1djh1b21vMWdzN3YxMjJrIiwiaWF0IjoxNjc5NTk5NjM0LCJleHAiOjE2ODIxOTE2MzR9.pyNQ9AgVLWXgJnb_AYY5edYlUCWq9Mr8wN2V50aOEaY');

-- --------------------------------------------------------

--
-- Table structure for table `worker`
--

CREATE TABLE `worker` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `dateJoined` date NOT NULL,
  `birthDate` date NOT NULL,
  `emerPhone` varchar(13) NOT NULL,
  `name` varchar(30) NOT NULL,
  `firstLastName` varchar(30) NOT NULL,
  `secondLastName` varchar(30) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `gender` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `worker`
--

INSERT INTO `worker` (`id`, `userId`, `position`, `active`, `dateJoined`, `birthDate`, `emerPhone`, `name`, `firstLastName`, `secondLastName`, `phone`, `gender`) VALUES
(6, 16, 1, 1, '2010-11-06', '2001-11-30', '+524436712615', 'Diego', 'Ruiz', 'Ayala', '+524434030289', 'M'),
(7, 17, 3, 1, '2023-03-16', '2023-03-16', '+524436712615', 'Jose Daniel', 'Velazquez', 'Herrera', '+524434030289', 'M'),
(8, 18, 3, 1, '2023-03-16', '2023-03-16', '+524436712615', 'Ulises', 'Tutorial', 'Ferreyra', '+524434030289', 'F'),
(9, 19, 1, 1, '2023-03-16', '2023-03-16', '+524436712615', 'Pablo', 'Juarez', 'Castillo', '+524434030289', 'M'),
(11, 21, 2, 1, '2023-03-17', '2023-03-17', '+524436712615', 'Hectora', 'Reyes', 'Reyes', '+524434030289', 'F'),
(12, 22, 1, 1, '2023-03-17', '2023-03-17', '+524436712615', 'Ichigo', 'Ruiz', 'Ayala', '+524434030289', 'M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auditory`
--
ALTER TABLE `auditory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_worker_auditory` (`worker`);

--
-- Indexes for table `branchoffice`
--
ALTER TABLE `branchoffice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_client_branchoffice` (`clientId`),
  ADD KEY `fk_contact_branchoffice` (`inCharge`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_subscription_client` (`subscription`),
  ADD KEY `fk_priority_client` (`priority`),
  ADD KEY `fk_worker_client` (`workerInCharge`),
  ADD KEY `fk_user_client` (`userId`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_client_contact` (`clientId`);

--
-- Indexes for table `duration`
--
ALTER TABLE `duration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fechas`
--
ALTER TABLE `fechas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_task_fecha` (`taskId`),
  ADD KEY `fk_pauta_fecha` (`pautaId`);

--
-- Indexes for table `frequency`
--
ALTER TABLE `frequency`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ duration_frequency` (`duration`);

--
-- Indexes for table `originpetition`
--
ALTER TABLE `originpetition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pauta`
--
ALTER TABLE `pauta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cliente_pauta` (`clientId`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `priority`
--
ALTER TABLE `priority`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_worker_schedule` (`worker`);

--
-- Indexes for table `socialmedia`
--
ALTER TABLE `socialmedia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ticket_socialmedia` (`ticket`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ticket_task` (`ticketId`),
  ADD KEY `fk_worker_task` (`workerId`),
  ADD KEY `fk_pauta_task` (`pautaId`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_client_ticket` (`clientId`),
  ADD KEY `fk_originpetition_ticket` (`originPetition`),
  ADD KEY `fk_priority_ticket` (`priority`),
  ADD KEY `fk_ticketpurpose_ticket` (`ticketPurpose`),
  ADD KEY `fk_frequency_ticket` (`frequency`),
  ADD KEY `fk_state_tickets` (`state`);

--
-- Indexes for table `ticketpurpose`
--
ALTER TABLE `ticketpurpose`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticketworker`
--
ALTER TABLE `ticketworker`
  ADD KEY `fk_worker_ticketworker` (`worker`),
  ADD KEY `fk_ticket_ticketworker` (`ticket`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_position_worker` (`position`),
  ADD KEY `fk_user_worker` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auditory`
--
ALTER TABLE `auditory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branchoffice`
--
ALTER TABLE `branchoffice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `duration`
--
ALTER TABLE `duration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `fechas`
--
ALTER TABLE `fechas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `frequency`
--
ALTER TABLE `frequency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `originpetition`
--
ALTER TABLE `originpetition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pauta`
--
ALTER TABLE `pauta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `priority`
--
ALTER TABLE `priority`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `socialmedia`
--
ALTER TABLE `socialmedia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `ticketpurpose`
--
ALTER TABLE `ticketpurpose`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `worker`
--
ALTER TABLE `worker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auditory`
--
ALTER TABLE `auditory`
  ADD CONSTRAINT `fk_worker_auditory` FOREIGN KEY (`worker`) REFERENCES `worker` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `branchoffice`
--
ALTER TABLE `branchoffice`
  ADD CONSTRAINT `fk_client_branchoffice` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_contact_branchoffice` FOREIGN KEY (`inCharge`) REFERENCES `contact` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `fk_subscription_client` FOREIGN KEY (`subscription`) REFERENCES `subscription` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_client` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_worker_client` FOREIGN KEY (`workerInCharge`) REFERENCES `worker` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `fk_client_contact` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `fechas`
--
ALTER TABLE `fechas`
  ADD CONSTRAINT `fk_pauta_fecha` FOREIGN KEY (`pautaId`) REFERENCES `pauta` (`id`),
  ADD CONSTRAINT `fk_task_fecha` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `frequency`
--
ALTER TABLE `frequency`
  ADD CONSTRAINT `fk_ duration_frequency` FOREIGN KEY (`duration`) REFERENCES `duration` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pauta`
--
ALTER TABLE `pauta`
  ADD CONSTRAINT `fk_cliente_pauta` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `fk_worker_schedule` FOREIGN KEY (`worker`) REFERENCES `worker` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `socialmedia`
--
ALTER TABLE `socialmedia`
  ADD CONSTRAINT `fk_ticket_socialmedia` FOREIGN KEY (`ticket`) REFERENCES `ticket` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_pauta_task` FOREIGN KEY (`pautaId`) REFERENCES `pauta` (`id`),
  ADD CONSTRAINT `fk_ticket_task` FOREIGN KEY (`ticketId`) REFERENCES `ticket` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_worker_task` FOREIGN KEY (`workerId`) REFERENCES `worker` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `fk_client_ticket` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_frequency_ticket` FOREIGN KEY (`frequency`) REFERENCES `frequency` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_originpetition_ticket` FOREIGN KEY (`originPetition`) REFERENCES `originpetition` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_priority_ticket` FOREIGN KEY (`priority`) REFERENCES `priority` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_state_tickets` FOREIGN KEY (`state`) REFERENCES `state` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ticketpurpose_ticket` FOREIGN KEY (`ticketPurpose`) REFERENCES `ticketpurpose` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `ticketworker`
--
ALTER TABLE `ticketworker`
  ADD CONSTRAINT `fk_ticket_ticketworker` FOREIGN KEY (`ticket`) REFERENCES `ticket` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_worker_ticketworker` FOREIGN KEY (`worker`) REFERENCES `worker` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `worker`
--
ALTER TABLE `worker`
  ADD CONSTRAINT `fk_position_worker` FOREIGN KEY (`position`) REFERENCES `position` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_worker` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
