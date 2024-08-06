import { AppError, AppErrorKind } from "@error";
import { ResourceKey } from "./resourceKey";

export abstract class BaseService<
  Filter extends FilterPayload<any>,
  Return extends BasePayload,
> {
  public abstract repo: ResourceKey;

  async findMany(
    opt: QueryOptionArgs,
    filter: Filter,
  ): Promise<HttpListResponse<Return>> {
    console.log(`${this.repo}.findMany`, opt, filter);

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::find`,
      ),
    );
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

  async create(payload: CreatePayload<Return>): Promise<Return> {
    console.log({ payload });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::uploadExcel`,
      ),
    );
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
