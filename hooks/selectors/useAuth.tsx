import {useSelector} from "react-redux"
import { RootState } from '@/redux/store'

export default function useAuth() {
    return useSelector((state:RootState)=>state.auth)
}
 
