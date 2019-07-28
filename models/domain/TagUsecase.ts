import { Usecase } from '.';

export interface TagUsecase extends Usecase {
  getTags(): Promise<string[]>;
}