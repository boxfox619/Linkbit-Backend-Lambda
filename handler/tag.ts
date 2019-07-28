import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { response } from '../models/lambda';
import { TagUsecase } from '../models/domain';
import { ErrorMessage } from '../models/entity';
import TagHandler from '../models/handler/TagHandler';

const handlers = (tagRepo: TagUsecase): TagHandler => ({
  getTags: middleware(
    async () => {
      try {
        const res = await tagRepo.getTags();
        return response(200, res);
      } catch (e) {
        console.error(e);
        return response(500, { title: '서버 에러', reason: e.message } as ErrorMessage);
      }
    }
  )
})

export default handlers;