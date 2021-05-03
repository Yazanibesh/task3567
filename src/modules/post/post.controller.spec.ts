const mockingoose = require('mockingoose');
import { mockRequest, mockResponse } from '../../mocks/api.mock';
import postController from './post.controller';
import { Post } from './post.model';

describe('Testing Post controller', () => {
  test('Get list posts', async () => {
    const _doc = [{
      _id: '5f220479-917a-4cef-ab83-b34b983ac4e5',
      isDeleted: false,
      title: 'title',
      content: 'content',
      createdAt: '2021-04-27T00:02:25.538Z',
      updatedAt: '2021-04-27T00:02:25.538Z',
    }];
    mockingoose(Post).toReturn(_doc, 'find');
    const req = mockRequest();
    const res = mockResponse();
    req.query.page = 1;
    req.query.limit = 5;
    await postController.getById(req, res);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
  });
});
