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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '5b3bb189-9b10-11ed-9ef5-42010a400002:1-124281';

--
-- Table structure for table `Companies`
--

DROP TABLE IF EXISTS `Companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Companies` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PhoneNumber` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Address` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TaxNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `AvatarUrl` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Status` int NOT NULL,
  `Country` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TeamSize` int NOT NULL,
  `CompanyType` int NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Featured` tinyint(1) NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `UpdatedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Companies`
--

LOCK TABLES `Companies` WRITE;
/*!40000 ALTER TABLE `Companies` DISABLE KEYS */;
INSERT INTO `Companies` VALUES (3,'Bosch Global Software Technologies Company Limited','0369852147','admin2@gmail.com','Etown 2, 364 Cong Hoa, Tan Binh, TPHCM','86688668','CompanyAvatar_20230108171049_download.png',1,'DE',8,0,'<p>The Bosch Group is a leading global supplier of technology and services</p><p><strong><em>The Bosch Group</em></strong><em>&nbsp;is a leading global supplier of technology and services. It employs roughly 394,500 associates worldwide (as of December 31, 2020). According to preliminary figures, the company generated sales of 71.6 billion euros in 2020. Its operations are divided into four business sectors: Mobility Solutions, Industrial Technology, Consumer Goods, and Energy and Building Technology.</em></p><p><strong><em>The Bosch Group</em></strong><em>&nbsp;comprises&nbsp;</em><strong><em>Robert Bosch GmbH</em></strong><em>&nbsp;and its roughly&nbsp;</em><strong><em>440 subsidiaries and regional companies</em></strong><em>&nbsp;in some 60 countries. If its sales and service partners are included, then Bosch is represented in roughly 126 locations. This worldwide development, manufacturing, and sales network is the foundation for further growth.</em></p><p><strong><em>BGSV – Bosch Global Software Technologies Company Limited</em></strong><em>&nbsp;(Previous name: RBVH - Robert Bosch Engineering and Business Solutions Vietnam Company Limited) is 100% owned subsidiary of&nbsp;</em><strong><em>Robert Bosch GmbH</em></strong><em>.&nbsp;</em></p><p>OK</p>',1,'2022-11-25 03:41:49.116932','2023-01-10 09:22:23.029660'),(4,'GFT Technologies Vietnam','0325896147','phanhaidang@gmail.com','Phan Hải Đăng','86688899','CompanyAvatar_20221225172624_Screenshot 2020-12-09 at 3.14.55 PM.webp',1,'DE',0,1,'<p>Building technology to revolutionise the Digital Banking with Cloud engineering.</p><p><strong>Working at GFT Vietnam</strong></p><p>GFT is driving the digital transformation of the world’s leading companies in the financial and insurance sectors, as well as in the manufacturing industry. As an IT services and software engineering provider, GFT offers strong consulting and development skills across all aspects of pioneering technologies, such as cloud engineering, artificial intelligence, mainframe modernization, and the Internet of Things for Industry 4.0.</p><p>With its in-depth technological expertise, profound market know-how, and strong partnerships,</p><p>GFT implements scalable IT solutions to increase productivity. This provides clients with faster access to new IT applications and innovative business models, while also reducing risk.</p><p>Founded in 1987 and located in more than 15 countries to ensure close proximity to its clients, GFT employs 6,000 people.</p><p><strong>Big enough to deliver, small enough to care.</strong></p><p>This motto applies not only to our projects but also to our work at GFT. We offer the advantages of a globally connected group of companies, combined with the benefits of a medium-sized company. At the same time, we offer a very international environment, the opportunity to work abroad (6,000 colleagues).</p>',1,'2022-11-27 06:46:59.485129','2023-01-08 09:26:13.925335'),(5,'Doctor Anywhere','0326889244','teo@gmail.com','123544','123544','CompanyAvatar_20230108171343_logo.webp',1,'VN',0,0,'',1,'2022-11-29 14:04:33.218902','2023-01-17 12:02:04.574332'),(6,'Scandinavian Software Park','0986986986','vip@gmail.com','1231321321321','1231321321321','',1,'VN',0,0,'',0,'2022-12-03 11:53:21.713292','2023-01-30 15:43:42.670255'),(7,'POPS Worldwide','string','string','POPS Worldwide','68689998','',2,'VN',0,0,'',0,'2022-12-03 11:55:50.312469','2023-01-30 15:43:52.810092'),(8,'Global Fashion Group','0987654123','sadsadsadsadsadsadsa@gmail.com','Global Fashion Group','Global Fashion Group','',1,'VN',0,0,'',0,'2022-12-04 03:50:44.535792','2023-01-08 10:21:31.967452'),(9,'AMANOTES','0369852145','LMAAA@gmail.com','AMANOTES','AMANOTES','CompanyAvatar_20230108171637_ad6d77_8979914707c34a579a4d16fc42851058_mv2.webp',1,'VN',0,0,'',1,'2022-12-04 03:51:18.473896','2023-01-08 10:21:35.660870'),(10,'Cinnamon AI Labs','0326547418','testte2st@gmail.com','0326547418 A','123987','',2,'VN',0,0,'',0,'2022-12-15 08:58:39.423127','2023-01-10 10:01:53.046592'),(20,'GeoComply (GeoTech Hub Vietnam)','0984563223','testtest222@gmail.com','Trưởng phòng','0000000000000000000000000','',1,'VN',0,0,'',0,'2022-12-15 09:11:23.697316','2022-12-18 10:14:33.252990'),(21,'Absolute Software (Vietnam) Ltd','0363636363','1231@gmail.com','364 Cộng Hòa','00111111','',0,'VN',0,0,'',0,'2022-12-16 13:37:28.570219','2022-12-18 10:14:22.436432'),(22,'Beincom','0321123321','Beincom@gmail.com','EVOL GROUP - TTC Building, No 1, Tan Thuan Street, District 7, HCMC District 7 Ho Chi Minh','0321123321','',1,'VN',0,0,'',0,'2022-12-19 08:55:00.768805','2022-12-19 08:55:24.171639'),(23,'Cong ty KSA','0987654124','sadsadsadsadsadsad2sa@gmail.com','sadsadsadsadsadsad2sa','sadsadsadsadsadsad2sa','',0,'VN',0,1,'',0,'2022-12-19 11:07:20.732621','2022-12-19 11:07:20.732618'),(24,'Trung tâm công nghệ thông tin MobiFone','0369258258','mobifone@gmail.com','Tầng 8, Tòa nhà Mobifone, số 586 Nguyễn Hữu Thọ, phường Khuê Trung, Cam Le Da Nang','0369258258','',0,'VN',0,1,'',0,'2022-12-20 09:53:12.575859','2022-12-20 09:53:12.575855'),(25,'Trung tâm công nghệ thông tin MobiFone','0369258458','mobifone1@gmail.com','Tầng 8, Tòa nhà Mobifone, số 586 Nguyễn Hữu Thọ, phường Khuê Trung, Cam Le Da Nang','0369258278','',0,'VN',0,1,'',0,'2022-12-20 09:57:18.703661','2022-12-20 09:57:18.703649'),(26,'Hybrid Technologies','0325874165','0325874165@gmail.com','Hybrid Technologies','Hybrid Technologies','',2,'VN',0,1,'VN',0,'2022-12-20 10:11:31.334873','2022-12-20 10:12:11.293590'),(29,'Plume Design, Inc','0314785296','0314785296@gmail.com','WeWork, Etown Central, 11 Doan Van Bo, Phường 13, Quận 4, Thành phố Hồ Chí Minh','0314785296','',0,'VN',0,1,'VN',0,'2022-12-29 10:42:33.728881','2022-12-29 10:42:33.728879'),(30,'IDTEK JSC','0325896123','IDTEK@gmail.com','Đường số 85, Tân QUy','12365478','',0,'VN',0,1,'VN',0,'2023-01-08 08:42:10.843619','2023-01-08 08:42:10.843617'),(31,'Cinnamon AI Labs','0321123654','CinnamonAILabs@gmail.com','The Hub - 195/10E Dien Bien Phu Binh Thanh Ho Chi Minh','0321123654','',0,'VN',0,1,'VN',0,'2023-01-10 10:01:36.768995','2023-01-10 10:01:36.768993'),(32,'CMC Global','0325896369','external.dang.phanhai@gmail.com','KCX Tan Thuan','01236544','CompanyAvatar_20230110170632_unnamed.jpg',2,'VN',0,1,'<h2>Tầm nhìn</h2><h2>Sứ mệnh</h2><p>CMC Global định hướng trở thành công ty dịch vụ IT top 2 tại Việt Nam, top 10 trong khu vực và là đơn vị đứng đầu về năng lực triển khai các giải pháp công nghệ mới như AI, Cloud và chuyển đổi số.</p><p>Tạo ra dịch vụ đạt chuẩn quốc tế, hiện diện trên toàn cầu.</p><p>&nbsp;</p><h2 class=\"ql-align-center\">Giá trị cốt lõi</h2><h2>LẤY KHÁCH HÀNG LÀM TRUNG TÂM</h2><p>CMC Global luôn ưu tiên khách hàng và sở thích của họ với các dịch vụ phù hợp với nhu cầu và nhu cầu cụ thể, mang lại trải nghiệm trên tất cả mong đợi. Chúng tôi tin rằng, bằng cách không ngừng gia tăng giá trị dịch vụ, chúng tôi sẽ nhận được sự tin tưởng và tin tưởng lâu dài của các đối tác.</p><h2 class=\"ql-align-right\">C-SPEED</h2><p class=\"ql-align-right\">CMC Global tạo ra lợi thế cạnh tranh thông qua phản hồi nhanh chóng và cung cấp dịch vụ nhanh chóng của chúng tôi. Chúng tôi luôn nỗ lực mang đến những sản phẩm và dịch vụ vượt trội cho đối tác trong thời gian ngắn nhất có thể. Tại CMC Global, chúng tôi tin rằng Tốc độ là chìa khóa để thành công.</p><p class=\"ql-align-center\"><img src=\"https://cmcglobal.com.vn/wp-content/uploads/2020/10/Group-294.png\" height=\"722\" width=\"1164\"></p><h2>SÁNG TẠO</h2><p>Sự sáng tạo tại CMC Global không chỉ được phản ánh trong một loạt các sản phẩm và giải pháp CÔNG NGHỆ THÔNG TIN tiên tiến của chúng tôi mà còn trong các mô hình phân phối và phương pháp triển khai sáng tạo của chúng tôi khiến chúng tôi khác biệt với bất kỳ đối thủ cạnh tranh nào trên thị trường.</p><h2 class=\"ql-align-right\">CAM KẾT</h2><p class=\"ql-align-right\">CMC Global cam kết biến ý tưởng và tầm nhìn của khách hàng thành hiện thực thông qua các thỏa thuận và hợp tác lẫn nhau. Cam kết này cũng được phản ánh trong tính toàn vẹn trong tất cả các dự án và hoạt động của chúng tôi, đảm bảo chất lượng dịch vụ tốt nhất và theo kịp tiến độ thực hiện.</p><h2 class=\"ql-align-center\">Lịch sử</h2><p class=\"ql-align-center\">We are proudly a member of&nbsp;<strong>CMC Corporation</strong></p><p class=\"ql-align-center\">CMC Global tiền thân là một bộ phận của CMC Corp chuyên cung cấp dịch vụ gia công phần mềm CNTT với chỉ 50 nhân viên</p><p class=\"ql-align-center\">&nbsp;CMC Global mở chi nhánh đầu tiên tại Yokohama, Nhật bản – CMC Japan</p><p class=\"ql-align-center\">CMC Global mở chi nhánh tại Hồ Chí Minh, mở rộng ra thị trường phía Nam Việt Nam</p><p class=\"ql-align-center\">CMC Global nhận giải thưởng Sao Khuê lần thứ 2 cho hạng mục “Dịch vụ xuất khẩu phần mềm”</p><p class=\"ql-align-center\"><img src=\"https://cmcglobal.com.vn/wp-content/uploads/2020/11/CMC-Global-milestone-01-1-1024x300.png\" height=\"300\" width=\"1024\"></p><p class=\"ql-align-center\">Công ty TNHH CMC Global được thành lập như&nbsp;mảng kinh doanh chủ lực của Tập đoàn nhằm đưa các sản phẩm công nghệ cao và dịch vụ CNTT ra thị trường toàn cầu.</p><p class=\"ql-align-center\">CMC Global nhận giải thưởng Sao Khuê đầu tiên cho hạng mục “Dịch vụ xuất khẩu phần mềm”</p><p class=\"ql-align-center\">&nbsp;CMC Global mở chinh nhánh ở Đà Nẵng, ghi dấu chân tại thị trường miền Trung&nbsp;</p><p><br></p>',0,'2023-01-10 10:04:27.843509','2023-01-10 11:34:11.462513'),(33,'Nguyen Thi C','0326666555','0326666555@gmail.com','Nguyen Thi C','12344444','',1,'VN',0,1,'',0,'2023-01-17 11:58:36.361569','2023-01-17 11:59:17.966866');
/*!40000 ALTER TABLE `Companies` ENABLE KEYS */;
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

-- Dump completed on 2023-01-30 22:52:21
