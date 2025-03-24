import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('Field is required').email({ message: 'Must be a valid email' }),
    password: zod
      .string()
      .nonempty('The Password field is required')
      .min(6, { message: 'Password must be longer than 6 characters' }),
  }),
);
