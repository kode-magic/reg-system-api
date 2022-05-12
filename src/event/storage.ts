import { Storage } from '@google-cloud/storage';

const storage = new Storage({
    projectId: 'mamie-coca'
});

export const upload = (file: any) => new Promise((resolve, reject) => {
    const bucket = storage.bucket('mamie-coca-store');
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    });

    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl)
    }).on('error', (error) => { reject(error) }).end(buffer)
})