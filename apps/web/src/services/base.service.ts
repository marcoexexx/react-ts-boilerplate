import { AppError, AppErrorKind } from "@error";
import { ResourceKey } from "./resourceKey";

export abstract class BaseService<
  Filter extends FilterPayload<any>,
  Return extends BasePayload,
> {
  public abstract repo: ResourceKey;

  /// TODO: impletemt api fetch
  async findMany(
    opt: QueryOptionArgs,
    { filter, pagination, include }: Filter,
  ): Promise<HttpListResponse<Return>> {
    let { Db } = await import("./_devDb");

    console.log(`${this.repo}.findMany`, {
      opt,
      filter,
      pagination,
      include,
    });

    let res: HttpListResponse<Return> = {
      count: Db[this.repo].length,
      error: undefined,
      status: 200,
      results: Db.todos,
    };

    return new Promise((resolve) => {
      setTimeout(() => resolve(res), 3 * 1000);
    });
  }

  async find(opt: QueryOptionArgs, filter: {
    where: { id: string };
    include?: Filter["include"];
  }): Promise<Return> {
    console.log({ opt, filter });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::find`,
      ),
    );
  }

  async uploadExcel(buf: ArrayBuffer): Promise<HttpResponse> {
    console.log({ buf });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::uploadExcel`,
      ),
    );
  }

  /// TODO: impletemt api fetch, Response return!!
  async create(payload: CreatePayload<Return>): Promise<Return> {
    let { Db } = await import("./_devDb");

    let newEntity: BasePayload = {
      ...payload,
      id: `${Db[this.repo].length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    Db[this.repo].push(newEntity);

    return newEntity as Return;
  }

  async update(arg: {
    id: string;
    payload: UpdatePayload<Return>;
  }): Promise<Return> {
    console.log({ arg });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::update`,
      ),
    );
  }

  async deleteMany(ids: string[]): Promise<HttpResponse> {
    console.log({ ids });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::deleteMany`,
      ),
    );
  }

  async delete(id: string): Promise<Return> {
    console.log({ id });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::delete`,
      ),
    );
  }
}
