import { isEmpty } from 'lodash';

export class QueryRules {
  public data: object;
  public rules: object;

  public constructor(data = {}, rules: object = {}) {
    this.rules = rules;
    this.data = data;
  }

  public generateQuery = () => {
    const q = {};

    for (const key of Object.keys(this.rules)) {
      if (!isEmpty(this.data[key])) {
        Object.assign(q, this.rules[key](this.data[key]));
      }
    }

    return q;
  };
}
