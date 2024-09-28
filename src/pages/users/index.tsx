import { useState } from 'react'
import Table from './components/table'
import Form from './components/form'
import Button from '../../components/button'
import { useAppDispatch, useAppSelector } from '../../hook/redux'
import { deleteUser } from '../../store/features/users'



export default function UserList() {
  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.users)
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [actionType, setActionType] = useState<any>('CREATE')
  const [editableData, getEditable] = useState<any>(null)
  const columns = [
    {
      name: 'S.No',
    },
    {
      name: 'Name',
      key: 'name'
    },
    {
      name: 'Email',
      key: 'email'
    },
    {
      name: 'LinkedIn',
      key: 'linkedinURL'
    },
    {
      name: 'Gender',
      key: 'gender'
    },
    {
      name: 'Address',
      key: 'address',
      isFn: true,
      fn: (row: any) => {
        console.log("row >>>>", row)
        const address = [row?.address?.line_one, row?.address?.line_two, row?.address?.state, row?.address?.city, row?.address.pin].filter(f => !!f).join(',')
        console.log("address ", address)
        return address
      }
    },
    {
      name: 'Actions',
      component: (row: any) => {
        return <div className='p-1 flex flex-1  justify-center items-center gap-1 '>
          <div>
            <Button buttonText='Edit'
              className={`w-[4rem] h-[2rem] ${row?.isEditable ? 'bg-slate-100 text-green-600' : 'bg-slate-100'}`}
              handleClick={() => {
                setActionType('UPDATE')
                setOpenForm(true)
                getEditable(row)
              }}
              disabled={!row?.isEditable}
            />


          </div>
          <div>
            <Button
              className='w-[4rem] h-[2rem] bg-slate-100 text-red-600'
              buttonText='Delete' handleClick={() => {
                dispatch(deleteUser({
                  users: userState.users,
                  id: row.id
                }))
              }} />
          </div>
        </div>
      }
    }
  ]
  const usersList = useAppSelector((state) => state.users.users)
  return (
    <main>
      <div className='flex flex-1 flex-col'>
        <div className='flex flex-1 justify-between gap-2'>
          <h2 className='font-bold'>Hello, User!!</h2>
          <div>
            {usersList?.length > 0 && (
              <Button className='bg-slate-100 text-blue-600'
              buttonText={'+ Add'} handleClick={() => {
                setActionType('CREATE')
                setOpenForm(true)
              }
              } />
            )
              }
          </div>
        </div>

        <div className=' '>
          {
            usersList?.length ? (<Table data={usersList} columns={columns} />) : (
              <div className=' h-[20rem] flex flex-col justify-center items-center font-bold'>
                <h1 >Create New User !!</h1>
                <Button className='bg-slate-100 text-blue-600 w-[200px]'
                  buttonText={'+ Add'} handleClick={() => {
                    setActionType('CREATE')
                    setOpenForm(true)
                  }
                  } />
              </div>
            )
          }

        </div>
      </div>
      {openForm && (<Form actionType={actionType} setOpenForm={setOpenForm} editableData={editableData} />)}
    </main>
  )
}
