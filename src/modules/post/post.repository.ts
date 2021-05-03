// Models
import { Post } from './post.model';

// Interfaces
import { IPostDataRequest, IPostDataUpdate } from '../../interfaces/post.interface';
import { IQueryParams } from '../../interfaces/request.interface';

export class PostRepository {
  public static create(postData: IPostDataRequest) {
    return Post.create(postData);
  }

  public static where(data: object) {
    return Post.findOne({ ...data, isDeleted: 0 });
  }

  public static getById(id: string) {
    return Post.findOne({ _id: id, isDeleted: 0 });
  }

  public static list({ limit, page }: IQueryParams) {
    return Post.find({ isDeleted: 0 })
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
  }

  public static updateById(id: string, postData: IPostDataUpdate) {
    return Post.findOneAndUpdate({ _id: id, isDeleted: 0 }, postData, { new: true });
  }

  public static deleteById(id: string) {
    return Post.findOneAndUpdate({ _id: id }, { isDeleted: 1 }, { new: true });
  }
}
