"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBUserRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../domain/entities/user.entity");
const result_1 = require("../../util/result");
const user_dao_1 = require("../dao/user.dao");
let DBUserRepository = class DBUserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return result_1.Result.failure(new Error('User not found'));
        }
        const userEntity = new user_entity_1.UserEntity(user.id, user.email, user.hashedPassword);
        return result_1.Result.success(userEntity);
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return result_1.Result.failure(new Error('User not found'));
        }
        const userEntity = new user_entity_1.UserEntity(user.id, user.email, user.hashedPassword);
        return result_1.Result.success(userEntity);
    }
    async save(user) {
        const userDAO = this.userRepository.create({
            id: user.id,
            email: user.email,
            hashedPassword: user.getHashedPassword(),
        });
        await this.userRepository.save(userDAO);
        return result_1.Result.success(undefined);
    }
};
exports.DBUserRepository = DBUserRepository;
exports.DBUserRepository = DBUserRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(user_dao_1.UserDAO)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DBUserRepository);
//# sourceMappingURL=db-user.repository.js.map