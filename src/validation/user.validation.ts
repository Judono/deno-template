import Joi, {ObjectSchema, ValidationResult} from 'joi';

const UserRegisterSchema : ObjectSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).messages({
    'string.pattern.base': 'Password must have minimum 8 characters length, at least one lowercase letter, one uppercase letter, one number and one special character',
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
  }),
  roles : Joi.array().items(Joi.string().valid("USER", "AGENT")).optional(),
});

export function ValidateUserRegister(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult {
  return UserRegisterSchema.validate(data);
}