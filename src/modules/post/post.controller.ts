import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../../interfaces/IController';

// Utilities
import ApiResponse from '../../utilities/api-response.utility';
import ApiUtility from '../../utilities/api.utility';

// Repositories
import { PostRepository } from './post.repository';

// Interfaces
import { IPostDataRequest, IPostDataUpdate } from '../../interfaces/post.interface';

const create: IController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const postData: IPostDataRequest = {
      title,
      content,
    };

    const post = await PostRepository.create(postData);

    if (post) {
      const postRes = await PostRepository.getById(post._id);
      return ApiResponse.result(res, postRes, httpStatusCodes.OK);
    }

    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

const index: IController = async (req, res) => {
  try {
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');

    const posts = await PostRepository.list({ limit, page });
    if (posts) {
      return ApiResponse.result(res, posts, httpStatusCodes.OK);
    }

    return ApiResponse.error(res, httpStatusCodes.NOT_FOUND);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const id = req.params.id;

    const { title, content } = req.body;
    const postData: IPostDataUpdate = {
      title,
      content,
    };

    const post = await PostRepository.updateById(id, postData);

    if (post) {
      return ApiResponse.result(res, post, httpStatusCodes.OK);
    }

    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

const getById: IController = async (req, res) => {
  try {
    const id = req.params.id;

    if (id) {
      const post = await PostRepository.getById(id);
      if (post) {
        return ApiResponse.result(res, post, httpStatusCodes.OK);
      }
    }

    return ApiResponse.error(res, httpStatusCodes.NOT_FOUND);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

const deleteById: IController = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostRepository.deleteById(id);

    if (post) {
      return ApiResponse.result(res, { message: 'Deleted successfully.' }, httpStatusCodes.OK);
    }

    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e);
  }
};

export default {
  create,
  index,
  update,
  getById,
  deleteById,
};
