import { TagUsecase } from '../../models/domain';

export class TagRepository implements TagUsecase {
  getTags = async () => {
    return ['라거', '에일', '람빅', '국산맥주', '수입맥주', '유럽맥주', '독일맥주', '중국맥주', '미국맥주', '러시아맥주', '일본맥주', '저가', '인기', 'OB맥주'];
  }

}