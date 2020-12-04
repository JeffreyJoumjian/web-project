SET
	UP DATABASE -- phpMyAdmin SQL Dump
	-- version 4.9.5
	-- https://www.phpmyadmin.net/
	--
	-- Host: localhost:8889
	-- Generation Time: Dec 04, 2020 at 04:07 AM
	-- Server version: 5.7.30
	-- PHP Version: 7.4.9
SET
	SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
	time_zone = "+00:00";

--
-- Database: `web-project`
--
-- --------------------------------------------------------
--
-- Table structure for table `MENU_ITEM`
--
CREATE TABLE `MENU_ITEMS` (
	`_id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`price` float NOT NULL DEFAULT '0',
	`ingredients` text NOT NULL,
	`imgSrc` text NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- --------------------------------------------------------
--
-- Table structure for table `ORDERS`
--
CREATE TABLE `ORDERS` (
	`_id` int(11) NOT NULL,
	`user_id` int(11) NOT NULL,
	`item_ids` text NOT NULL,
	`totalPrice` float NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- --------------------------------------------------------
--
-- Table structure for table `USER`
--
CREATE TABLE `USERS` (
	`_id` int(11) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`address` text NOT NULL,
	`password` text NOT NULL,
	`isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

--
-- Indexes for dumped tables
--
--
-- Indexes for table `MENU_ITEM`
--
ALTER TABLE
	`MENU_ITEM`
ADD
	PRIMARY KEY (`_id`),
ADD
	UNIQUE KEY `name` (`name`);

--
-- Indexes for table `ORDERS`
--
ALTER TABLE
	`ORDERS`
ADD
	PRIMARY KEY (`_id`),
ADD
	KEY `user_id` (`user_id`);

--
-- Indexes for table `USER`
--
ALTER TABLE
	`USER`
ADD
	PRIMARY KEY (`_id`),
ADD
	UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `MENU_ITEM`
--
ALTER TABLE
	`MENU_ITEM`
MODIFY
	`_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ORDERS`
--
ALTER TABLE
	`ORDERS`
MODIFY
	`_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `USER`
--
ALTER TABLE
	`USER`
MODIFY
	`_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--
--
-- Constraints for table `ORDERS`
--
ALTER TABLE
	`ORDERS`
ADD
	CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USER` (`_id`);