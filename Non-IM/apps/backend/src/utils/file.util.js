import fs from 'node:fs';
import path from 'node:path';
import dayjs from 'dayjs';
var Type;
(function (Type) {
    Type["IMAGE"] = "\u56FE\u7247";
    Type["TXT"] = "\u6587\u6863";
    Type["MUSIC"] = "\u97F3\u4E50";
    Type["VIDEO"] = "\u89C6\u9891";
    Type["OTHER"] = "\u5176\u4ED6";
})(Type || (Type = {}));
export function getFileType(extName) {
    const documents = 'txt doc pdf ppt pps xlsx xls docx';
    const music = 'mp3 wav wma mpa ram ra aac aif m4a';
    const video = 'avi mpg mpe mpeg asf wmv mov qt rm mp4 flv m4v webm ogv ogg';
    const image = 'bmp dib pcp dif wmf gif jpg tif eps psd cdr iff tga pcd mpt png jpeg';
    if (image.includes(extName))
        return Type.IMAGE;
    if (documents.includes(extName))
        return Type.TXT;
    if (music.includes(extName))
        return Type.MUSIC;
    if (video.includes(extName))
        return Type.VIDEO;
    return Type.OTHER;
}
export function getName(fileName) {
    if (fileName.includes('.'))
        return fileName.split('.')[0];
    return fileName;
}
export function getExtname(fileName) {
    return path.extname(fileName).replace('.', '');
}
export function getSize(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
export function fileRename(fileName) {
    const name = fileName.split('.')[0];
    const extName = path.extname(fileName);
    const time = dayjs().format('YYYYMMDDHHmmSSS');
    return `${name}-${time}${extName}`;
}
export function getFilePath(name, currentDate, type) {
    return `/upload/${currentDate}/${type}/${name}`;
}
export async function saveLocalFile(buffer, name, currentDate, type) {
    const filePath = path.join(__dirname, '../../', 'public/upload/', `${currentDate}/`, `${type}/`);
    try {
        // 判断是否有该文件夹
        await fs.promises.stat(filePath);
    }
    catch (error) {
        // 没有该文件夹就创建
        await fs.promises.mkdir(filePath, { recursive: true });
    }
    const writeStream = fs.createWriteStream(filePath + name);
    writeStream.write(buffer);
}
export async function saveFile(file, name) {
    const filePath = path.join(__dirname, '../../', 'public/upload', name);
    const writeStream = fs.createWriteStream(filePath);
    const buffer = await file.toBuffer();
    writeStream.write(buffer);
}
export async function deleteFile(name) {
    fs.unlink(path.join(__dirname, '../../', 'public', name), () => {
        // console.log(error);
    });
}
//# sourceMappingURL=file.util.js.map