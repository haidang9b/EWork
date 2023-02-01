-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 34.69.112.218    Database: ework
-- ------------------------------------------------------
-- Server version	8.0.26-google

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '5b3bb189-9b10-11ed-9ef5-42010a400002:1-124274';

--
-- Table structure for table `Applications`
--

DROP TABLE IF EXISTS `Applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Applications` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CoverLetter` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserCVId` bigint NOT NULL,
  `RecruitmentPostId` bigint NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Status` int NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `UpdatedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Applications_RecruitmentPostId` (`RecruitmentPostId`),
  KEY `IX_Applications_UserCVId` (`UserCVId`),
  CONSTRAINT `FK_Applications_RecruitmentPosts_RecruitmentPostId` FOREIGN KEY (`RecruitmentPostId`) REFERENCES `RecruitmentPosts` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Applications_UserCvs_UserCVId` FOREIGN KEY (`UserCVId`) REFERENCES `UserCvs` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Applications`
--

LOCK TABLES `Applications` WRITE;
/*!40000 ALTER TABLE `Applications` DISABLE KEYS */;
INSERT INTO `Applications` VALUES (1,'<p><strong>Dear allddd</strong></p>',31,18,'Đã nhận hồ sơ',0,'2022-12-28 14:20:55.660291','2022-12-28 14:20:55.660294'),(2,'<p><strong>Dear allddd</strong></p>',28,17,'',0,'2022-12-28 14:22:39.445932','2022-12-28 14:22:39.445935'),(12,'<p class=\"ql-align-justify\">bbbbbbbbbbbbbbbbb</p>',26,5,'assddd',0,'2022-12-29 10:18:16.185361','2023-01-10 09:52:16.021436'),(13,'<p class=\"ql-align-justify\">Hello</p>',38,13,'',1,'2023-01-05 13:36:19.344095','2023-01-09 11:10:25.532611'),(15,'<p class=\"ql-align-justify\">Hello</p>',26,6,'',3,'2023-01-05 13:36:55.413013','2023-01-09 11:10:10.528412'),(19,'',48,5,'',1,'2023-01-14 13:31:19.549516','2023-01-14 13:31:19.549518'),(20,'',48,6,'',1,'2023-01-14 13:32:55.950480','2023-01-14 13:32:55.950482'),(24,'',47,20,'',1,'2023-01-17 04:34:39.463885','2023-01-17 04:34:39.463888'),(25,'',48,16,'',1,'2023-01-17 04:35:25.447433','2023-01-17 04:35:25.447435'),(26,'',48,13,'',1,'2023-01-17 12:08:43.626463','2023-01-17 12:08:43.626466'),(27,'<p><br></p>',49,21,'',0,'2023-01-17 12:15:34.757086','2023-01-17 12:15:34.757088');
/*!40000 ALTER TABLE `Applications` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-30 22:51:44
