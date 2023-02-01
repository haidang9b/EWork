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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '5b3bb189-9b10-11ed-9ef5-42010a400002:1-124285';

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Username` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `FullName` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PhoneNumber` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ImageUrl` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CoverLetter` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TokenResetPassword` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `RoleId` bigint NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `UpdatedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Users_RoleId` (`RoleId`),
  CONSTRAINT `FK_Users_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'100748591227661053590','drom97977@gmail.com','Co Don Trai Tim','$2a$12$NN6Ms2C7hYR0kdfeLXJbWOCklqoGyp.i.lb57dz2OmjXADgrd12su','','https://lh3.googleusercontent.com/a/ALm5wu3znor2b0uyvgLT1cX0IgHboCkPrHpo_WwavAJ7=s96-c','','',1,3,'2022-11-08 09:43:52.133693','2022-11-08 09:43:52.133699'),(2,'102166501851283969371','cunkul35@gmail.com','Đăng Phan Hải','$2a$12$ifj9emqxDrFKPXmPmAcjyOLZzscrR1I5oB3m.aH07lYFUxszMfoQ6','','https://lh3.googleusercontent.com/a/ALm5wu2E6htvKKQn7ojy0X4WcjjzBFbZZnRt62Ty-HX3mA=s96-c','','',1,3,'2022-11-08 09:48:20.652242','2022-11-08 09:48:20.652246'),(3,'admin','phanhaidanghq@gmail.com','EWORK','$2a$12$PEMnmD.sn0RGPx8BIQeV3ubjNWnu52MZFmDQ9JkzRLe.CM2fg1SsO','0326889240','','','mAD2BJUbiK7R3WvFYegFrLrM9bScQu',1,1,'2022-11-08 09:49:11.528863','2023-01-17 12:17:31.184895'),(4,'107344134018113403322','51800762@student.tdtu.edu.vn','Phan Hải Đăng','$2a$12$Yy0tJrqPVioy6/IU/nrLbONhUxEgbi2fT6wrIb9Rw.eq8bZZSRALa','','https://lh3.googleusercontent.com/a/ALm5wu2XNsw0jfB6LFO91vOg6Kla9LKgbyyecQsh7GEi=s96-c','<p><br></p>','',1,3,'2022-11-13 10:53:13.586579','2023-01-12 16:10:59.547250'),(5,'test','drom123456@gmail.com','Đăng','$2a$12$nzIwIwv7hsNdc/YKfoqce.8Q/TpGQj5ffKgoC.Y75A2DdqZkOmllW','0325698712','','','',0,1,'2022-11-24 14:24:56.002281','2022-12-16 15:59:20.191841'),(6,'ceo123','admin2@gmail.com','Phan Hai Dang','$2a$12$L.8GkLh17xmkXEnXgXe4y.CCn82ydmhCMD0D83MVDlsVSSOH9JMK.','0369852147','','','',1,2,'2022-11-25 03:41:49.946546','2023-01-09 08:46:05.141608'),(7,'hr','phanhaidang@gmail.com','Phan Hải Đăng','$2a$12$qwcJtFiSwgYMhTDlZnXszuYiwt14pbNSBElZv/n0fPTkZcmkgSwP2','0325896147','','','',1,2,'2022-11-27 06:47:00.085065','2022-11-27 06:47:00.085068'),(8,'admin3','teo@gmail.com','Phan Hai Dang','$2a$12$T1TgTut/.BK3Fst20vFvNecEHsdVMltv832Y66pJlBHr5PkQXN/1S','0326889244','','','',1,2,'2022-11-29 14:04:34.419629','2022-11-29 14:04:34.419632'),(14,'string','string','string','$2a$12$QhrTAH7qi4s2gd9SIDeIoelH6fxwdBUKMJDEDXyzsGfM9Fi7ByRM6','string','','','p8lWgNUSqCEwLh971k0rKAFTkB2cv4',0,2,'2022-12-03 12:01:43.030612','2022-12-22 14:18:18.218092'),(15,'testtest','testtest@gmail.com','testtest','$2a$12$onCGKj0mPtQQmdkSmA15huDenmF.kRFUgGdrISMqKP5jr.VmGw0nq','0987456321','','','O6WLgYqXLdRBPBw7if1yySYKHYeQbC',1,2,'2022-12-04 06:43:53.899170','2022-12-04 06:43:53.899173'),(16,'testest2','admin@gmail.com','testest2','$2a$12$Gb5bBZCFfsRdyGAWePyWoOm33qG4cZKvIJfRU5r1YlKbSPkNWaytK','0987564123','','','j596E5kHcFkkuvt9mSXmI6ZgDXirve',1,2,'2022-12-04 06:45:50.505467','2022-12-04 06:45:50.505469'),(17,'admi3n','admi3n@gmail.com','ádádsadâdá','$2a$12$GipcLiHLytYfeMLhTHI50.vAZShivasXDnIUR9s6wjjWYTyLNjefG','0965987987','','','nSMvzH9w7fDkI2XNeKroZbjLAeJGFH',1,2,'2022-12-04 06:47:46.823401','2022-12-17 07:11:11.342019'),(18,'test333333','test333333@gmail.com','test333333','$2a$12$.vhYOmiT71c7snBVILyCKeVgrfiCn4VTWKb/5PP0TBnYgDPw6w36.','0365478212','','','kbehluVKdKdIaLBzDpKM8nhCOHTxb6',1,2,'2022-12-04 06:54:53.317647','2022-12-04 06:54:53.317649'),(19,'assdddddddd','assdddddddd@gmail.com','assdddddddd','$2a$12$1xUeubXLFyCiUS6KqD/EDuGyP.edrVggFrqm8hUDTEh8JnbKOsKGq','0369258147','','','0NobgGjfpgQ7O6YQpwyyc8PpsHy0Ps',1,2,'2022-12-04 06:56:43.848281','2022-12-04 06:56:43.848284'),(20,'haidang','haidang@gmail.com','Phan Hải Đăng','$2a$12$giaZ7j7rCWw5kGas4.OMFOOVihr.MdyGECYvzPIjupgmFVXNLkK5.','0987652314','','','ZHQZfRP4KrkUL2AqivjDiXpUBcZyJS',1,1,'2022-12-07 14:53:14.962976','2022-12-07 14:53:14.962979'),(21,'tonny','test3@gmail.com','Tonny Tonny','$2a$12$pspFxiAyPgyvj/ZwDDo0xeBIsXwSyJilq6Q8m0omQ5kqS.48pnxJy','0985236417','','','M3tWaDwR9efrur1ZUHtOqippeAzCZK',1,2,'2022-12-14 07:40:23.170596','2022-12-14 07:40:23.170599'),(22,'testest233','testtest222@gmail.com','Hải Đăng Vip','$2a$12$F8BtjeeCj89OvffZWxTt0OkPGIPYb7VgQdlgCKrrmuoi5ZqBSD5Ty','0984563223','','','aZnyiz2adqBmPMaFAD4hUPkQ8G2JBc',1,2,'2022-12-15 09:11:24.453593','2022-12-15 09:11:24.453595'),(23,'admin898','admin898@gmail.com','Tèooooo','$2a$12$ZYOe878k/pqynhewmez3H.ow/5siaxeHvbXCT/vLU6ZfwjawfryZu','0989999999','','','cWDQkNGRuDIj6FXJKT6PpFtWWBF2md',1,2,'2022-12-16 13:55:40.566333','2022-12-16 13:55:40.566337'),(24,'admin363','admin363@gmail.com','Hải Đăng','$2a$12$Yq2f3q/M7cBOBiW6JpCi.ubJTLTpH2Cb3LSqkcC99gVJCKXPyucRm','0363636363','','','pY74u0hh1JNSxqtoYGn8yAQhRCenjW',1,2,'2022-12-16 15:13:11.617798','2022-12-16 15:13:11.617801'),(25,'ework','ework@ework.com','EWork Information','$2a$12$o7UoHNFcO3ZOEo2aVhmPWOav.eX4ysAdhGDTxqTPHmuQ7yinMEIJe','0986098587','','','E46AWu6eENk0wkjJQCfnsefVhIuRHH',1,1,'2022-12-17 07:12:58.782497','2022-12-17 07:12:58.782500'),(26,'test334','admin0326987987@gmail.com','Test Chisn 8 bay','$2a$12$VY7BvDkYivzCmSux2.xiV.gaWCcdzWLPG2u3.BGem1iFfCA.TY1Au','0326987987','','','poaO17r9qaaUtE6EiEtLy4PFIlXree',1,1,'2022-12-18 04:07:48.954069','2022-12-18 04:08:04.450645'),(27,'admin5','admin5@gmail.com','Dang Dang','$2a$12$z366pwqFxKzG2..DIxRTMuX4SuOxgMUUYAqWGmTSknzaoaopOjj1i','0326666555','','','JmLgSeQ27nRSljn3FlIroG1b7DdL45',1,2,'2022-12-18 04:10:19.820647','2022-12-18 04:10:19.820665'),(28,'mobifone','mobifone@gmail.com','Nguyen Van A','$2a$12$J8TOP2q61pCodCjtjShqTObMI6IIWlfyOti6Rv2VGqBdCnXWfsspK','0369258258','','','elZENWzsunC35BpfZafV083rKUXEdm',1,2,'2022-12-20 09:53:13.939316','2022-12-20 09:53:13.939323'),(29,'mobifone1','mobifone1@gmail.com','Nguyen Van A','$2a$12$4gD357yQyURik/OhkZ3qSOuz3IkY4z.kyGfngYUb.L9L4IlIwCKme','0369258458','','','6lqg17QMlKR160V1NNKNfWrjsF4SyJ',1,2,'2022-12-20 09:57:19.356250','2022-12-20 09:57:19.356253'),(30,'108575287037235258546','mrdrom9191@gmail.com','Băng Giá Hoàng Tử','$2a$12$Y0mPQ4XUwlqwUVz7NixlquVbpvCTump3tl0TcacGlzUy/jCrWVRdy','CNwzHVUqDn','https://lh3.googleusercontent.com/a/AEdFTp4g1JHL6C8wsAHS9nCKNyu1e6HQ0H5y0VKhBmm_=s96-c','<p><br></p>','tTmejN2s1ZnKqS4Oji0rho7XsRebax',1,3,'2022-12-26 15:28:01.688074','2022-12-26 15:28:01.688077'),(31,'amanotes','Amanotes@gmail.com','Amanotes','$2a$12$arS6rzGJMh2.NcBLZo9qJeKrNvAoN0/NXFN7PYCavSvIEilgog0ee','0365412897','','','SFfgSWvUj9LUQUli24t6qsoiLmqUj8',1,2,'2023-01-08 10:15:57.939792','2023-01-14 14:51:56.885279'),(32,'Laidon','Laidon@gmail.com','Laidon - Empowering Simplification','$2a$12$yDhEvn/4lmZ07i27FMhhj.IX7A5rzNCaioKB557hIWd08BpuvRGAu','0325146987','','','HMXeNoc3DvrbZbUGiNYZPRKDLAI4UC',1,2,'2023-01-10 09:54:25.094058','2023-01-10 09:54:25.094061'),(33,'cimon','cimon@gmail.com','Cimon Recruiter','$2a$12$JVWPRtwWYWzTEYRkXbpiGORwqu/n1YuWvHUDhN.6DOGmJcXUsjOxS','0321456987','','','tUytYDdtMlANYfKznKWNemYHzNcrmB',1,2,'2023-01-10 10:02:53.189934','2023-01-10 10:02:53.189936'),(34,'cmc','cmcglobal@cmc.com','Nguyen Thi B','$2a$12$uJXDTHhf4p8ug98ObBegBOoewzaQ/zXXJiFpjbW6vnRj9dACrvMBy','0325896369','','','tY0474YqgBQIuxnBZrwrBKaeLeZNOi',1,2,'2023-01-10 10:04:28.285546','2023-01-10 10:04:28.285548'),(35,'107551968425355574362','external.dang.phanhai@gmail.com','Dang Phan Hai','$2a$12$kJM6no/GG2zYMw1DmxqEkuVgWIQ1fmf6/aMBsQpDME7Yw7.dxrQ5G','Vfkzywfhnq','https://lh3.googleusercontent.com/a/AEdFTp45XSGi9ZaQRS4VeSiz_B33XzyQoIxohURjy4YC=s96-c','','7CDjUY0g9jHuTKCdWZ3gch5NgiSoPb',1,3,'2023-01-14 09:36:15.147965','2023-01-17 11:57:10.924187'),(36,'ceo111','0326666555@gmail.com','Nguyen Thi C','$2a$12$ybJAetLJc3Uq3y36M5tJGenfjG.i1fNWSBRkqwQQqlytRyR.Iu0RW','0326666555','','','hAVXfQ3jNEW5ak2mzjV6Ow1BEmygaO',1,2,'2023-01-17 11:58:37.059398','2023-01-17 11:58:37.059400'),(37,'hieu1','hieu1@gmail.com','Hieu 1','$2a$12$92S8bcrXg7L4hnN1SLlkPe2RMYpKOXEhYFIVfbANyT690bYyxTskm','0322233322','','','vF4aVu9vbO6GAy20PEnFgcPHlTqlOG',1,2,'2023-01-17 12:04:26.539517','2023-01-17 12:04:26.539519');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
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

-- Dump completed on 2023-01-30 22:52:39
