
export default function Label({
    htmlFor,
    labelName,
    required
}: any) {
  return (
    <>
    {
    required ? (
        <label htmlFor={htmlFor}>{labelName}<span className="text-red-600">*</span></label>
    ):
    (

        <label htmlFor={htmlFor}>{labelName}</label>
    )
    }
    </>
  )
}
