import {IGroup} from '../groups/group';

export interface IAction {
  id?: number;
  title?: string;
  src?: string;
  parent?: IAction;
  childs?: IAction[];
  groups?: IGroup[];
}

export class Action implements IAction {

  constructor(id?: number,
              title?: string,
              src?: string,
              parent?: IAction,
              childs?: IAction[],
              groups?: IGroup[]) {
  }
}
