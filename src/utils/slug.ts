import slugify from "slugify";

export const createSlug = (title: string) => {
  return slugify(title, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: false, 
    strict: false, 
    trim: true,
  });
};