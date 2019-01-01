export interface IAuthority {
    id?: any;
    name?: string;
    title?: string;
    src?: string;
    sortOrder?: number;
    enabled?: boolean;
    icon?: string;
    parentId?:number;
}

export class Authority implements IAuthority {
    constructor(
        public id?: any,
        public name?: string,
        public title?: string,
        public src?: string,
        public sortOrder?: number,
        public enabled?: boolean,
        public icon?: string,
        public parentId?:number
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.title = title ? title : null;
        this.src = src ? src : null;
        this.sortOrder = sortOrder ? sortOrder : 0;
        this.enabled = enabled ? enabled : false;
        this.icon = icon ? icon : null;
        this.parentId = parentId? parentId :null;
    }
}
