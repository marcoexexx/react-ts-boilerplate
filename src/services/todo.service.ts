import { BaseService } from "./base.service";
import { ResourceKey } from "./resourceKey";

const _todos: Todo[] = [];

export class TodoService extends BaseService<TodoFilterInput, Todo> {
  constructor(public repo: ResourceKey) {
    super();
  }

  static new() {
    return new TodoService(ResourceKey.Todo);
  }

  override async findMany(
    opt: QueryOptionArgs,
    filter: FilterPayload<Todo>,
  ): Promise<HttpListResponse<Todo>> {
    /**
     * API Fetch
     * ```ts
     * const url = `/${this.repo}`;
     * const { data } = await baseApi.post(url, payload);
     * ```
     */

    const data: HttpListResponse<Todo> = await Promise.resolve({
      status: 200,
      error: undefined,
      results: _todos,
      count: _todos.length,
    });
    console.log({ opt, filter, _todos });
    return data;
  }

  override async create(payload: CreatePayload<Todo>): Promise<Todo> {
    /**
     * API Fetch
     * ```ts
     * const url = `/${this.repo}`;
     * const { data } = await baseApi.post(url, payload);
     * ```
     */
    const data = await Promise.resolve(payload) as Todo;
    _todos.push({
      ...data,
      id: (_todos.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return data;
  }
}
