import { EContentType } from '@/constants';

export type ContentType = Exclude<EContentType, EContentType.TIME>;
