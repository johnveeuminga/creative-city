const generatePostSignedUrl = async() => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/s3/post/url`);

  const presignedUrl = await response.json();

  return {
    url: presignedUrl.url,
    fields: presignedUrl.fields,
  }
}

export type S3UploadResult = {
  key: string
}


export async function upload(file: File): Promise<S3UploadResult>  {
  console.log('Uploading File')
  const { url, fields } = await generatePostSignedUrl()

  const formData = new FormData()

  Object.keys(fields).forEach((key, field) => {
    formData.append(key, fields[key])
  })

  formData.append('file', file)

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if(upload.ok) 
    return { key: fields.key }
  else
    throw new Error("Something went wrong on file upload")
}