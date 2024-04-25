import AppError, { AppErrorKind } from "@/utils/exception";
import { ResourceKey } from "./resourceKey";

export abstract class BaseService<
  Filter extends FilterPayload<any>,
  Return extends BasePayload,
> {
  public abstract repo: ResourceKey;

  findMany(opt: QueryOptionArgs, filter: {
    where?: Filter["where"];
    pagination: Filter["pagination"];
    include?: Filter["include"];
  }): Promise<HttpListResponse<Return>> {
    console.log({ opt, filter });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::findMany`,
      ),
    );
  }

  find(opt: QueryOptionArgs, filter: {
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

  uploadExcel(buf: ArrayBuffer): Promise<HttpResponse> {
    console.log({ buf });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::uploadExcel`,
      ),
    );
  }

  create(payload: CreatePayload<Return>): Promise<Return> {
    console.log({ payload });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::create`,
      ),
    );
  }

  update(arg: {
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

  deleteMany(ids: string[]): Promise<HttpResponse> {
    console.log({ ids });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::deleteMany`,
      ),
    );
  }

  delete(id: string): Promise<Return> {
    console.log({ id });

    return Promise.reject(
      AppError.new(
        AppErrorKind.ServiceError,
        `Unimplemented feature call ${this.repo}::delete`,
      ),
    );
  }
}
