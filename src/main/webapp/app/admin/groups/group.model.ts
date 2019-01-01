import {Authority} from "app/core/authority/authority.model";
import {User} from "app/core";

export interface IGroup {
    id?: any;
    name?: string;
    users?: any[];
    authorities?: any[];
}

export class Group implements IGroup {
    constructor(
        public id?: any,
        public name?: string,
        public users?: User[],
        public authorities?: Authority[],
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.users = users ? users : null;
        this.authorities = authorities ? authorities : null;
    }
}
