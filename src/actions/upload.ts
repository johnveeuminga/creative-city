'use server'

export async function doFileUpload(formData: FormData) {
  const file = formData.get('file') as File
}