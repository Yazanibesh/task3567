import Joi from 'joi';

export default {
  create: Joi.object({
    title: Joi.string().required().error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'The title is required.';
            break;
          case 'string.base':
            err.message = 'The title must be a string.';
            break;
          case 'any.empty':
            err.message = 'The title is not allowed to be empty.';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
    content: Joi.string().required().error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'The content is required.';
            break;
          case 'string.base':
            err.message = 'The content must be a string.';
            break;
          case 'any.empty':
            err.message = 'The content is not allowed to be empty.';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  }),
  update: Joi.object({
    title: Joi.string().required().error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'The title is required.';
            break;
          case 'string.base':
            err.message = 'The title must be a string.';
            break;
          case 'any.empty':
            err.message = 'The title is not allowed to be empty.';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
    content: Joi.string().required().error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'The content is required.';
            break;
          case 'string.base':
            err.message = 'The content must be a string.';
            break;
          case 'any.empty':
            err.message = 'The content is not allowed to be empty.';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  }),
};
