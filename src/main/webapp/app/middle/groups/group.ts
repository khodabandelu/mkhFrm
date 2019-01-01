export interface IGroup {
  id?: number;
  code?: string;
  groupName?: string;
  users?: any[];
  actions?: any[];
}

export class Group implements IGroup {

  constructor(id?: number,
              code?: string,
              groupName?: string,
              users?: any[],
              actions?: any[]) {
  }
}
