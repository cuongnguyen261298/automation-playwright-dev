import { error } from "console";
import dotenv from "dotenv";

dotenv.config({
  //Based on loaded variables in .NODE_ENV, else based on loaded variables in .production file
  path: `src/env/.env.${process.env.NODE_ENV || "production"}`,
});

export enum UserCredential {
  STANDARD_USER = 'src/.auth/standard_user.json',
  LOCKED_OUT_USER = 'src/.auth/locked_out_user.json',
  PROBLEM_USER = 'src/.auth/problem_user.json',
  ERROR_USER = 'src/.auth/error_user.json',
  VISUAL_USER = 'src/.auth/visual_user.json',
}

export class SharedUserData {

  private constructor() {
    // singleton, one instance only
    throw new error("Cannot instantiate class, Only use private props/methods");
  }

  private static _accountMap = new Map<UserCredential, [string, string]>([
    [UserCredential.STANDARD_USER , [process.env.STANDARD_USER ?? '', process.env.PASSWORD_FOR_ALL ?? '']],
    [UserCredential.LOCKED_OUT_USER , [process.env.LOCKED_OUT_USER ?? '', process.env.PASSWORD_FOR_ALL ?? '']],
    [UserCredential.PROBLEM_USER , [process.env.PROBLEM_USER ?? '', process.env.PASSWORD_FOR_ALL ?? '']],
    [UserCredential.ERROR_USER , [process.env.ERROR_USER ?? '', process.env.PASSWORD_FOR_ALL ?? '']],
    [UserCredential.VISUAL_USER , [process.env.VISUAL_USER ?? '', process.env.PASSWORD_FOR_ALL ?? '']]
  ]);

  //The underscore prefix, uniquely distinguish an entity
  private static _name: string;

  public static get accountMap() {
    return SharedUserData._accountMap;
  }

  public static set accountMap(value) {
    SharedUserData._accountMap = value;
  }
  public static get name(): string {
    return SharedUserData._name;
  }
  public static set name(value: string) {
    SharedUserData._name = value;
  }
}
