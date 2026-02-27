import { ZodType } from "zod";
import { Rule } from "antd/es/form";

export const createZodSync = (schema: ZodType): Rule => {
  return {
    async validator(rule: any, value: any) {
      const field = rule.field;
      const result = await schema.safeParseAsync({ [field]: value });
      if (!result.success) {
        const error = result.error.issues.find((issue) => issue.path[0] === field);
        if (error) {
          throw new Error(error.message);
        }
      }
    },
  };
};
