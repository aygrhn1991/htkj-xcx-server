/*
 Navicat Premium Data Transfer

 Source Server         : local-mysql
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : htkj-xcx

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 07/06/2020 21:20:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_add_job_record
-- ----------------------------
DROP TABLE IF EXISTS `t_add_job_record`;
CREATE TABLE `t_add_job_record`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userid` int(0) NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `meal` int(0) NULL DEFAULT NULL,
  `bus` int(0) NULL DEFAULT NULL,
  `del` int(0) NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_add_job_record
-- ----------------------------
INSERT INTO `t_add_job_record` VALUES (4, 12158, '2020-05-01 08:00:00', 1, 1, 0, '2020-06-07 19:26:33');
INSERT INTO `t_add_job_record` VALUES (5, 12158, '2020-06-07 08:00:00', 0, 0, 0, '2020-06-07 19:27:02');
INSERT INTO `t_add_job_record` VALUES (6, 12158, '2020-06-08 08:00:00', 1, 0, 0, '2020-06-07 19:27:27');

-- ----------------------------
-- Table structure for t_department
-- ----------------------------
DROP TABLE IF EXISTS `t_department`;
CREATE TABLE `t_department`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_department
-- ----------------------------
INSERT INTO `t_department` VALUES (1, '研发部', '2020-05-31 23:17:57');
INSERT INTO `t_department` VALUES (2, '党群人事部', '2020-05-31 23:17:57');
INSERT INTO `t_department` VALUES (3, '市场部', '2020-05-31 23:17:57');
INSERT INTO `t_department` VALUES (4, '计划部', '2020-05-31 23:17:57');
INSERT INTO `t_department` VALUES (5, '质保部', '2020-05-31 23:17:57');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` int(0) NOT NULL,
  `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `department_id` int(0) NULL DEFAULT NULL,
  `state` int(0) NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (12158, 'o2lQZ0WMG6z_VFuJUYwEyzITQGnA', 'cc', 1, 2, '2020-06-07 17:33:15');
INSERT INTO `t_user` VALUES (12159, 'o2lQZ0WMG6z_VFuJUYwEyzITQGnA1', '陈玉锋', 5, 0, '2020-06-01 01:16:16');

SET FOREIGN_KEY_CHECKS = 1;
