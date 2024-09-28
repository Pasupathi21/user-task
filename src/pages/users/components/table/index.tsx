


interface TableProps {
  data: Record<string, any>[]
  columns: Record<string, any>[]
}
export default function Table({ data, columns }: TableProps) {
  return (<>
    <div className='w-full h-auto mt-2 max-h-[500px] overflow-y-auto'>
      <table className='w-full border  rounded-b-lg'>
        <thead className="bg-slate-400">
          {columns?.map((col: any) => (<th>{col?.name}</th>))}
        </thead>
        <tbody>
          {
            data?.map((row: any, i: number) => (<>
              <tr className={`p-1 ${ (i +1 )%2 === 0 ? 'bg-slate-300': ''} rounded-md`}>
                <td className='P-2'>{i+1}</td>
                {
                  columns.map((col: any) => {
                    return (
                      <>
                      { col.name === 'Actions' ? col.component(row) : col.key && <td className='P-2'>{col.isFn ? col.fn(row) : row[col.key]}</td>}
                      </>
                   )
                  })
                }
              </tr>
            </>))
          }
        </tbody>
      </table>
    </div>
  </>)
}
