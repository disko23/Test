CREATE TABLE `users` (
    user_id INTEGER(10) unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    status ENUM('enable', 'disable') DEFAULT 'enable',
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;