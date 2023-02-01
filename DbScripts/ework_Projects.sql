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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '5b3bb189-9b10-11ed-9ef5-42010a400002:1-124290';

--
-- Table structure for table `Projects`
--

DROP TABLE IF EXISTS `Projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Projects` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `ProjectName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CustomerName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `UpdatedDate` datetime(6) NOT NULL,
  `ProfileId` bigint NOT NULL,
  `From` datetime(6) NOT NULL,
  `To` datetime(6) NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Projects_ProfileId` (`ProfileId`),
  CONSTRAINT `FK_Projects_Profiles_ProfileId` FOREIGN KEY (`ProfileId`) REFERENCES `Profiles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Projects`
--

LOCK TABLES `Projects` WRITE;
/*!40000 ALTER TABLE `Projects` DISABLE KEYS */;
INSERT INTO `Projects` VALUES (1,'WebGL - Game Unity Escape from Darkness (09/2021 - 10/2021)','Project Advanced Software Engineering','2023-01-04 03:12:20.343853','2023-01-12 13:21:22.610460',1,'2021-01-09 03:12:02.000000','2021-12-31 03:12:02.000000','<p><span style=\"color: rgb(34, 34, 34);\">- Project Advanced Software Engineering</span></p><p><span style=\"color: rgb(34, 34, 34);\">- Escape from Darkness is a 2D single player online game in which players explore the map and attack enemies to increase their power.</span></p><p>Programming Languages: <span style=\"color: black;\">Java, C# Unity</span></p><p><span style=\"color: black;\">Tool: </span>Git, Unity 3D, VSCode, Postman, XAMPP</p>'),(3,'Online Device Management','Web Application','2023-01-04 03:18:46.942107','2023-01-12 13:22:00.669738',1,'2023-01-04 03:18:36.000000','2023-01-04 03:18:36.000000','<p><span style=\"color: black;\">- Project Advanced Software Engineering</span></p><p><span style=\"color: black;\">- The equipment management system includes the following main features: employee management, equipment management, manage device transfers, manage device return requests, statistics and reports.</span></p><p><span style=\"color: black;\">- URL Github: https://github.com/haidang9b/online-divce-management.</span></p><p><span style=\"color: black;\">Programming Languages: </span>C#, ASP.NET MVC</p><p>Tool:   <span style=\"color: black;\">Git, Visual Studio, SQL Server Management Studio</span></p><p> </p><p>  </p><p><br></p>'),(4,'Student Social Network','Web Application','2023-01-12 13:22:48.625206','2023-01-12 13:22:48.625208',1,'2023-01-12 13:22:03.000000','2023-01-12 13:22:03.000000','<p><span style=\"color: black;\">- Project Advanced Web Programming</span></p><p><span style=\"color: black;\">- Social networks support students in the school to have a place to exchange information, documents, store moments. There are individual profiles of each student. Help faculties send announcements, students view announcements</span></p><p><span style=\"color: black;\">- URL Github: https://github.com/haidang9b/student-system</span></p><p><span style=\"color: black;\">Used technologies:</span></p><ul><li>JavaScript, NodeJS, Express JS, template engine EJS.</li><li>MongoDB.</li><li>jQuery, Bootstrap</li><li>Google Cloud Console, Heroku</li></ul>');
/*!40000 ALTER TABLE `Projects` ENABLE KEYS */;
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

-- Dump completed on 2023-01-30 22:53:03
