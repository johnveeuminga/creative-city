import { decodeToken, getServerSession } from "@/lib/server/auth";
import { S3 } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { Conditions } from "@aws-sdk/s3-presigned-post/dist-types/types";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3({
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: 'AKIA3FAI7PRF4B7OWWW7',
    secretAccessKey: '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',
  },
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()

    if(!session || !session.user)
      return NextResponse.json("Unauthorized", { status: 401 })

    const conditions: Conditions[] = [
      { bucket: "creative-city"},
      ["starts-with", "$key", "tmp/"],
      ["content-length-range", 0, 5242880],
    ];

    const { url, fields } = await createPresignedPost(s3, {
      Bucket: 'creative-city',
      Key: `tmp/${new Date().getTime()}-${Math.floor(Math.random() * 1024 )}.jpg`,
      Conditions: conditions,
      Expires: 3600,
      Fields: {
        'Content-Type': 'image/jpg'
      }
    })

    console.log("URL", url)
    console.log("Fields", fields)

    return NextResponse.json({
      url,
      fields
    })
  } catch(err) {
    NextResponse.json("Error", { status: 500})
  }
}