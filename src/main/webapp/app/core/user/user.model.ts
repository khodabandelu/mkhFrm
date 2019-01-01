import {Authority} from "app/core/authority/authority.model";
import {Group} from "app/admin/groups";

export interface IUser {
    id?: any;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    enabled?: boolean;
    langKey?: string;
    authorities?: any[];
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
    password?: string;
}

export class User implements IUser {
    constructor(
        public id?: any,
        public username?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public enabled?: boolean,
        public langKey?: string,
        public authorities?: Authority[],
        public groups?: Group[],
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
        public password?: string,
    ) {
        this.id = id ? id : null;
        this.username = username ? username : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.email = email ? email : null;
        this.enabled = enabled ? enabled : false;
        this.langKey = langKey ? langKey : null;
        this.authorities = authorities ? authorities : null;
        this.groups = groups ? groups : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.password = password ? password : null;
    }
}
