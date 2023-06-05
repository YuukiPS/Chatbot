import fs from 'fs'

export function getRandomFolder(folderPath: string): string {
    const folders = fs.readdirSync(folderPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    if (folders.length === 0) {
        throw new Error('No custom action folders found');
    }

    const randomIndex = Math.floor(Math.random() * folders.length);
    return folders[randomIndex];
}