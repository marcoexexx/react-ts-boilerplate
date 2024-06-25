import { BaseService } from "./base.service";
import { ResourceKey } from "./resourceKey";

export class TodoService extends BaseService<TodoFilterInput, Todo> {
  constructor(public repo: ResourceKey) {
    super();
  }

  static new() {
    return new TodoService(ResourceKey.Todo);
  }
}
