import { Lang } from './lang.enum';

export type Dictionary = {
  [key in Lang]?: {
    translation: {
      [key: string]: string;
    };
  };
};
