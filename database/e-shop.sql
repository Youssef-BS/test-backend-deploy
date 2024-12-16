-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2024 at 05:12 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `MarketId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`, `MarketId`) VALUES
(1, 'Moving Lights', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 1),
(2, 'Led Par', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 1),
(3, 'Stage Lighting', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 1),
(4, 'Static Led', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 1),
(5, 'Battery Operated', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 1),
(6, 'Led Strobe', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 1),
(7, 'Laser', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 1),
(8, 'Line Arrays', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 2),
(9, 'Colomun PA Systems', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 2),
(10, 'Active Speakers', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 2),
(11, 'Passive Speakers', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 2),
(12, 'Installation Speakers', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 2),
(13, 'Power Amplifiers', '2024-04-24 17:11:24', '2024-04-24 17:11:24', 2);

-- --------------------------------------------------------

--
-- Table structure for table `featuredproducts`
--

CREATE TABLE `featuredproducts` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `featuredproducts`
--

INSERT INTO `featuredproducts` (`id`, `createdAt`, `updatedAt`, `ProductId`) VALUES
(1, '2024-05-14 14:12:54', '2024-05-14 14:12:54', 1),
(2, '2024-05-14 14:12:54', '2024-05-14 14:12:54', 7),
(3, '2024-05-14 14:12:54', '2024-05-14 14:12:54', 1),
(4, '2024-05-14 14:12:54', '2024-05-14 14:12:54', 7);

-- --------------------------------------------------------

--
-- Table structure for table `markets`
--

CREATE TABLE `markets` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categories` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `markets`
--

INSERT INTO `markets` (`id`, `name`, `image`, `createdAt`, `updatedAt`, `categories`) VALUES
(1, 'FOS Technologies', 'uploads/thumbnails/categories_0_cat_image_172.png.thumb_40x37.png', '2024-04-24 17:04:22', '2024-04-24 17:04:22', 0),
(2, 'Intelligent Audio', 'uploads/thumbnails/categories_0_cat_image_173.png.thumb_47x37.png', '2024-04-24 17:04:22', '2024-04-24 17:04:22', 0);

-- --------------------------------------------------------

--
-- Table structure for table `newsrooms`
--

CREATE TABLE `newsrooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `newsrooms`
--

