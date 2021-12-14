/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 Taras Mazepa. Contact address: taras@maze.pa .
 */
const Roles = require("./../models/roles");

const IsAdmin = (role) => role === Roles.admin;
const IsWriter = (role) => role === Roles.writer;

module.exports = { IsAdmin, IsWriter };
