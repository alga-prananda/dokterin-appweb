-- Alerts
INSERT INTO `alerts` (`id`,`type`,`message`,`done`,`is_alert`,`createdAt`,`updatedAt`,`doctorId`) VALUES (1,'Telepon','Panggil Diana',0,1,'2021-12-16 07:02:33','2021-12-17 07:02:33',1);

-- Admins
INSERT INTO `Admins` (`id`,`email`,`password`,`type`,`createdAt`,`updatedAt`) VALUES (1,'admin@admin.com','alga123','admin','2021-12-16 07:02:33','2021-12-17 07:02:33');

-- Users
INSERT INTO `Users` (`id`,`email`,`password`,`type`,`createdAt`,`updatedAt`,`Patient_id`) VALUES (1,'test@test.com','test123','patient','2021-12-16 23:13:29','2021-12-17 23:13:29',1);

-- Doctors
INSERT INTO `doctors` (`id`,`first_name`,`last_name`,`telephone`,`createdAt`,`updatedAt`) VALUES (1,'Alga','Prananda','6282210200262','2021-12-16 07:02:33','2021-12-17 07:02:33');
