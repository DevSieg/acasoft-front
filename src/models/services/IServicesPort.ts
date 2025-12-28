// service.port.ts
export type IServicePort<TModel, CreateInput, UpdateInput, WhereUniqueInput> = {
    create(data: CreateInput): Promise<TModel>;
    getAll(): Promise<TModel[]>;
    getById(where: WhereUniqueInput): Promise<TModel | null> | Promise<TModel> | null;
    update(where: WhereUniqueInput, data: UpdateInput): Promise<TModel>;
    delete(where: WhereUniqueInput): Promise<TModel>;

};
