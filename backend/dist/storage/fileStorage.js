"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_FILE = path_1.default.join(__dirname, '../../data/tasks.json');
class FileStorage {
    ensureDataFile() {
        const dir = path_1.default.dirname(DATA_FILE);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        if (!fs_1.default.existsSync(DATA_FILE)) {
            fs_1.default.writeFileSync(DATA_FILE, '[]', 'utf-8');
        }
    }
    async readTasks() {
        this.ensureDataFile();
        const data = fs_1.default.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    }
    async writeTasks(tasks) {
        this.ensureDataFile();
        fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
    }
    async findAll() {
        return this.readTasks();
    }
    async findById(id) {
        const tasks = await this.readTasks();
        return tasks.find(task => task.id === id) || null;
    }
    async create(task) {
        const tasks = await this.readTasks();
        tasks.unshift(task);
        await this.writeTasks(tasks);
        return task;
    }
    async update(id, updates) {
        const tasks = await this.readTasks();
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1)
            return null;
        tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
        await this.writeTasks(tasks);
        return tasks[index];
    }
    async delete(id) {
        const tasks = await this.readTasks();
        const filtered = tasks.filter(task => task.id !== id);
        if (filtered.length === tasks.length)
            return false;
        await this.writeTasks(filtered);
        return true;
    }
}
exports.FileStorage = FileStorage;