INSERT INTO `newsrooms` (`id`, `name`, `productId`, `createdAt`, `updatedAt`) VALUES
(1, '....', 1, '2024-05-14 13:03:01', '2024-05-14 13:03:01'),
(2, '..', 8, '2024-05-14 13:03:01', '2024-05-14 13:03:01'),
(3, '....', 1, '2024-05-14 13:03:01', '2024-05-14 13:03:01'),
(4, '..', 8, '2024-05-14 13:03:01', '2024-05-14 13:03:01');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `extra_image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra_image`)),
  `extra_video` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra_video`)),
  `price` float NOT NULL,
  `availability` varchar(255) NOT NULL,
  `stock_eta` varchar(255) DEFAULT NULL,
  `features` varchar(255) NOT NULL,
  `technical_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`technical_details`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `MarketId` int(11) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `SubcategoryId` int(11) DEFAULT NULL,
  `SubSubcategoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `code`, `title`, `description`, `image`, `extra_image`, `extra_video`, `price`, `availability`, `stock_eta`, `features`, `technical_details`, `createdAt`, `updatedAt`, `MarketId`, `CategoryId`, `SubcategoryId`, `SubSubcategoryId`) VALUES
(1, 'L006793', 'FOS Ares Profile', 'Professional low noise Led profile moving head for stages and theater applications, high power 600W LED engine module, 4-55° linear zoom, intelligent fan, noise 45dB, Framing system: 4 Blades with +/-45° rotation, Color system: CMY + independent CTO, Animation wheel, Iris, 7 interchangeable rotating and 7 static gobos, 6 dichroic color filters, 4-facet prism, 0-100% linear frost, Linear Dimmer 0-100%, 32kg.', 'https://www.fos-lighting.eu/uploads/products_0_image_2748.jpg', '[\"https://www.fos-lighting.eu/uploads/products_1_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_2_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_3_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_4_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_5_image_2748.jpg\"]', NULL, 2498, 'Out of stock', 'in the last week of April 2024', 'https://www.youtube.com/embed/PAhbZ_wBZUQ', '{\"technical_details_1\":{\"technical_details_title\":\"Product description\",\"technical_details_description\":\"Profile moving head, with maximum light shaping capabilities, and CRI: ≥ 70 suitable for event, theater, and tv applications, Intelligent fan, noise levels from 45 DB. Modular design for easy production, testing, and maintenance. X / Y positioning is smooth and accurate, ±1°, Magnetic encoder technology. Lens diameter 149 with up to 53.5 degrees linear smooth zoom. 4 blades move smoothly, and bi-directional control.\"},\"technical_details_2\":{\"technical_details_title\":\"Light Source / Optics\",\"technical_details_description\":\"High Power 600 Watt LED, with an approximate lifespan of 20,000 hours. Motorized zoom from 4.5 to 53.5 degrees. Linear dimming & 4 dimmer curves.\"},\"technical_details_3\":{\"technical_details_title\":\"Mechanical effects\",\"technical_details_description\":\"CMY & CTO linear color mixing system. 6x dichroic color & rainbow effect. Slide-in and continuous rotating animation wheel. 7x interchangeable rotating gobos. 7x fixed gobos. Soft edge and hard edge frost filters with immediate or linear insertion. 4-Facet rotating prism. Motorized iris with linear control (5 to 100%).\"},\"technical_details_4\":{\"technical_details_title\":\"Framing System\",\"technical_details_description\":\"4x blades with insertion and angle control of +/- 45 degrees. Full coverage of the light path. A single blade can block the light output completely. Rotation of the framing system from 0 to 45 degrees.\"},\"technical_details_5\":{\"technical_details_title\":\"Technical Specifications\",\"technical_details_description\":\"CRI ≥ 70, suitable for events. Input voltage: AC100 - 240 Volt. Maximum power consumption: 800W. 3 & 5 pin XLR for DMX connection. DMX Control with 29, 34 or 37 CH. IP20, for indoor use only. Working temperature from 0 to 45 degrees Celsius. Cooling fan smart control, noise levels from 45 to 57 dB. Dimensions: 374 x 355 x 736 mm. Net weight: 32 Kg.\"},\"technical_details_6\":{\"technical_details_title\":\"Packing Details\",\"technical_details_description\":\"Carton box for 1 pc: 71 x 61 x 72 cm - 35 kg\"}}', '2024-05-01 13:49:21', '2024-05-01 13:49:21', NULL, NULL, NULL, NULL),
(2, 'L005586', 'FOS Triton', 'Professional Beam/Spot/Wash moving head, 360w High Brightness White Led, Beam angle: 3°to 36 ° motorized zoom, 10-60 ° frost mode ,Linear CMY+CTO, Color wheel: 10+1 colors, 7 custom interchangeable rotating gobo, 6 fixed gobos, Rotating 8 facets prism, Powercon In/out ,Low noise operation , 21kg.', 'https://www.fos-lighting.eu/uploads/products_0_image_662.jpg', '[\"https://www.fos-lighting.eu/uploads/products_1_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_2_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_3_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_4_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_5_image_662.jpg\"]', '\"https://www.youtube.com/embed/0oY-Q_XiW1o\"', 1473, 'Out of stock', 'in the 4rth week of March 2024', 'https://www.youtube.com/embed/wOtnnheHn6g', '{\"technical_details_1\":{\"technical_details_title\":\"Light Source / Optics\",\"technical_details_description\":\"Light source: 360 Watt LED, 5800 K Life span: 50,000 hours (approximate). Linear zoom from 3,6 to 36 degrees. Motorized focus.\"},\"technical_details_2\":{\"technical_details_title\":\"Effects\",\"technical_details_description\":\"Linear dimming and strobe effects. Linear CTO and CMY color mixing system. 1 Rotating Gobo wheel with 7 interchangeable Gobos Rotating Gobos Dimensions : external diameter: 26mm, internal diameter: 15mm 1 Static Gobo wheel with 6 fixed Gobos. 1 color wheel with 10 dichroic colors (includes CTO & CTB color correction filters). Frost filter. 8F prism. Motorized zoom and focus. Selectable Pan and Tilt ranges: 540/630/360 degrees Pan & 270/180/90 degrees Tilt.\"},\"technical_details_3\":{\"technical_details_title\":\"Control\",\"technical_details_description\":\"DMX Control with 20 or 18 channels. Auto function with 9 internal programs. Sound mode.\"},\"technical_details_4\":{\"technical_details_title\":\"Installation / Dimension Details\",\"technical_details_description\":\"Power supply: AC 90 - 260 Volt, 50/60 Hz. Power consumption: 500W Dimensions: 379 x 255 x 585 mm Packaging dimensions: 510 x 470 x 650 mm Net weight: 21,5 Kgs Gros weight: 24 Kgs\"}}', '2024-05-01 13:49:21', '2024-05-01 13:49:21', 1, 1, 1, NULL),
(3, 'L006793', 'FOS Ares Profile', 'Professional low noise Led profile moving head for stages and theater applications, high power 600W LED engine module, 4-55° linear zoom, intelligent fan, noise 45dB, Framing system: 4 Blades with +/-45° rotation, Color system: CMY + independent CTO, Animation wheel, Iris, 7 interchangeable rotating and 7 static gobos, 6 dichroic color filters, 4-facet prism, 0-100% linear frost, Linear Dimmer 0-100%, 32kg.', 'https://www.fos-lighting.eu/uploads/products_0_image_2748.jpg', '[\"https://www.fos-lighting.eu/uploads/products_1_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_2_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_3_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_4_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_5_image_2748.jpg\"]', NULL, 2498, 'Out of stock', 'in the last week of April 2024', 'https://www.youtube.com/embed/PAhbZ_wBZUQ', '{\"technical_details_1\":{\"technical_details_title\":\"Product description\",\"technical_details_description\":\"Profile moving head, with maximum light shaping capabilities, and CRI: ≥ 70 suitable for event, theater, and tv applications, Intelligent fan, noise levels from 45 DB. Modular design for easy production, testing, and maintenance. X / Y positioning is smooth and accurate, ±1°, Magnetic encoder technology. Lens diameter 149 with up to 53.5 degrees linear smooth zoom. 4 blades move smoothly, and bi-directional control.\"},\"technical_details_2\":{\"technical_details_title\":\"Light Source / Optics\",\"technical_details_description\":\"High Power 600 Watt LED, with an approximate lifespan of 20,000 hours. Motorized zoom from 4.5 to 53.5 degrees. Linear dimming & 4 dimmer curves.\"},\"technical_details_3\":{\"technical_details_title\":\"Mechanical effects\",\"technical_details_description\":\"CMY & CTO linear color mixing system. 6x dichroic color & rainbow effect. Slide-in and continuous rotating animation wheel. 7x interchangeable rotating gobos. 7x fixed gobos. Soft edge and hard edge frost filters with immediate or linear insertion. 4-Facet rotating prism. Motorized iris with linear control (5 to 100%).\"},\"technical_details_4\":{\"technical_details_title\":\"Framing System\",\"technical_details_description\":\"4x blades with insertion and angle control of +/- 45 degrees. Full coverage of the light path. A single blade can block the light output completely. Rotation of the framing system from 0 to 45 degrees.\"},\"technical_details_5\":{\"technical_details_title\":\"Technical Specifications\",\"technical_details_description\":\"CRI ≥ 70, suitable for events. Input voltage: AC100 - 240 Volt. Maximum power consumption: 800W. 3 & 5 pin XLR for DMX connection. DMX Control with 29, 34 or 37 CH. IP20, for indoor use only. Working temperature from 0 to 45 degrees Celsius. Cooling fan smart control, noise levels from 45 to 57 dB. Dimensions: 374 x 355 x 736 mm. Net weight: 32 Kg.\"},\"technical_details_6\":{\"technical_details_title\":\"Packing Details\",\"technical_details_description\":\"Carton box for 1 pc: 71 x 61 x 72 cm - 35 kg\"}}', '2024-05-01 13:50:52', '2024-05-01 13:50:52', NULL, NULL, NULL, NULL),
(4, 'L005586', 'FOS Triton', 'Professional Beam/Spot/Wash moving head, 360w High Brightness White Led, Beam angle: 3°to 36 ° motorized zoom, 10-60 ° frost mode ,Linear CMY+CTO, Color wheel: 10+1 colors, 7 custom interchangeable rotating gobo, 6 fixed gobos, Rotating 8 facets prism, Powercon In/out ,Low noise operation , 21kg.', 'https://www.fos-lighting.eu/uploads/products_0_image_662.jpg', '[\"https://www.fos-lighting.eu/uploads/products_1_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_2_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_3_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_4_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_5_image_662.jpg\"]', '\"https://www.youtube.com/embed/0oY-Q_XiW1o\"', 1473, 'Out of stock', 'in the 4rth week of March 2024', 'https://www.youtube.com/embed/wOtnnheHn6g', '{\"technical_details_1\":{\"technical_details_title\":\"Light Source / Optics\",\"technical_details_description\":\"Light source: 360 Watt LED, 5800 K Life span: 50,000 hours (approximate). Linear zoom from 3,6 to 36 degrees. Motorized focus.\"},\"technical_details_2\":{\"technical_details_title\":\"Effects\",\"technical_details_description\":\"Linear dimming and strobe effects. Linear CTO and CMY color mixing system. 1 Rotating Gobo wheel with 7 interchangeable Gobos Rotating Gobos Dimensions : external diameter: 26mm, internal diameter: 15mm 1 Static Gobo wheel with 6 fixed Gobos. 1 color wheel with 10 dichroic colors (includes CTO & CTB color correction filters). Frost filter. 8F prism. Motorized zoom and focus. Selectable Pan and Tilt ranges: 540/630/360 degrees Pan & 270/180/90 degrees Tilt.\"},\"technical_details_3\":{\"technical_details_title\":\"Control\",\"technical_details_description\":\"DMX Control with 20 or 18 channels. Auto function with 9 internal programs. Sound mode.\"},\"technical_details_4\":{\"technical_details_title\":\"Installation / Dimension Details\",\"technical_details_description\":\"Power supply: AC 90 - 260 Volt, 50/60 Hz. Power consumption: 500W Dimensions: 379 x 255 x 585 mm Packaging dimensions: 510 x 470 x 650 mm Net weight: 21,5 Kgs Gros weight: 24 Kgs\"}}', '2024-05-01 13:50:52', '2024-05-01 13:50:52', 1, 1, 1, NULL),
(5, 'L006793', 'FOS Ares Profile', 'Professional low noise Led profile moving head for stages and theater applications, high power 600W LED engine module, 4-55° linear zoom, intelligent fan, noise 45dB, Framing system: 4 Blades with +/-45° rotation, Color system: CMY + independent CTO, Animation wheel, Iris, 7 interchangeable rotating and 7 static gobos, 6 dichroic color filters, 4-facet prism, 0-100% linear frost, Linear Dimmer 0-100%, 32kg.', 'https://www.fos-lighting.eu/uploads/products_0_image_2748.jpg', '[\"https://www.fos-lighting.eu/uploads/products_1_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_2_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_3_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_4_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_5_image_2748.jpg\"]', NULL, 2498, 'Out of stock', 'in the last week of April 2024', 'https://www.youtube.com/embed/PAhbZ_wBZUQ', '{\"technical_details_1\":{\"technical_details_title\":\"Product description\",\"technical_details_description\":\"Profile moving head, with maximum light shaping capabilities, and CRI: ≥ 70 suitable for event, theater, and tv applications, Intelligent fan, noise levels from 45 DB. Modular design for easy production, testing, and maintenance. X / Y positioning is smooth and accurate, ±1°, Magnetic encoder technology. Lens diameter 149 with up to 53.5 degrees linear smooth zoom. 4 blades move smoothly, and bi-directional control.\"},\"technical_details_2\":{\"technical_details_title\":\"Light Source / Optics\",\"technical_details_description\":\"High Power 600 Watt LED, with an approximate lifespan of 20,000 hours. Motorized zoom from 4.5 to 53.5 degrees. Linear dimming & 4 dimmer curves.\"},\"technical_details_3\":{\"technical_details_title\":\"Mechanical effects\",\"technical_details_description\":\"CMY & CTO linear color mixing system. 6x dichroic color & rainbow effect. Slide-in and continuous rotating animation wheel. 7x interchangeable rotating gobos. 7x fixed gobos. Soft edge and hard edge frost filters with immediate or linear insertion. 4-Facet rotating prism. Motorized iris with linear control (5 to 100%).\"},\"technical_details_4\":{\"technical_details_title\":\"Framing System\",\"technical_details_description\":\"4x blades with insertion and angle control of +/- 45 degrees. Full coverage of the light path. A single blade can block the light output completely. Rotation of the framing system from 0 to 45 degrees.\"},\"technical_details_5\":{\"technical_details_title\":\"Technical Specifications\",\"technical_details_description\":\"CRI ≥ 70, suitable for events. Input voltage: AC100 - 240 Volt. Maximum power consumption: 800W. 3 & 5 pin XLR for DMX connection. DMX Control with 29, 34 or 37 CH. IP20, for indoor use only. Working temperature from 0 to 45 degrees Celsius. Cooling fan smart control, noise levels from 45 to 57 dB. Dimensions: 374 x 355 x 736 mm. Net weight: 32 Kg.\"},\"technical_details_6\":{\"technical_details_title\":\"Packing Details\",\"technical_details_description\":\"Carton box for 1 pc: 71 x 61 x 72 cm - 35 kg\"}}', '2024-05-01 13:50:54', '2024-05-01 13:50:54', NULL, NULL, NULL, NULL),
(6, 'L005586', 'FOS Triton', 'Professional Beam/Spot/Wash moving head, 360w High Brightness White Led, Beam angle: 3°to 36 ° motorized zoom, 10-60 ° frost mode ,Linear CMY+CTO, Color wheel: 10+1 colors, 7 custom interchangeable rotating gobo, 6 fixed gobos, Rotating 8 facets prism, Powercon In/out ,Low noise operation , 21kg.', 'https://www.fos-lighting.eu/uploads/products_0_image_662.jpg', '[\"https://www.fos-lighting.eu/uploads/products_1_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_2_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_3_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_4_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_5_image_662.jpg\"]', '\"https://www.youtube.com/embed/0oY-Q_XiW1o\"', 1473, 'Out of stock', 'in the 4rth week of March 2024', 'https://www.youtube.com/embed/wOtnnheHn6g', '{\"technical_details_1\":{\"technical_details_title\":\"Light Source / Optics\",\"technical_details_description\":\"Light source: 360 Watt LED, 5800 K Life span: 50,000 hours (approximate). Linear zoom from 3,6 to 36 degrees. Motorized focus.\"},\"technical_details_2\":{\"technical_details_title\":\"Effects\",\"technical_details_description\":\"Linear dimming and strobe effects. Linear CTO and CMY color mixing system. 1 Rotating Gobo wheel with 7 interchangeable Gobos Rotating Gobos Dimensions : external diameter: 26mm, internal diameter: 15mm 1 Static Gobo wheel with 6 fixed Gobos. 1 color wheel with 10 dichroic colors (includes CTO & CTB color correction filters). Frost filter. 8F prism. Motorized zoom and focus. Selectable Pan and Tilt ranges: 540/630/360 degrees Pan & 270/180/90 degrees Tilt.\"},\"technical_details_3\":{\"technical_details_title\":\"Control\",\"technical_details_description\":\"DMX Control with 20 or 18 channels. Auto function with 9 internal programs. Sound mode.\"},\"technical_details_4\":{\"technical_details_title\":\"Installation / Dimension Details\",\"technical_details_description\":\"Power supply: AC 90 - 260 Volt, 50/60 Hz. Power consumption: 500W Dimensions: 379 x 255 x 585 mm Packaging dimensions: 510 x 470 x 650 mm Net weight: 21,5 Kgs Gros weight: 24 Kgs\"}}', '2024-05-01 13:50:55', '2024-05-01 13:50:55', 1, 1, 1, NULL),
(7, 'L006793', 'FOS Ares Profile', 'Professional low noise Led profile moving head for stages and theater applications, high power 600W LED engine module, 4-55° linear zoom, intelligent fan, noise 45dB, Framing system: 4 Blades with +/-45° rotation, Color system: CMY + independent CTO, Animation wheel, Iris, 7 interchangeable rotating and 7 static gobos, 6 dichroic color filters, 4-facet prism, 0-100% linear frost, Linear Dimmer 0-100%, 32kg.', 'https://www.fos-lighting.eu/uploads/products_0_image_2748.jpg', '[\"https://www.fos-lighting.eu/uploads/products_1_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_2_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_3_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_4_image_2748.jpg\",\"https://www.fos-lighting.eu/uploads/products_5_image_2748.jpg\"]', NULL, 2498, 'Out of stock', 'in the last week of April 2024', 'https://www.youtube.com/embed/PAhbZ_wBZUQ', '{\"technical_details_1\":{\"technical_details_title\":\"Product description\",\"technical_details_description\":\"Profile moving head, with maximum light shaping capabilities, and CRI: ≥ 70 suitable for event, theater, and tv applications, Intelligent fan, noise levels from 45 DB. Modular design for easy production, testing, and maintenance. X / Y positioning is smooth and accurate, ±1°, Magnetic encoder technology. Lens diameter 149 with up to 53.5 degrees linear smooth zoom. 4 blades move smoothly, and bi-directional control.\"},\"technical_details_2\":{\"technical_details_title\":\"Light Source / Optics\",\"technical_details_description\":\"High Power 600 Watt LED, with an approximate lifespan of 20,000 hours. Motorized zoom from 4.5 to 53.5 degrees. Linear dimming & 4 dimmer curves.\"},\"technical_details_3\":{\"technical_details_title\":\"Mechanical effects\",\"technical_details_description\":\"CMY & CTO linear color mixing system. 6x dichroic color & rainbow effect. Slide-in and continuous rotating animation wheel. 7x interchangeable rotating gobos. 7x fixed gobos. Soft edge and hard edge frost filters with immediate or linear insertion. 4-Facet rotating prism. Motorized iris with linear control (5 to 100%).\"},\"technical_details_4\":{\"technical_details_title\":\"Framing System\",\"technical_details_description\":\"4x blades with insertion and angle control of +/- 45 degrees. Full coverage of the light path. A single blade can block the light output completely. Rotation of the framing system from 0 to 45 degrees.\"},\"technical_details_5\":{\"technical_details_title\":\"Technical Specifications\",\"technical_details_description\":\"CRI ≥ 70, suitable for events. Input voltage: AC100 - 240 Volt. Maximum power consumption: 800W. 3 & 5 pin XLR for DMX connection. DMX Control with 29, 34 or 37 CH. IP20, for indoor use only. Working temperature from 0 to 45 degrees Celsius. Cooling fan smart control, noise levels from 45 to 57 dB. Dimensions: 374 x 355 x 736 mm. Net weight: 32 Kg.\"},\"technical_details_6\":{\"technical_details_title\":\"Packing Details\",\"technical_details_description\":\"Carton box for 1 pc: 71 x 61 x 72 cm - 35 kg\"}}', '2024-05-01 13:51:16', '2024-05-01 13:51:16', NULL, NULL, NULL, NULL),
(8, 'L005586', 'FOS Triton', 'Professional Beam/Spot/Wash moving head, 360w High Brightness White Led, Beam angle: 3°to 36 ° motorized zoom, 10-60 ° frost mode ,Linear CMY+CTO, Color wheel: 10+1 colors, 7 custom interchangeable rotating gobo, 6 fixed gobos, Rotating 8 facets prism, Powercon In/out ,Low noise operation , 21kg.', 'https://www.fos-lighting.eu/uploads/products_0_image_662.jpg', '[\"https://www.fos-lighting.eu/uploads/products_1_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_2_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_3_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_4_image_662.jpg\",\"https://www.fos-lighting.eu/uploads/products_5_image_662.jpg\"]', '\"https://www.youtube.com/embed/0oY-Q_XiW1o\"', 1473, 'Out of stock', 'in the 4rth week of March 2024', 'https://www.youtube.com/embed/wOtnnheHn6g', '{\"technical_details_1\":{\"technical_details_title\":\"Light Source / Optics\",\"technical_details_description\":\"Light source: 360 Watt LED, 5800 K Life span: 50,000 hours (approximate). Linear zoom from 3,6 to 36 degrees. Motorized focus.\"},\"technical_details_2\":{\"technical_details_title\":\"Effects\",\"technical_details_description\":\"Linear dimming and strobe effects. Linear CTO and CMY color mixing system. 1 Rotating Gobo wheel with 7 interchangeable Gobos Rotating Gobos Dimensions : external diameter: 26mm, internal diameter: 15mm 1 Static Gobo wheel with 6 fixed Gobos. 1 color wheel with 10 dichroic colors (includes CTO & CTB color correction filters). Frost filter. 8F prism. Motorized zoom and focus. Selectable Pan and Tilt ranges: 540/630/360 degrees Pan & 270/180/90 degrees Tilt.\"},\"technical_details_3\":{\"technical_details_title\":\"Control\",\"technical_details_description\":\"DMX Control with 20 or 18 channels. Auto function with 9 internal programs. Sound mode.\"},\"technical_details_4\":{\"technical_details_title\":\"Installation / Dimension Details\",\"technical_details_description\":\"Power supply: AC 90 - 260 Volt, 50/60 Hz. Power consumption: 500W Dimensions: 379 x 255 x 585 mm Packaging dimensions: 510 x 470 x 650 mm Net weight: 21,5 Kgs Gros weight: 24 Kgs\"}}', '2024-05-01 13:51:16', '2024-05-01 13:51:16', 1, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `createdAt`, `updatedAt`, `CategoryId`) VALUES
(1, 'Hybrid', '2024-04-24 17:31:13', '2024-04-24 17:31:13', 1),
(2, 'Beam', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 1),
(3, 'Wash', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 1),
(4, 'Spot', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 1),
(5, 'Waterproof', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 1),
(6, 'Multi Beam', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 1),
(7, 'Led Stage Lighting', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 3),
(8, 'Led Theater Lighting', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 3),
(9, 'Led Studio Lighting', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 3),
(10, 'Retro Lighting', '2024-04-24 17:31:14', '2024-04-24 17:31:14', 3),
(11, 'Hybrid', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 1),
(12, 'Beam', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 1),
(13, 'Wash', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 1),
(14, 'Spot', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 1),
(15, 'Waterproof', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 1),
(16, 'Multi Beam', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 1),
(17, 'Led Stage Lighting', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 3),
(18, 'Led Theater Lighting', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 3),
(19, 'Led Studio Lighting', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 3),
(20, 'Retro Lighting', '2024-04-24 18:00:07', '2024-04-24 18:00:07', 3);

-- --------------------------------------------------------

--
-- Table structure for table `subsubcategories`
--

CREATE TABLE `subsubcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `SubcategoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `MarketId` (`MarketId`);

--
-- Indexes for table `featuredproducts`
--
ALTER TABLE `featuredproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `markets`
--
ALTER TABLE `markets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsrooms`
--
ALTER TABLE `newsrooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `MarketId` (`MarketId`),
  ADD KEY `CategoryId` (`CategoryId`),
  ADD KEY `SubcategoryId` (`SubcategoryId`),
  ADD KEY `SubSubcategoryId` (`SubSubcategoryId`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `subsubcategories`
--
ALTER TABLE `subsubcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SubcategoryId` (`SubcategoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `featuredproducts`
--
ALTER TABLE `featuredproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `markets`
--
ALTER TABLE `markets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `newsrooms`
--
ALTER TABLE `newsrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `subsubcategories`
--
ALTER TABLE `subsubcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`MarketId`) REFERENCES `markets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `featuredproducts`
--
ALTER TABLE `featuredproducts`
  ADD CONSTRAINT `featuredproducts_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `newsrooms`
--
ALTER TABLE `newsrooms`
  ADD CONSTRAINT `newsrooms_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`MarketId`) REFERENCES `markets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`SubcategoryId`) REFERENCES `subcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`SubSubcategoryId`) REFERENCES `subsubcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `subsubcategories`
--
ALTER TABLE `subsubcategories`
  ADD CONSTRAINT `subsubcategories_ibfk_1` FOREIGN KEY (`SubcategoryId`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
