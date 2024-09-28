import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    "users": [],
    "count": 0
}
const createUser = (state: any, action: PayloadAction<any>) => {
    console.log("action.payload >>>>>", action.payload)
    console.log("state", state.users)
    state.users.push({ ...action.payload })
    state.count = state.users.length
}

const getUsersList = (state: any, _action: PayloadAction<any>) => {
    return state.users
}
const getByIdUser = (state: any, action: PayloadAction<any>) => {
    return state.users.find((fd: any) => fd?.id === action.payload.id)
}
const updateUser = (state: any, action: PayloadAction<any>) => {
    let newArray = []
    for(let item of action?.payload?.previousState){
        console.log("item >>>>>", item)
        if(item.id === action.payload.newValue?.id){
            newArray.push(action.payload.newValue)
        }else{
            newArray.push(item)
        }
    }
    state.users = newArray
    console.log("action?.payload?.previousState", action?.payload?.previousState)
}

const deleteUserById = (state: any, action: PayloadAction<any>) => {
    let newArray = action?.payload?.users.filter((f: any) => f.id != action?.payload?.id)
    state.users = newArray
}

const userSlice = createSlice({
    name: 'USERS',
    initialState,
    reducers: {
        create: createUser,
        list: getUsersList,
        update: updateUser,
        getById: getByIdUser,
        deleteUser: deleteUserById, 
    }
})

export const { create, list, update, getById, deleteUser } = userSlice.actions
export default userSlice.reducer