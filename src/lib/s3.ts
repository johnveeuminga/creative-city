import { S3Client } from "@aws-sdk/client-s3";

let s3Client: S3Client;

if (process.env.NODE_ENV === "production") {
  s3Client = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
      accessKeyId: 'AKIA3FAI7PRF4B7OWWW7',
      secretAccessKey: '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',
    },
  });
} else {
  let globalWithPrisma = global as typeof globalThis & {
    s3Client: S3Client;
  };
  if (!globalWithPrisma.s3Client) {
    globalWithPrisma.s3Client = new S3Client({
      region: 'ap-southeast-1',
      credentials: {
        accessKeyId: 'AKIA3FAI7PRF4B7OWWW7',
        secretAccessKey: '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',
      },
    });;
  }
  s3Client = globalWithPrisma.s3Client;
}

export default s3Client
