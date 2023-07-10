import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: 'AKIA3FAI7PRF4B7OWWW7',
    secretAccessKey: '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',
  },
});

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//         acl: 'public-read',
//         key: function (req, file, cb) {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             cb(null, `${uniqueSuffix}-${file.originalname}`);
//         },
//     })
// });

// export async function POST(req, res) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ message: "Method not allowed" });
//     }

//     try {
//         let { name, type } = req.body;

//         const command = new PutObjectCommand({
//             Bucket: "creative-city",
//             Key: "hello-s33.txt",
//             Body: "Hello S3!",
//         });

//         const url = await s3.send(command);
//         console.log(url, 'url');
//     } catch (err) {
//         console.log(err);
//     }
// };

export async function POST(request: NextRequest) {

}

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "8mb", // Set desired value here
//     },
//   },
// };
