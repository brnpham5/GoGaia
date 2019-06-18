import { Forum } from './forum';

export class Category {
    id: number;
    key: string;
    name: string;
    forums: Array<Forum>;
}
