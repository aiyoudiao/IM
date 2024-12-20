import fs from 'node:fs';
import path from 'node:path';
const sql = fs.readFileSync(path.join(__dirname, '../../deploy/sql/nest_admin.sql'), 'utf8');
export class InitData1707996695540 {
    constructor() {
        this.name = 'InitData1707996695540';
    }
    async up(queryRunner) {
        await queryRunner.query(sql);
    }
    async down(queryRunner) {
    }
}
//# sourceMappingURL=1707996695540-initData.js.map