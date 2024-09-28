import { useEffect, useState } from 'react'
import { Input } from '../../../components/input'
import Label from '../../../components/label'
import { DropDown } from '../../../components/dropdown'
import { gender } from '../../../data/gender'
import Button from '../../../components/button'
import { getStates, getCitys } from '../../../services/base.service'
import { useAppDispatch, useAppSelector } from '../../../hook/redux'
import { create, update } from '../../../store/features/users'

interface FormProps {
    actionType: 'CREATE' | 'UPDATE'
    id?: string;
    setOpenForm: (value: boolean) => void;
    editableData: Record<string, any>
}
export default function From({ actionType = "CREATE",  setOpenForm, editableData }: FormProps) {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.users)
    const [formValue, setFormValue] = useState<any>({
        name: "",
        email: "",
        linkedinURL: "",
        gender: "",
        address: {
            line_one: "",
            line_two: "",
            state: "",
            city: "",
            pin: ""
        },
        isEditable: true

    })
    const [errorMessage, setErrorMessage] = useState<any>({})
    const [state, setState] = useState<any[]>([])
    const [city, setCity] = useState<any[]>([])
    const [_isFormValid, setFormIsValid] = useState(true)

    const handleInputChange = (key: string, event: any) => {
        const value = event.target.value
        let updateState: any = formValue
        if (['line_one', 'line_two', 'state', 'city', 'pin']?.includes(key)) {
            if (key === 'pin') {
                if (value && ((!/^\d+$/.test(value)) || value.length > 6)) {
                    setErrorMessage({
                        ...errorMessage,
                        address: {
                            ...errorMessage?.address,
                            [key]: value.length > 6 ? 'pincode should be 6 digits' : 'invalid pin'
                        }
                    })
                    setFormIsValid(false)
                } else {
                    setErrorMessage({
                        ...errorMessage,
                        address: {
                            ...errorMessage?.address,
                            [key]: null
                        }
                    })
                    setFormIsValid(true)
                }
            }
            updateState = {
                ...updateState,
                address: {
                    ...updateState.address,
                    [key]: value
                }
            }
            if (key === 'state') {
                setCity(getCitys(value))
            }
        } else {
            // if (errorMessage[key]) {
                
            // }
            let message = null
                // name character validation
                if((key === 'name')){
                    message =  value?.length < 3 || value?.length > 20 ? 'Name must be between 2 and 20 characters ' : null
                }
                setErrorMessage({
                    ...errorMessage,
                    [key]: message
                })

            updateState = {
                ...updateState,
                [key]: value
            }
        }
        setFormValue({
            ...formValue,
            ...updateState
        })
    }
    // const setError = (obj: any) => {
    //     setErrorMessage({
    //         ...errorMessage,
    //         ..
    //     })
    // }
    const beforeSubmit = (values: Record<string, any>) => {
        // console.log("values >>>>>", values)
        let isFormValid = true
        const mandatoryFields = ['name', 'email', 'linkedinURL', 'gender']
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        // main details validation
        const errorObj = {} as any
        mandatoryFields.forEach((key) => {
            console.log(key, values[key])
            if (key === 'email') {
                if (!emailRegex.test(values[key])) {
                    isFormValid = false
                    errorObj[key] = 'invalid email'
                }
            }else if(key === 'name'){
                if(values[key]?.length < 3 || values[key]?.length > 20){
                    errorObj[key] = 'Name must be between 2 and 20 characters'
                    isFormValid = false
                }
            } 
            else {
                if (!values[key]) {
                    isFormValid = false
                    errorObj[key] = 'required field'
                }
            }
        })
        setErrorMessage({
            ...errorMessage,
            ...errorObj
        })
        setFormIsValid(isFormValid)
        // pincode validation
        console.log("isFormValid", isFormValid)
        if (isFormValid) handleSubmit(values)
    }

    const handleSubmit = (values: Record<string, any>) => {
        try {
            console.log("handleSubmit >>>>>", values)
            dispatch(actionType === 'CREATE' ? create({ id: Date.now(), ...values }) : update({ newValue: { id: editableData.id, ...values }, previousState: userState.users }))
            setOpenForm(false)
            console.log("userState", userState)
        } catch (error) {
            console.log("error", error)
        }
    }



    useEffect(() => {
        setState(getStates())
        if (actionType === 'UPDATE') {
            setFormValue({ ...editableData })
            if (editableData?.address.state)
                setCity(getCitys(editableData?.address.state))
        }
        return () => { }
    }, [])
    console.log("userState >>>>", userState)
    return (
        <div className='flex flex-1 flex-col w-[50%] h-auto bg-slate-200 rounded-lg p-2 gap-2 absolute top-[20%] left-[25%]'>
            <div className='flex flex-1 justify-between p-1'>
                <div>
                    <h3 className='bold font-bold'>{actionType === 'CREATE' ? 'Add User' : 'Edit User'}</h3>
                </div>
                <div className='cursor-pointer' onClick={() => setOpenForm(false)}>
                    ❌
                </div>
            </div>
            <div>
                <form className='flex flex-1 flex-col gap-2'>
                    <main className='flex flex-1 flex-row gap-1 flex-wrap'>
                        <div className='flex flex-col flex-1 items-start gap-1'>
                            <Label htmlFor="Name" labelName="Name" required={true} />
                            <div>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formValue?.name}
                                    handleInputChange={handleInputChange}
                                    error={errorMessage}
                                    placeholder="  Enter name"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1 items-start gap-1'>
                            <Label htmlFor="email" labelName="Email" required={true} />
                            <Input
                                id="email"
                                name="email"
                                value={formValue?.email}
                                handleInputChange={handleInputChange}
                                placeholder="  Enter email"
                                error={errorMessage}

                            />
                        </div>
                        <div className='flex flex-col flex-1 items-start gap-1'>
                            <Label htmlFor="linkedinURL" labelName="Linkedin URL" required={true} />
                            <Input
                                id="linkedinURL"
                                name="linkedinURL"
                                value={formValue?.linkedinURL}
                                handleInputChange={handleInputChange}
                                placeholder="  Enter URL"
                                error={errorMessage}

                            />
                        </div>
                        <div className='flex flex-col flex-1 items-start gap-1'>
                            <Label htmlFor="Gender" labelName="Gender" required={true} />
                            <DropDown
                                options={gender} value={formValue?.gender} name={'gender'} handleInputChange={handleInputChange}
                                error={errorMessage}
                            />
                        </div>
                    </main>
                    <hr />
                    <div className="border-2 border-white-200 rounded-md mt-2 w-full"></div>
                    {/* subform */}
                    <main className='flex flex-1 flex-col gap-1 items-start'>
                        <h4 className='font-semibold'>Address</h4>
                        <form className='flex flex-1 flex-row gap-1 flex-wrap'>
                            <div className='flex flex-col flex-1 items-start gap-1'>
                                <Label htmlFor="line_one" labelName="Line One" />
                                <Input
                                    id="line_one"
                                    name="line_one"
                                    value={formValue?.address?.line_one}
                                    handleInputChange={handleInputChange}
                                    placeholder="  Enter address"
                                />
                            </div>
                            <div className='flex flex-col flex-1 items-start gap-1'>
                                <Label htmlFor="line_two" labelName="Line Two" />
                                <Input
                                    id="line_two"
                                    name="line_two"
                                    value={formValue?.address?.line_two}
                                    handleInputChange={handleInputChange}
                                    placeholder="  Enter address"
                                />
                            </div>
                            <div className='flex flex-col flex-1 items-start gap-1'>
                                <Label htmlFor="state" labelName="State" />
                                <DropDown
                                    options={state} value={formValue?.address?.state} name={'state'} handleInputChange={handleInputChange} />
                            </div>
                            <div className='flex flex-col flex-1 items-start gap-1'>
                                <Label htmlFor="city" labelName="City" />
                                <DropDown
                                    options={city} value={formValue?.address?.city} name={'city'} handleInputChange={handleInputChange} />
                            </div>
                            <div className='flex flex-col flex-1 items-start gap-1'>
                                <Label htmlFor="pin" labelName="Pin" />
                                <Input
                                    id="pin"
                                    name="pin"
                                    value={formValue?.address?.pin}
                                    handleInputChange={handleInputChange}
                                    placeholder="  Enter pin"
                                    error={errorMessage.address}
                                />
                            </div>
                        </form>
                    </main>
                    <div className='mt-10 flex flex-1 justify-between items-center'>
                        <div className='flex items-center '>
                            <input type="checkbox" checked={formValue.isEditable} onChange={(_event) => { handleInputChange("isEditable", { target: { value: !formValue.isEditable}})}}/> &nbsp; <p className='font-thin'>If you want to make this record non-editable, uncheck the box</p>
                        </div>
                        <div>
                            <Button type="button" buttonText={'submit'} handleClick={() => beforeSubmit(formValue)} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
