import { defaultAge } from "./defaults/age.type"
import { defaultFisrtName } from "./defaults/firstName.type"
import { defaultLastName } from "./defaults/lastName.type"

declare namespace UserType {
    export interface userCreateFields {
        firstName : defaultFisrtName,
        lastName : defaultLastName,
        age : defaultAge
    }
}
export default UserType

