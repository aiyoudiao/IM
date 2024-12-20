import { __decorate, __metadata } from "tslib";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
let Storage = class Storage extends CommonEntity {
};
__decorate([
    Column({ type: 'varchar', length: 200, comment: '文件名' }),
    ApiProperty({ description: '文件名' }),
    __metadata("design:type", String)
], Storage.prototype, "name", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 200,
        nullable: true,
        comment: '真实文件名',
    }),
    ApiProperty({ description: '真实文件名' }),
    __metadata("design:type", String)
], Storage.prototype, "fileName", void 0);
__decorate([
    Column({ name: 'ext_name', type: 'varchar', nullable: true }),
    ApiProperty({ description: '扩展名' }),
    __metadata("design:type", String)
], Storage.prototype, "extName", void 0);
__decorate([
    Column({ type: 'varchar' }),
    ApiProperty({ description: '文件类型' }),
    __metadata("design:type", String)
], Storage.prototype, "path", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    ApiProperty({ description: '文件类型' }),
    __metadata("design:type", String)
], Storage.prototype, "type", void 0);
__decorate([
    Column({ type: 'varchar', nullable: true }),
    ApiProperty({ description: '文件大小' }),
    __metadata("design:type", String)
], Storage.prototype, "size", void 0);
__decorate([
    Column({ nullable: true, name: 'user_id' }),
    ApiProperty({ description: '用户ID' }),
    __metadata("design:type", Number)
], Storage.prototype, "userId", void 0);
Storage = __decorate([
    Entity({ name: 'tool_storage' })
], Storage);
export { Storage };
//# sourceMappingURL=storage.entity.js.map