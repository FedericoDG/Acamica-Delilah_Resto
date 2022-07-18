-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2022 at 02:28 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delilah_resto`
--
CREATE DATABASE IF NOT EXISTS `delilah_resto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `delilah_resto`;

-- --------------------------------------------------------

--
-- Table structure for table `details`
--

CREATE TABLE `details` (
  `detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `details`
--

INSERT INTO `details` (`detail_id`, `order_id`, `product_id`, `quantity`) VALUES
(308, 136, 1, 1),
(309, 136, 2, 2),
(310, 136, 3, 3),
(311, 137, 1, 1),
(312, 137, 2, 2),
(313, 138, 1, 1),
(314, 139, 1, 1),
(315, 139, 2, 2),
(316, 139, 3, 3),
(317, 140, 5, 2),
(318, 140, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `payment_method` enum('CASH','DEBIT','CREDIT') NOT NULL DEFAULT 'CASH',
  `total` float DEFAULT NULL,
  `status` enum('NEW','CONFIRMED','PREPARING','DELIVERED','CANCELED') NOT NULL DEFAULT 'NEW',
  `active` enum('TRUE','FALSE') NOT NULL DEFAULT 'TRUE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `date`, `payment_method`, `total`, `status`, `active`) VALUES
(136, 2, '2022-07-18 08:27:07', 'DEBIT', 4050, 'PREPARING', 'TRUE'),
(137, 2, '2022-07-18 08:27:19', 'DEBIT', 1950, 'NEW', 'TRUE'),
(138, 2, '2022-07-18 08:27:26', 'DEBIT', 550, 'NEW', 'TRUE'),
(139, 2, '2022-07-18 08:30:04', 'DEBIT', 4050, 'NEW', 'TRUE'),
(140, 34, '2022-07-18 08:42:23', 'DEBIT', 3000, 'NEW', 'TRUE');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `description` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `image` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `price` float NOT NULL,
  `active` enum('TRUE','FALSE') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'TRUE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `image`, `price`, `active`) VALUES
(1, 'Muzzarella', 'Salsa de tomate, muzzarella, orégano, olivas negras.', 'http://via.placeholder.com/150', 550, 'TRUE'),
(2, 'Muzzarella y Jamón', 'Salsa de tomate, muzzarella, jamón, orégano, olivas verdes.', 'http://via.placeholder.com/150', 700, 'TRUE'),
(3, 'Muzzarella y Morrón', 'Salsa de tomate, muzzarella, morrón, orégano, olivas verdes.', 'http://via.placeholder.com/150', 700, 'TRUE'),
(4, 'Muzzarella y Huevo', 'Salsa de tomate, muzzarella, huevo, orégano, olivas verdes.', 'http://via.placeholder.com/150', 750, 'TRUE'),
(5, 'Anchoas', 'Salsa de tomate, muzzarella, anchoas, orégano, olivas verdes.', 'http://via.placeholder.com/150', 800, 'TRUE'),
(6, 'Rúcula', 'Salsa de tomate, muzzarella, rpucula, parmesano, olivas verdes.', 'http://via.placeholder.com/150', 900, 'TRUE'),
(7, 'Rúcula Especial', 'Salsa de tomate, muzzarella, rúcula, jamón crudo, parmesano, olivas verdes', 'http://via.placeholder.com/150', 1150, 'TRUE'),
(8, 'Alemana', 'Salsa de tomate, muzzarella, salsa golf, salchicha, orégano, olivas verdes.', 'http://via.placeholder.com/150', 1150, 'TRUE'),
(9, 'Jamón crudo', 'Salsa de tomate, muzzarella, jamón crudo, orégano, olivas verdes.', 'http://via.placeholder.com/150', 1250, 'TRUE'),
(10, 'Palmitos', 'Salsa de tomate, muzzarella, jamón cocido, palmito, salsa golf, morrones, olivas verdes.', 'http://via.placeholder.com/150', 1250, 'TRUE'),
(26, 'Polenta con Pajaritos', 'Plato económico', 'http://via.placeholder.com/150', 150, 'TRUE');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `address` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'USER',
  `active` enum('TRUE','FALSE') COLLATE utf8_spanish_ci NOT NULL DEFAULT 'TRUE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `name`, `email`, `phone`, `address`, `role`, `active`) VALUES
(1, 'Admin', '$2b$10$WC/xQ9/Uv/PX86RQhR5N8.fDsidF2Y.16Um31.4syiA6rQJFS0RGe', 'Administrador', 'admin@mail.com', '3516114150', 'San Martín 1 PB A', 'ADMIN', 'TRUE'),
(2, 'User2', '$2b$10$npEtqipP212411JTbIIwneiO5BD95rPEFAEsRYCVKSjqH8cL4Eee.', 'Usuario Dos', 'user2@mail.com.ar', '1234567890', 'San Martín 1', 'USER', 'TRUE'),
(34, 'User3', '$2b$10$dZUoSa3PANHBKgH3P1i3U.w3vGItNr1PTZR63gC91I2HeOhgEZT7e', 'Usuario Tres', 'user3@mail.com.ar', '1234567890', 'Lima 28', 'USER', 'TRUE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `details`
--
ALTER TABLE `details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `details`
--
ALTER TABLE `details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=320;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `details`
--
ALTER TABLE `details`
  ADD CONSTRAINT `details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
