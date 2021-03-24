import { Rol } from "./rol.model";

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    roles: Rol[];
}