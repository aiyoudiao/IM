import { __decorate, __metadata, __param } from "tslib";
import { basename, extname } from 'node:path';
import { Inject, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import * as qiniu from 'qiniu';
import { OssConfig } from '~/config';
import { NETDISK_COPY_SUFFIX, NETDISK_DELIMITER, NETDISK_HANDLE_MAX_ITEM, NETDISK_LIMIT } from '~/constants/oss.constant';
import { UserService } from '~/modules/user/user.service';
import { generateRandomValue } from '~/utils';
let NetDiskManageService = class NetDiskManageService {
    constructor(qiniuConfig, userService) {
        this.qiniuConfig = qiniuConfig;
        this.userService = userService;
        this.mac = new qiniu.auth.digest.Mac(this.qiniuConfig.accessKey, this.qiniuConfig.secretKey);
        this.config = new qiniu.conf.Config({
            zone: this.qiniuConfig.zone,
        });
        // bucket manager
        this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
    }
    /**
     * 获取文件列表
     * @param prefix 当前文件夹路径，搜索模式下会被忽略
     * @param marker 下一页标识
     * @returns iFileListResult
     */
    async getFileList(prefix = '', marker = '', skey = '') {
        // 是否需要搜索
        const searching = !isEmpty(skey);
        return new Promise((resolve, reject) => {
            this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                prefix: searching ? '' : prefix,
                limit: NETDISK_LIMIT,
                delimiter: searching ? '' : NETDISK_DELIMITER,
                marker,
            }, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    // 如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
                    // 指定options里面的marker为这个值
                    const fileList = [];
                    // 处理目录，但只有非搜索模式下可用
                    if (!searching && !isEmpty(respBody.commonPrefixes)) {
                        // dir
                        for (const dirPath of respBody.commonPrefixes) {
                            const name = dirPath
                                .substr(0, dirPath.length - 1)
                                .replace(prefix, '');
                            if (isEmpty(skey) || name.includes(skey)) {
                                fileList.push({
                                    name: dirPath
                                        .substr(0, dirPath.length - 1)
                                        .replace(prefix, ''),
                                    type: 'dir',
                                    id: generateRandomValue(10),
                                });
                            }
                        }
                    }
                    // handle items
                    if (!isEmpty(respBody.items)) {
                        // file
                        for (const item of respBody.items) {
                            // 搜索模式下处理
                            if (searching) {
                                const pathList = item.key.split(NETDISK_DELIMITER);
                                // dir is empty stirng, file is key string
                                const name = pathList.pop();
                                if (item.key.endsWith(NETDISK_DELIMITER)
                                    && pathList[pathList.length - 1].includes(skey)) {
                                    // 结果是目录
                                    const ditName = pathList.pop();
                                    fileList.push({
                                        id: generateRandomValue(10),
                                        name: ditName,
                                        type: 'dir',
                                        belongTo: pathList.join(NETDISK_DELIMITER),
                                    });
                                }
                                else if (name.includes(skey)) {
                                    // 文件
                                    fileList.push({
                                        id: generateRandomValue(10),
                                        name,
                                        type: 'file',
                                        fsize: item.fsize,
                                        mimeType: item.mimeType,
                                        putTime: new Date(Number.parseInt(item.putTime) / 10000),
                                        belongTo: pathList.join(NETDISK_DELIMITER),
                                    });
                                }
                            }
                            else {
                                // 正常获取列表
                                const fileKey = item.key.replace(prefix, '');
                                if (!isEmpty(fileKey)) {
                                    fileList.push({
                                        id: generateRandomValue(10),
                                        name: fileKey,
                                        type: 'file',
                                        fsize: item.fsize,
                                        mimeType: item.mimeType,
                                        putTime: new Date(Number.parseInt(item.putTime) / 10000),
                                    });
                                }
                            }
                        }
                    }
                    resolve({
                        list: fileList,
                        marker: respBody.marker || null,
                    });
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    /**
     * 获取文件信息
     */
    async getFileInfo(name, path) {
        return new Promise((resolve, reject) => {
            this.bucketManager.stat(this.qiniuConfig.bucket, `${path}${name}`, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    const detailInfo = {
                        fsize: respBody.fsize,
                        hash: respBody.hash,
                        md5: respBody.md5,
                        mimeType: respBody.mimeType.split('/x-qn-meta')[0],
                        putTime: new Date(Number.parseInt(respBody.putTime) / 10000),
                        type: respBody.type,
                        uploader: '',
                        mark: respBody?.['x-qn-meta']?.['!mark'] ?? '',
                    };
                    if (!respBody.endUser) {
                        resolve(detailInfo);
                    }
                    else {
                        this.userService
                            .getAccountInfo(Number.parseInt(respBody.endUser))
                            .then((user) => {
                            if (isEmpty(user)) {
                                resolve(detailInfo);
                            }
                            else {
                                detailInfo.uploader = user.username;
                                resolve(detailInfo);
                            }
                        });
                    }
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    /**
     * 修改文件MimeType
     */
    async changeFileHeaders(name, path, headers) {
        return new Promise((resolve, reject) => {
            this.bucketManager.changeHeaders(this.qiniuConfig.bucket, `${path}${name}`, headers, (err, _, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    /**
     * 创建文件夹
     * @returns true创建成功
     */
    async createDir(dirName) {
        const safeDirName = dirName.endsWith('/') ? dirName : `${dirName}/`;
        return new Promise((resolve, reject) => {
            // 上传一个空文件以用于显示文件夹效果
            const formUploader = new qiniu.form_up.FormUploader(this.config);
            const putExtra = new qiniu.form_up.PutExtra();
            formUploader.put(this.createUploadToken(''), safeDirName, ' ', putExtra, (respErr, respBody, respInfo) => {
                if (respErr) {
                    reject(respErr);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    /**
     * 检查文件是否存在，同可检查目录
     */
    async checkFileExist(filePath) {
        return new Promise((resolve, reject) => {
            // fix path end must a /
            // 检测文件夹是否存在
            this.bucketManager.stat(this.qiniuConfig.bucket, filePath, (respErr, respBody, respInfo) => {
                if (respErr) {
                    reject(respErr);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    // 文件夹存在
                    resolve(true);
                }
                else if (respInfo.statusCode === 612) {
                    // 文件夹不存在
                    resolve(false);
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    /**
     * 创建Upload Token, 默认过期时间一小时
     * @returns upload token
     */
    createUploadToken(endUser) {
        const policy = new qiniu.rs.PutPolicy({
            scope: this.qiniuConfig.bucket,
            insertOnly: 1,
            fsizeLimit: 1024 ** 2 * 10,
            endUser,
        });
        const uploadToken = policy.uploadToken(this.mac);
        return uploadToken;
    }
    /**
     * 重命名文件
     * @param dir 文件路径
     * @param name 文件名称
     */
    async renameFile(dir, name, toName) {
        const fileName = `${dir}${name}`;
        const toFileName = `${dir}${toName}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.move(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    /**
     * 移动文件
     */
    async moveFile(dir, toDir, name) {
        const fileName = `${dir}${name}`;
        const toFileName = `${toDir}${name}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.move(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    /**
     * 复制文件
     */
    async copyFile(dir, toDir, name) {
        const fileName = `${dir}${name}`;
        // 拼接文件名
        const ext = extname(name);
        const bn = basename(name, ext);
        const toFileName = `${toDir}${bn}${NETDISK_COPY_SUFFIX}${ext}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.copy(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    /**
     * 重命名文件夹
     */
    async renameDir(path, name, toName) {
        const dirName = `${path}${name}`;
        const toDirName = `${path}${toName}`;
        let hasFile = true;
        let marker = '';
        const op = {
            force: true,
        };
        const bucketName = this.qiniuConfig.bucket;
        while (hasFile) {
            await new Promise((resolve, reject) => {
                // 列举当前目录下的所有文件
                this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                    prefix: dirName,
                    limit: NETDISK_HANDLE_MAX_ITEM,
                    marker,
                }, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        const moveOperations = respBody.items.map((item) => {
                            const { key } = item;
                            const destKey = key.replace(dirName, toDirName);
                            return qiniu.rs.moveOp(bucketName, key, bucketName, destKey, op);
                        });
                        this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                            if (err2) {
                                reject(err2);
                                return;
                            }
                            if (respInfo2.statusCode === 200) {
                                if (isEmpty(respBody.marker))
                                    hasFile = false;
                                else
                                    marker = respBody.marker;
                                resolve();
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                            }
                        });
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
    }
    /**
     * 获取七牛下载的文件url链接
     * @param key 文件路径
     * @returns 连接
     */
    getDownloadLink(key) {
        if (this.qiniuConfig.access === 'public') {
            return this.bucketManager.publicDownloadUrl(this.qiniuConfig.domain, key);
        }
        else if (this.qiniuConfig.access === 'private') {
            return this.bucketManager.privateDownloadUrl(this.qiniuConfig.domain, key, Date.now() / 1000 + 36000);
        }
        throw new Error('qiniu config access type not support');
    }
    /**
     * 删除文件
     * @param dir 删除的文件夹目录
     * @param name 文件名
     */
    async deleteFile(dir, name) {
        return new Promise((resolve, reject) => {
            this.bucketManager.delete(this.qiniuConfig.bucket, `${dir}${name}`, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    /**
     * 删除文件夹
     * @param fileList 需要操作的文件或文件夹
     * @param dir 文件目录名称
     */
    async deleteMultiFileOrDir(fileList, dir) {
        const files = fileList.filter(item => item.type === 'file');
        if (files.length > 0) {
            // 批处理文件
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                return qiniu.rs.deleteOp(this.qiniuConfig.bucket, fileName);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        // 处理文件夹
        const dirs = fileList.filter(item => item.type === 'dir');
        if (dirs.length > 0) {
            // 处理文件夹的复制
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        // 列举当前目录下的所有文件
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    return qiniu.rs.deleteOp(this.qiniuConfig.bucket, key);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if (isEmpty(respBody.marker))
                                            hasFile = false;
                                        else
                                            marker = respBody.marker;
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
    /**
     * 复制文件，含文件夹
     */
    async copyMultiFileOrDir(fileList, dir, toDir) {
        const files = fileList.filter(item => item.type === 'file');
        const op = {
            force: true,
        };
        if (files.length > 0) {
            // 批处理文件
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                // 拼接文件名
                const ext = extname(item.name);
                const bn = basename(item.name, ext);
                const toFileName = `${toDir}${bn}${NETDISK_COPY_SUFFIX}${ext}`;
                return qiniu.rs.copyOp(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        // 处理文件夹
        const dirs = fileList.filter(item => item.type === 'dir');
        if (dirs.length > 0) {
            // 处理文件夹的复制
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                const copyDirName = `${toDir}${dirs[i].name}${NETDISK_COPY_SUFFIX}/`;
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        // 列举当前目录下的所有文件
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    const destKey = key.replace(dirName, copyDirName);
                                    return qiniu.rs.copyOp(this.qiniuConfig.bucket, key, this.qiniuConfig.bucket, destKey, op);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if (isEmpty(respBody.marker))
                                            hasFile = false;
                                        else
                                            marker = respBody.marker;
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
    /**
     * 移动文件，含文件夹
     */
    async moveMultiFileOrDir(fileList, dir, toDir) {
        const files = fileList.filter(item => item.type === 'file');
        const op = {
            force: true,
        };
        if (files.length > 0) {
            // 批处理文件
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                const toFileName = `${toDir}${item.name}`;
                return qiniu.rs.moveOp(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        // 处理文件夹
        const dirs = fileList.filter(item => item.type === 'dir');
        if (dirs.length > 0) {
            // 处理文件夹的复制
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                const toDirName = `${toDir}${dirs[i].name}/`;
                // 移动的目录不是是自己
                if (toDirName.startsWith(dirName))
                    continue;
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        // 列举当前目录下的所有文件
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    const destKey = key.replace(dirName, toDirName);
                                    return qiniu.rs.moveOp(this.qiniuConfig.bucket, key, this.qiniuConfig.bucket, destKey, op);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if (isEmpty(respBody.marker))
                                            hasFile = false;
                                        else
                                            marker = respBody.marker;
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
};
NetDiskManageService = __decorate([
    Injectable(),
    __param(0, Inject(OssConfig.KEY)),
    __metadata("design:paramtypes", [Object, UserService])
], NetDiskManageService);
export { NetDiskManageService };
//# sourceMappingURL=manage.service.js.map