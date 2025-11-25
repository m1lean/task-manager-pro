"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const uuid_1 = require("uuid");
class TaskModel {
    static create(dto) {
        const now = new Date().toISOString();
        return {
            id: (0, uuid_1.v4)(),
            title: dto.title,
            description: dto.description || '',
            priority: dto.priority,
            completed: false,
            createdAt: now,
            updatedAt: now
        };
    }
}
exports.TaskModel = TaskModel;
