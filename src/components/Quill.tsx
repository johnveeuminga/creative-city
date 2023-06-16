import dynamic from "next/dynamic"

export const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
});

export default QuillNoSSRWrapper
