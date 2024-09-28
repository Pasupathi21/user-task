import { STATE_WITH_CITY } from '../data/statecity'

export const getStates = () => {
    return Object.keys(STATE_WITH_CITY).map(m => ({ label: m, value: m}))
}

export const getCitys = (stateName: any) => {
 let cityArray = [] as any   
 for(let [key, value] of Object.entries(STATE_WITH_CITY)){
    if(key === stateName) cityArray= value
 } 
return cityArray?.map((m: string) => ({ label: m, value: m}))
}