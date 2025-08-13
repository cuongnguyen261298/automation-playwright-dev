export class Data {
  private constructor() {
    throw new Error("Cannot instantiate Data class");
  }
  private static _dbInternalIdList: string[] = [];

  public static get dbInternalIdList(): string[] {
    return Data._dbInternalIdList;
  }

  public static set dbInternalIdList(value: string[]) {
    Data._dbInternalIdList = value;
  }
}
