import { defaultAge } from "./defaults/age.type"
import { defaultFisrtName } from "./defaults/firstName.type"
import { defaultLastName } from "./defaults/lastName.type"

namespace UserType {
    export interface userCreateFields {
        firstName : defaultFisrtName,
        lastName : defaultLastName,
        age : defaultAge
    }
}
export default UserType