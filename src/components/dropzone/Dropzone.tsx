import { useDropzone } from "react-dropzone"
import styles from "@/styles/components/dropzone.module.scss"
import React, { useEffect } from "react"
import { upload } from "@/lib/client/s3-upload"
import { MdClose } from "react-icons/md"

export type FileWithPreview = {
  file: File,
  preview: string,
  uploadStatus: 'uploading' | 'successful' | 'failed',
  order: 0,
  s3FileName?: string,
}

export default function Dropzone({ onFileChange }: { onFileChange?: (files: FileWithPreview[], mediaUploadPromiseStatus: Promise<any>[]) => void}) {
  const [files, setFiles] = React.useState<Array<FileWithPreview>>([])
  const [mediaUploadPromiseStatus, setMediaUploadPromiseStatus] = React.useState<Array<Promise<any>>>([])

  useEffect(() => {
    if(onFileChange)
      onFileChange(files, mediaUploadPromiseStatus)
  }, [files, onFileChange, mediaUploadPromiseStatus])


  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({ 
    accept: { 'image/*': [],}, 
    onDrop: (acceptedFiles: File[]) => {
      setFiles(state => {
        const previews: FileWithPreview[] = acceptedFiles.map((file, index) => {
          const promise = upload(file)
          setMediaUploadPromiseStatus((state) => {
            return [
              ...state,
              promise
            ]
          })

          promise.then((res) => {
            setFiles(state => {
              const stateCopied = state.map((value, i) => {
                if(i === index) { 
                  value.uploadStatus = 'successful';
                  value.s3FileName = res.key
                }

                return value;
              })

              console.log("promise resolved files", stateCopied)

              return stateCopied
            })
          })

          return {
            file,
            preview: URL.createObjectURL(file),
            uploadStatus: 'uploading',
            order: 0,
          }
        })

        return [
          ...state,
          ...previews,
        ]
      })
    }
  })

  return (
    <div {...getRootProps({ className: styles.dropzone })}>
      <input type="text" {...getInputProps()} />
      {
        !!! files.length &&
        <>
          <p className="fw-bold mb-2">Drop files here or click to upload</p>
          <p className="text-body-tertiary mb-0">You can upload upto 5 files.</p>
        </>
      }
      <div className="previews d-flex align-items-center justify-content-center">
        { 
          files.map((file, index) => (
            <div 
              key={index}
              className={`${styles.preview} position-relative me-3`}>
              <picture>
                <img 
                  src={file.preview} 
                  alt="" />
              </picture>
              <button className={`${styles.remove} btn btn-primary rounded-circle`}>
                <MdClose />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}