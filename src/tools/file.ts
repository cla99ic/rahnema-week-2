import fs from 'fs'
import path from 'path'

export const getAllFilePaths = (directory: string): string[] => {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry: any) => (entry.isDirectory() ? getAllFilePaths(path.join(directory, entry.name)) : path.join(directory, entry.name)))
}
