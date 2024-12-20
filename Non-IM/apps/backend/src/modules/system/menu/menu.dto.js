import { __decorate, __metadata } from "tslib";
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min, MinLength, ValidateIf, } from 'class-validator';
import { OperatorDto } from '~/common/dto/operator.dto';
var MenuType;
(function (MenuType) {
    /** 菜单 */
    MenuType[MenuType["MENU"] = 0] = "MENU";
    /** 目录 */
    MenuType[MenuType["MENU_GROUP"] = 1] = "MENU_GROUP";
    /** 权限 */
    MenuType[MenuType["PERMISSION"] = 2] = "PERMISSION";
})(MenuType || (MenuType = {}));
export class MenuDto extends OperatorDto {
}
__decorate([
    ApiProperty({
        description: `
菜单类型:
- 0: 菜单
- 1: 目录
- 2: 权限   
    `,
        enum: MenuType,
    }),
    IsIn([0, 1, 2]),
    __metadata("design:type", Number)
], MenuDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ description: '父级菜单' }),
    IsOptional(),
    __metadata("design:type", Number)
], MenuDto.prototype, "parentId", void 0);
__decorate([
    ApiProperty({ description: '菜单或权限名称' }),
    IsString(),
    MinLength(2),
    __metadata("design:type", String)
], MenuDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: '排序' }),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], MenuDto.prototype, "orderNo", void 0);
__decorate([
    ApiProperty({ description: '前端路由地址' })
    // @Matches(/^[/]$/)
    ,
    ValidateIf(o => o.type !== MenuType.PERMISSION),
    __metadata("design:type", String)
], MenuDto.prototype, "path", void 0);
__decorate([
    ApiProperty({ description: '是否外链', default: false }),
    ValidateIf(o => o.type !== MenuType.PERMISSION),
    IsBoolean(),
    __metadata("design:type", Boolean)
], MenuDto.prototype, "isExt", void 0);
__decorate([
    ApiProperty({ description: '外链打开方式', default: 1 }),
    ValidateIf((o) => o.isExt),
    IsIn([1, 2]),
    __metadata("design:type", Number)
], MenuDto.prototype, "extOpenMode", void 0);
__decorate([
    ApiProperty({ description: '菜单是否显示', default: 1 }),
    ValidateIf((o) => o.type !== MenuType.PERMISSION),
    IsIn([0, 1]),
    __metadata("design:type", Number)
], MenuDto.prototype, "show", void 0);
__decorate([
    ApiProperty({ description: '设置当前路由高亮的菜单项，一般用于详情页' }),
    ValidateIf((o) => o.type !== MenuType.PERMISSION && o.show === 0),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], MenuDto.prototype, "activeMenu", void 0);
__decorate([
    ApiProperty({ description: '是否开启页面缓存', default: 1 }),
    ValidateIf((o) => o.type === 1),
    IsIn([0, 1]),
    __metadata("design:type", Number)
], MenuDto.prototype, "keepAlive", void 0);
__decorate([
    ApiProperty({ description: '状态', default: 1 }),
    IsIn([0, 1]),
    __metadata("design:type", Number)
], MenuDto.prototype, "status", void 0);
__decorate([
    ApiProperty({ description: '菜单图标' }),
    IsOptional(),
    ValidateIf((o) => o.type !== MenuType.PERMISSION),
    IsString(),
    __metadata("design:type", String)
], MenuDto.prototype, "icon", void 0);
__decorate([
    ApiProperty({ description: '对应权限' }),
    ValidateIf((o) => o.type === MenuType.PERMISSION),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], MenuDto.prototype, "permission", void 0);
__decorate([
    ApiProperty({ description: '菜单路由路径或外链' }),
    ValidateIf((o) => o.type !== MenuType.PERMISSION),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], MenuDto.prototype, "component", void 0);
export class MenuUpdateDto extends PartialType(MenuDto) {
}
export class MenuQueryDto extends PartialType(MenuDto) {
}
//# sourceMappingURL=menu.dto.js.map