/*
 Navicat Premium Data Transfer

 Source Server         : 94.191.44.140
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : 94.191.44.140:3306
 Source Schema         : htkj-xcx

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 26/06/2020 09:08:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_add_job_record
-- ----------------------------
DROP TABLE IF EXISTS `t_add_job_record`;
CREATE TABLE `t_add_job_record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `meal` int(1) NULL DEFAULT NULL,
  `meal_time` int(1) NULL DEFAULT NULL,
  `bus` int(1) NULL DEFAULT NULL,
  `bus_time` int(1) NULL DEFAULT NULL,
  `bus_to` int(1) NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 504 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_add_job_record
-- ----------------------------
INSERT INTO `t_add_job_record` VALUES (27, 12139, '2020-06-15', 1, 2, 0, 0, 0, '2020-06-12 08:01:54');
INSERT INTO `t_add_job_record` VALUES (28, 12101, '2020-06-13', 0, 0, 0, 0, 0, '2020-06-12 08:19:07');
INSERT INTO `t_add_job_record` VALUES (29, 12126, '2020-06-15', 1, 2, 0, 0, 0, '2020-06-12 11:34:20');
INSERT INTO `t_add_job_record` VALUES (30, 12149, '2020-06-13', 1, 1, 1, 1, 0, '2020-06-12 11:50:26');
INSERT INTO `t_add_job_record` VALUES (31, 12149, '2020-06-14', 1, 1, 1, 1, 0, '2020-06-12 11:50:49');
INSERT INTO `t_add_job_record` VALUES (32, 12162, '2020-06-13', 1, 1, 1, 1, 0, '2020-06-12 11:51:18');
INSERT INTO `t_add_job_record` VALUES (33, 12162, '2020-06-14', 1, 1, 1, 1, 0, '2020-06-12 11:51:40');
INSERT INTO `t_add_job_record` VALUES (34, 0, '2020-06-13', 1, 1, 0, 0, 0, '2020-06-12 11:51:41');
INSERT INTO `t_add_job_record` VALUES (35, 0, '2020-06-14', 1, 1, 0, 0, 0, '2020-06-12 11:52:21');
INSERT INTO `t_add_job_record` VALUES (36, 12152, '2020-06-13', 1, 1, 0, 0, 0, '2020-06-12 12:17:00');
INSERT INTO `t_add_job_record` VALUES (37, 12188, '2020-06-13', 1, 1, 0, 0, 0, '2020-06-12 14:06:31');
INSERT INTO `t_add_job_record` VALUES (42, 12139, '2020-06-16', 1, 2, 0, 0, 0, '2020-06-15 11:46:22');
INSERT INTO `t_add_job_record` VALUES (43, 12148, '2020-06-16', 0, 0, 0, 0, 0, '2020-06-15 13:38:27');
INSERT INTO `t_add_job_record` VALUES (44, 12149, '2020-06-16', 1, 2, 1, 2, 0, '2020-06-15 15:22:13');
INSERT INTO `t_add_job_record` VALUES (45, 0, '2020-06-17', 1, 2, 1, 2, 0, '2020-06-16 07:36:26');
INSERT INTO `t_add_job_record` VALUES (46, 12162, '2020-06-17', 1, 2, 1, 2, 0, '2020-06-16 09:44:46');
INSERT INTO `t_add_job_record` VALUES (47, 12162, '2020-06-18', 1, 2, 1, 2, 0, '2020-06-16 09:44:59');
INSERT INTO `t_add_job_record` VALUES (48, 12139, '2020-06-17', 1, 2, 0, 0, 0, '2020-06-16 14:32:55');
INSERT INTO `t_add_job_record` VALUES (49, 12148, '2020-06-17', 0, 0, 0, 0, 0, '2020-06-16 14:52:54');
INSERT INTO `t_add_job_record` VALUES (50, 0, '2020-06-18', 1, 2, 1, 2, 0, '2020-06-16 16:54:37');
INSERT INTO `t_add_job_record` VALUES (51, 12171, '2020-06-17', 1, 2, 1, 2, 0, '2020-06-16 19:42:12');
INSERT INTO `t_add_job_record` VALUES (52, 12171, '2020-06-18', 1, 2, 1, 2, 0, '2020-06-16 19:42:44');
INSERT INTO `t_add_job_record` VALUES (53, 12149, '2020-06-18', 1, 2, 1, 2, 0, '2020-06-17 06:22:18');
INSERT INTO `t_add_job_record` VALUES (54, 12106, '2020-06-18', 1, 2, 0, 0, 0, '2020-06-17 10:30:26');
INSERT INTO `t_add_job_record` VALUES (55, 12191, '2020-06-18', 0, 0, 0, 0, 0, '2020-06-17 10:41:28');
INSERT INTO `t_add_job_record` VALUES (56, 12164, '2020-06-18', 0, 0, 0, 0, 0, '2020-06-17 12:16:07');
INSERT INTO `t_add_job_record` VALUES (57, 3, '2020-06-18', 1, 2, 0, 0, 0, '2020-06-17 12:23:29');
INSERT INTO `t_add_job_record` VALUES (58, 12184, '2020-06-18', 0, 0, 0, 0, 0, '2020-06-17 14:18:14');
INSERT INTO `t_add_job_record` VALUES (59, 12139, '2020-06-18', 1, 2, 0, 0, 0, '2020-06-17 14:38:08');
INSERT INTO `t_add_job_record` VALUES (60, 22004, '2020-06-18', 0, 0, 0, 0, 0, '2020-06-17 17:35:52');
INSERT INTO `t_add_job_record` VALUES (61, 12139, '2020-06-19', 1, 2, 0, 0, 0, '2020-06-18 11:32:37');
INSERT INTO `t_add_job_record` VALUES (62, 12105, '2020-06-20', 1, 1, 0, 0, 0, '2020-06-18 12:45:06');
INSERT INTO `t_add_job_record` VALUES (63, 12191, '2020-06-19', 0, 0, 0, 0, 0, '2020-06-18 16:54:55');
INSERT INTO `t_add_job_record` VALUES (64, 0, '2020-06-20', 1, 1, 0, 0, 0, '2020-06-19 08:51:07');
INSERT INTO `t_add_job_record` VALUES (65, 12162, '2020-06-21', 1, 1, 1, 1, 0, '2020-06-19 11:49:47');
INSERT INTO `t_add_job_record` VALUES (66, 0, '2020-06-21', 1, 1, 0, 0, 0, '2020-06-19 11:50:04');
INSERT INTO `t_add_job_record` VALUES (67, 12149, '2020-06-21', 1, 1, 1, 1, 0, '2020-06-19 13:11:57');
INSERT INTO `t_add_job_record` VALUES (68, 12199, '2020-06-20', 1, 2, 1, 2, 0, '2020-06-19 13:14:44');
INSERT INTO `t_add_job_record` VALUES (69, 12180, '2020-06-20', 1, 1, 0, 0, 0, '2020-06-19 13:15:36');
INSERT INTO `t_add_job_record` VALUES (70, 12149, '2020-06-22', 1, 2, 1, 2, 0, '2020-06-19 13:17:42');
INSERT INTO `t_add_job_record` VALUES (71, 12162, '2020-06-22', 1, 2, 1, 2, 0, '2020-06-19 13:18:17');
INSERT INTO `t_add_job_record` VALUES (72, 0, '2020-06-22', 1, 2, 1, 2, 0, '2020-06-19 13:18:37');
INSERT INTO `t_add_job_record` VALUES (73, 12106, '2020-06-22', 1, 2, 0, 0, 0, '2020-06-19 13:23:13');
INSERT INTO `t_add_job_record` VALUES (74, 12178, '2020-06-22', 1, 2, 0, 0, 0, '2020-06-19 13:23:22');
INSERT INTO `t_add_job_record` VALUES (75, 12188, '2020-06-20', 1, 1, 0, 0, 0, '2020-06-19 13:25:18');
INSERT INTO `t_add_job_record` VALUES (76, 12115, '2020-06-20', 0, 0, 0, 0, 0, '2020-06-19 13:26:25');
INSERT INTO `t_add_job_record` VALUES (77, 12168, '2020-06-20', 1, 1, 0, 0, 0, '2020-06-19 13:27:01');
INSERT INTO `t_add_job_record` VALUES (78, 22005, '2020-06-22', 1, 2, 0, 0, 0, '2020-06-19 13:28:13');
INSERT INTO `t_add_job_record` VALUES (79, 22011, '2020-06-20', 1, 1, 0, 0, 0, '2020-06-19 13:37:46');
INSERT INTO `t_add_job_record` VALUES (80, 22011, '2020-06-21', 1, 1, 0, 0, 0, '2020-06-19 13:38:03');
INSERT INTO `t_add_job_record` VALUES (81, 12139, '2020-06-22', 1, 2, 0, 0, 0, '2020-06-19 13:41:51');
INSERT INTO `t_add_job_record` VALUES (82, 12185, '2020-06-20', 1, 1, 0, 0, 0, '2020-06-19 13:59:56');
INSERT INTO `t_add_job_record` VALUES (83, 12152, '2020-06-20', 1, 1, 0, 0, 0, '2020-06-19 14:22:23');
INSERT INTO `t_add_job_record` VALUES (84, 12152, '2020-06-21', 1, 3, 0, 0, 0, '2020-06-19 14:24:37');
INSERT INTO `t_add_job_record` VALUES (85, 12155, '2020-06-20', 0, 0, 0, 0, 0, '2020-06-19 14:49:11');
INSERT INTO `t_add_job_record` VALUES (91, 12139, '2020-06-23', 1, 2, 0, 0, 0, '2020-06-22 13:12:10');
INSERT INTO `t_add_job_record` VALUES (92, 12162, '2020-06-23', 1, 2, 1, 2, 0, '2020-06-22 14:44:59');
INSERT INTO `t_add_job_record` VALUES (93, 0, '2020-06-23', 1, 2, 1, 2, 0, '2020-06-22 14:45:09');
INSERT INTO `t_add_job_record` VALUES (94, 12149, '2020-06-23', 1, 2, 1, 2, 0, '2020-06-22 14:58:08');
INSERT INTO `t_add_job_record` VALUES (95, 12171, '2020-06-23', 1, 2, 1, 2, 0, '2020-06-22 16:36:42');
INSERT INTO `t_add_job_record` VALUES (96, 12171, '2020-06-24', 1, 2, 1, 2, 0, '2020-06-22 16:37:07');
INSERT INTO `t_add_job_record` VALUES (97, 22005, '2020-06-23', 1, 2, 0, 0, 0, '2020-06-22 16:51:48');
INSERT INTO `t_add_job_record` VALUES (98, 12139, '2020-06-24', 1, 2, 0, 0, 0, '2020-06-23 09:26:10');
INSERT INTO `t_add_job_record` VALUES (99, 22005, '2020-06-24', 1, 2, 0, 0, 0, '2020-06-23 11:53:51');
INSERT INTO `t_add_job_record` VALUES (101, 0, '2020-06-26', 1, 3, 0, 0, 0, '2020-06-23 18:31:59');
INSERT INTO `t_add_job_record` VALUES (102, 0, '2020-06-27', 1, 1, 0, 0, 0, '2020-06-23 18:32:48');
INSERT INTO `t_add_job_record` VALUES (103, 12178, '2020-06-28', 1, 2, 0, 0, 0, '2020-06-24 08:04:09');
INSERT INTO `t_add_job_record` VALUES (104, 22011, '2020-06-26', 1, 1, 0, 0, 0, '2020-06-24 08:07:28');
INSERT INTO `t_add_job_record` VALUES (105, 12152, '2020-06-26', 1, 1, 0, 0, 0, '2020-06-24 09:01:59');
INSERT INTO `t_add_job_record` VALUES (106, 12152, '2020-06-27', 1, 3, 0, 0, 0, '2020-06-24 09:02:25');
INSERT INTO `t_add_job_record` VALUES (107, 12162, '2020-06-26', 1, 1, 1, 1, 0, '2020-06-24 11:01:56');
INSERT INTO `t_add_job_record` VALUES (108, 12162, '2020-06-27', 1, 1, 1, 1, 0, '2020-06-24 11:02:11');
INSERT INTO `t_add_job_record` VALUES (109, 12162, '2020-06-28', 1, 2, 1, 2, 0, '2020-06-24 11:02:38');
INSERT INTO `t_add_job_record` VALUES (110, 12149, '2020-06-26', 1, 1, 1, 1, 0, '2020-06-24 11:02:39');
INSERT INTO `t_add_job_record` VALUES (111, 12162, '2020-06-29', 1, 2, 1, 2, 0, '2020-06-24 11:02:52');
INSERT INTO `t_add_job_record` VALUES (112, 12149, '2020-06-27', 1, 1, 1, 1, 0, '2020-06-24 11:02:59');
INSERT INTO `t_add_job_record` VALUES (113, 12162, '2020-06-30', 1, 2, 1, 2, 0, '2020-06-24 11:03:02');
INSERT INTO `t_add_job_record` VALUES (114, 12149, '2020-06-28', 1, 2, 1, 2, 0, '2020-06-24 11:03:26');
INSERT INTO `t_add_job_record` VALUES (115, 12149, '2020-06-29', 1, 2, 1, 2, 0, '2020-06-24 11:03:43');
INSERT INTO `t_add_job_record` VALUES (116, 12149, '2020-06-30', 1, 2, 1, 2, 0, '2020-06-24 11:03:57');
INSERT INTO `t_add_job_record` VALUES (117, 12139, '2020-06-28', 1, 2, 0, 0, 0, '2020-06-24 13:01:48');

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin`  (
  `userid` int(11) NULL DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `state` int(1) NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES (12159, '1', 2, '2020-06-14 19:34:13');
INSERT INTO `t_admin` VALUES (12155, '123456', 2, '2020-06-14 19:34:13');

-- ----------------------------
-- Table structure for t_admin_page_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_page_admin`;
CREATE TABLE `t_admin_page_admin`  (
  `userid` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  PRIMARY KEY (`userid`, `page_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_admin_page_admin
-- ----------------------------
INSERT INTO `t_admin_page_admin` VALUES (12155, 1);
INSERT INTO `t_admin_page_admin` VALUES (12155, 2);
INSERT INTO `t_admin_page_admin` VALUES (12159, 1);
INSERT INTO `t_admin_page_admin` VALUES (12159, 2);

-- ----------------------------
-- Table structure for t_admin_page_app
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_page_app`;
CREATE TABLE `t_admin_page_app`  (
  `userid` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  PRIMARY KEY (`userid`, `page_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_admin_page_app
-- ----------------------------
INSERT INTO `t_admin_page_app` VALUES (12159, 1);
INSERT INTO `t_admin_page_app` VALUES (12159, 2);
INSERT INTO `t_admin_page_app` VALUES (12159, 3);
INSERT INTO `t_admin_page_app` VALUES (12159, 4);

-- ----------------------------
-- Table structure for t_department
-- ----------------------------
DROP TABLE IF EXISTS `t_department`;
CREATE TABLE `t_department`  (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_department
-- ----------------------------
INSERT INTO `t_department` VALUES (1, '研发部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (2, '工艺部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (3, '一车间', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (4, '二车间', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (5, '质量保证部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (6, '财务部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (7, '计划部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (8, '办公室', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (9, '采购部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (10, '生产部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (11, '党群人事部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (12, '市场部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (13, '科研管理部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (14, ' 机动部', '2020-06-08 00:32:51');
INSERT INTO `t_department` VALUES (15, '安保部', '2020-06-08 00:32:51');

-- ----------------------------
-- Table structure for t_page_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_page_admin`;
CREATE TABLE `t_page_admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sort` int(2) NULL DEFAULT NULL,
  `group_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `group_sort` int(2) NULL DEFAULT NULL,
  `image` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_page_admin
-- ----------------------------
INSERT INTO `t_page_admin` VALUES (1, '员工管理', 1, '员工管理', 1, 'empty.jpg', '#/admin/user/user', '2020-06-20 18:26:29');
INSERT INTO `t_page_admin` VALUES (2, '管理员管理', 2, '员工管理', 1, 'empty.jpg', '#/admin/user/admin', '2020-06-23 15:38:12');
INSERT INTO `t_page_admin` VALUES (3, '加班单日统计', 1, '加班管理', 2, 'empty.jpg', '#/admin/addjobrecord', '2020-06-20 18:26:29');
INSERT INTO `t_page_admin` VALUES (4, '加班多日汇总', 2, '加班管理', 2, 'empty.jpg', '#/admin/addjobrecord', '2020-06-23 15:41:05');
INSERT INTO `t_page_admin` VALUES (5, '生产计划', 1, '车间生产', 3, 'empty.jpg', '#/produce/plan', '2020-06-20 18:26:29');

-- ----------------------------
-- Table structure for t_page_app
-- ----------------------------
DROP TABLE IF EXISTS `t_page_app`;
CREATE TABLE `t_page_app`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sort` int(2) NULL DEFAULT NULL,
  `group_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `group_sort` int(2) NULL DEFAULT NULL,
  `image` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_page_app
-- ----------------------------
INSERT INTO `t_page_app` VALUES (1, '加班统计', 1, '管理', 1, 'empty.jpg', '/pages/modules/addjob/addjob/addjob', '2020-06-20 18:26:29');
INSERT INTO `t_page_app` VALUES (2, '生产计划', 1, '车间生产', 2, 'empty.jpg', '/pages/modules/produce/plan/plan', '2020-06-20 18:26:29');
INSERT INTO `t_page_app` VALUES (3, '加班汇总', 2, '管理', 1, 'empty.jpg', '/pages/modules/produce/plan/plan', '2020-06-20 18:26:29');
INSERT INTO `t_page_app` VALUES (4, '加班单人', 3, '管理', 1, 'empty.jpg', '/pages/modules/produce/plan/plan', '2020-06-20 18:26:29');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` int(11) NOT NULL,
  `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `department_id` int(2) NULL DEFAULT NULL,
  `state` int(1) NULL DEFAULT NULL,
  `systime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (0, 'o2lQZ0ZtNx00uXDOUAnqgP4kpRws', '薛永刚', 1, 2, '2020-06-12 11:51:16');
INSERT INTO `t_user` VALUES (3, 'o2lQZ0eCo5BFSPMegiwem2e-z2MQ', '丁洁琼', 1, 2, '2020-06-17 12:22:53');
INSERT INTO `t_user` VALUES (68, 'o2lQZ0c_hSmc5PNGy2GGvma3woEA', '李胜', 1, 2, '2020-06-23 08:31:50');
INSERT INTO `t_user` VALUES (1215, 'o2lQZ0Yh3gAEn1GiXdIZ4pv5rXh8', '王宇', 1, 2, '2020-06-12 07:12:44');
INSERT INTO `t_user` VALUES (7883, 'o2lQZ0Q1_Hh2yOhZ42eloJGoH5qs', '郑强', 1, 2, '2020-06-18 17:02:28');
INSERT INTO `t_user` VALUES (10009, 'o2lQZ0e2QLy5dPAPmGhPw2xJC6X8', '刘金', 1, 2, '2020-06-12 07:31:17');
INSERT INTO `t_user` VALUES (12101, 'o2lQZ0VmKVyJiX9QCirH306Y-o-I', '王耀文', 1, 2, '2020-06-12 08:18:50');
INSERT INTO `t_user` VALUES (12102, 'o2lQZ0bxSWy8khvl7MUYmw8sdbag', '李宏梅', 1, 2, '2020-06-19 15:09:53');
INSERT INTO `t_user` VALUES (12104, 'o2lQZ0TGyinZYqzjaJP6snNTAv0M', '祝文甫', 1, 2, '2020-06-12 14:58:38');
INSERT INTO `t_user` VALUES (12105, 'o2lQZ0SK1n64HX9wSF7i7OeKVy-Y', '姜军', 1, 2, '2020-06-12 13:28:06');
INSERT INTO `t_user` VALUES (12106, 'o2lQZ0TNmlXIlu-rDU-1yezE2PVk', '郑祥滨', 1, 2, '2020-06-17 10:30:07');
INSERT INTO `t_user` VALUES (12109, 'o2lQZ0e2Z4Z2vGi2kX8HbS3KkHFc', '邓春云', 1, 2, '2020-06-12 07:47:03');
INSERT INTO `t_user` VALUES (12110, 'o2lQZ0fPJQXQWTB1IjyLT-GaT4ho', '李德贤', 1, 2, '2020-06-19 13:30:43');
INSERT INTO `t_user` VALUES (12111, 'o2lQZ0bpf1xUg6auIpkSqZxYOSAw', '邓雷', 1, 2, '2020-06-12 07:31:03');
INSERT INTO `t_user` VALUES (12112, 'o2lQZ0aDQd38fPfBFBFR4aETvZ3c', '王大伟', 1, 2, '2020-06-19 21:28:23');
INSERT INTO `t_user` VALUES (12115, 'o2lQZ0elVqBmRLfSrIEoaT96ocMk', '邓舸', 1, 2, '2020-06-19 13:26:09');
INSERT INTO `t_user` VALUES (12121, 'o2lQZ0WjwfDIL6N8PYw4tTymApfA', '佟大龙', 1, 2, '2020-06-12 07:13:42');
INSERT INTO `t_user` VALUES (12126, 'o2lQZ0TePB1aFQM_9wkVQ-LMralI', '姜海峰', 1, 2, '2020-06-12 11:31:57');
INSERT INTO `t_user` VALUES (12127, 'o2lQZ0cpTEiHolljy-SXes0yGAko', '柳辉', 1, 2, '2020-06-12 07:19:17');
INSERT INTO `t_user` VALUES (12135, 'o2lQZ0dli8nNilXSWRIWyaJp6mOA', '于孟欣', 1, 2, '2020-06-12 07:45:11');
INSERT INTO `t_user` VALUES (12139, 'o2lQZ0TZ0HZEcQsA4PaOQnkVQptg', '何春阳', 1, 2, '2020-06-12 08:01:22');
INSERT INTO `t_user` VALUES (12145, 'o2lQZ0af8ZpWpuZg09_71SjyPhdU', '韩季秋', 1, 2, '2020-06-12 07:11:24');
INSERT INTO `t_user` VALUES (12146, 'o2lQZ0cJzDITNV24YX-yFCia7MbU', '杨春艳', 1, 2, '2020-06-12 11:36:29');
INSERT INTO `t_user` VALUES (12148, 'o2lQZ0a3OCH8md4DLQgWFd0U-Az4', '尹海昆', 1, 2, '2020-06-15 13:36:52');
INSERT INTO `t_user` VALUES (12149, 'o2lQZ0YNVpm5ocLpWg_HUqnLFeaI', '魏景军', 1, 2, '2020-06-12 11:42:56');
INSERT INTO `t_user` VALUES (12152, 'o2lQZ0flVbuyWWMthBYgIlg5xbXQ', '臧军望', 1, 2, '2020-06-12 12:16:21');
INSERT INTO `t_user` VALUES (12154, 'o2lQZ0VaZkkqGX6xdP6KVOQgnmLQ', '杜秀琴', 1, 2, '2020-06-16 14:30:46');
INSERT INTO `t_user` VALUES (12155, 'o2lQZ0eiLAAQZsh8sxQ3t1g5VRLY', '周谷春阳', 1, 2, '2020-06-12 07:09:12');
INSERT INTO `t_user` VALUES (12159, 'o2lQZ0WMG6z_VFuJUYwEyzITQGnA', '陈玉锋', 1, 2, '2020-06-25 18:16:10');
INSERT INTO `t_user` VALUES (12160, 'o2lQZ0b4NJHnkcN-QMmT7h_QG95U', '胡天德', 1, 2, '2020-06-19 13:23:56');
INSERT INTO `t_user` VALUES (12162, 'o2lQZ0br279XljFCmCG-MqGPbPF4', '高原', 1, 2, '2020-06-12 11:50:34');
INSERT INTO `t_user` VALUES (12164, 'o2lQZ0fXBKGwOyU38NsIei2KcriM', '刘洪波', 1, 2, '2020-06-17 11:30:36');
INSERT INTO `t_user` VALUES (12166, 'o2lQZ0YfcCxslXVO8llEHFU4__a0', '邹仁杰', 1, 2, '2020-06-19 13:58:57');
INSERT INTO `t_user` VALUES (12168, 'o2lQZ0dG71XyazYoYee71Y-jPovM', '董镇山', 1, 2, '2020-06-12 08:22:04');
INSERT INTO `t_user` VALUES (12171, 'o2lQZ0V1IGH8qvQ9Zi0k_dxvJ7yk', '田光远', 1, 2, '2020-06-12 15:09:08');
INSERT INTO `t_user` VALUES (12177, 'o2lQZ0Tp1Lf9rJ89uf2DKwippKk0', '杨忠生', 1, 2, '2020-06-19 13:27:38');
INSERT INTO `t_user` VALUES (12178, 'o2lQZ0aOWo9ABJQYPc9clMuLt57c', '关勇', 1, 2, '2020-06-12 07:14:52');
INSERT INTO `t_user` VALUES (12179, 'o2lQZ0R02lECwH-SsSUMNG0jQVqE', '杨春', 1, 2, '2020-06-12 08:37:05');
INSERT INTO `t_user` VALUES (12180, 'o2lQZ0SpQT4Eyh3LuQ0SvUEVPRj0', '丁小旭', 1, 2, '2020-06-19 13:13:55');
INSERT INTO `t_user` VALUES (12183, 'o2lQZ0UDZU2ZTu7N8mcmvE-IG8EM', '韩仁冬', 1, 2, '2020-06-12 09:47:25');
INSERT INTO `t_user` VALUES (12184, 'o2lQZ0eUA8AeA9yqG6jjmZLgd7bk', '吴玉琪', 1, 2, '2020-06-12 09:49:26');
INSERT INTO `t_user` VALUES (12185, 'o2lQZ0ejPEcvIrX-Ub5AaqMkuC6s', '张鑫磊', 1, 2, '2020-06-19 13:49:11');
INSERT INTO `t_user` VALUES (12187, 'o2lQZ0Z6Ny3tn7fGEFpI5TQlmzXc', '赵晟皓', 1, 2, '2020-06-12 11:27:53');
INSERT INTO `t_user` VALUES (12188, 'o2lQZ0YhEkOD8rClLfjoWOQswyrQ', '吴雨', 1, 2, '2020-06-12 14:05:46');
INSERT INTO `t_user` VALUES (12189, 'o2lQZ0aBe9fMQ_ijxhmZFegXfH0E', '程延伟', 1, 2, '2020-06-12 07:11:24');
INSERT INTO `t_user` VALUES (12191, 'o2lQZ0XNU2G07qfQwqL49vJ3MOPY', '吴天浩', 1, 2, '2020-06-12 08:00:37');
INSERT INTO `t_user` VALUES (12195, 'o2lQZ0WcalGMoDZTR-VLEXjjXAFw', '李帅', 1, 2, '2020-06-12 11:29:33');
INSERT INTO `t_user` VALUES (12199, 'o2lQZ0Wo3Dq6_o8Eczv4JRcIB4FQ', '张学松', 1, 2, '2020-06-19 13:14:25');
INSERT INTO `t_user` VALUES (12200, 'o2lQZ0RHS8Vu3ypu2BvhTJ7PjADU', '闫月', 1, 2, '2020-06-12 07:16:25');
INSERT INTO `t_user` VALUES (22001, 'o2lQZ0Uk7HKDENyhCSIhdR41tG5Q', '孙红玲', 1, 2, '2020-06-12 07:13:27');
INSERT INTO `t_user` VALUES (22004, 'o2lQZ0ThUsicWDDvHawib7Y2ImRc', '卢悦', 1, 2, '2020-06-17 17:35:42');
INSERT INTO `t_user` VALUES (22005, 'o2lQZ0XWZjWrAUUk_rDnfJHEuCYk', '林勺博', 1, 2, '2020-06-18 11:29:27');
INSERT INTO `t_user` VALUES (22011, 'o2lQZ0f8fQ6DDWgWhdVopWufxBKw', '刘宪华', 1, 2, '2020-06-19 13:37:19');

SET FOREIGN_KEY_CHECKS = 1;
