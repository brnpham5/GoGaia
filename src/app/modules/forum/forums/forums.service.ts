import { Injectable } from '@angular/core';
import {
    Headers,
    Http,
    Response,
    RequestOptions,
    URLSearchParams
} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../../environments/environment';

import { Category } from './classes/category';
import { Forum } from './classes/forum';
import { Stats } from './classes/stats';
import { Topic } from './classes/topic';
import { Post } from './classes/post';

@Injectable()
export class ForumsService {

    private static API_PATH: string = '/api/forums';

    private headers: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    constructor(private http: Http) {}

    getCategories(): Promise<Category[]> {
        const url = this.getUrl(ForumsService.API_PATH);
        return this.http.get(url)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data as Category[])
            .catch(this.handleError);
    }

    getCategory(categoryId: number): Promise<Category> {
        const url = this.getUrl(ForumsService.API_PATH);
        return this.http.get(`${url}/category?id=${categoryId}`)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data as Category)
            .catch(this.handleError);
    }

    getForum(forumId: number): Promise<Forum> {
        const url = this.getUrl(ForumsService.API_PATH);
        return this.http.get(`${url}/forum?id=${forumId}`)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data as Forum)
            .catch(this.handleError);
    }

    getTopic(topicId: number): Promise<Topic> {
        const url = this.getUrl(ForumsService.API_PATH);
        return this.http.get(`${url}/topic?id=${topicId}`)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data as Topic)
            .catch(this.handleError);
    }

    getPost(postId: string): Promise<Post> {
        const url = this.getUrl(ForumsService.API_PATH);
        return this.http.get(`${url}/post?id=${postId}`)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data as Post)
            .catch(this.handleError);
    }

    getPosts(topicId: number, page: number, pageInfo: boolean = false): Promise<any> {
        const url = this.getUrl(ForumsService.API_PATH);
        const info = +pageInfo;
        return this.http.get(`${url}/posts?id=${topicId}&page=${page}&page_info=${info}`)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data)
            .catch(this.handleError);
    }

    getStats(): Promise<Stats> {
        const url = this.getUrl(ForumsService.API_PATH);
        return this.http.get(`${url}/stats`)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data as Stats)
            .catch(this.handleError);
    }

    getTopics(forumId: number, page: number, pageInfo: boolean = false, type: number = 0): Promise<any> {
        const url = this.getUrl(ForumsService.API_PATH);
        const info = +pageInfo;
        return this.http.get(`${url}/topics?id=${forumId}&page=${page}&page_info=${info}&type=${type}`)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data)
            .catch(this.handleError);
    }

    getCaptcha(): Promise<any> {
        const url = this.getUrl(ForumsService.API_PATH);
        return this.http.get(`${url}/captcha`)
            .toPromise()
            .then(this.parseResponse)
            .then(data => data)
            .catch(this.handleError);
    }

    newTopic(params: any): Promise<any> {
        const url = this.getUrl(ForumsService.API_PATH),
            options = new RequestOptions({'headers': this.headers});

        return this.getNonce().then(data => {
            params.nonce = data.nonce;
            let body = this.urlencode(params);
            return this.http.post(`${url}/newtopic`, body, options)
                .toPromise()
                .then(this.parseResponse)
                .then(data => data)
                .catch(this.handleError);
            });
    }

    newReply(params: any): Promise<any> {
        const url = this.getUrl(ForumsService.API_PATH),
            options = new RequestOptions({'headers': this.headers});

        return this.getNonce().then(data => {
            params.nonce = data.nonce;
            let body = this.urlencode(params);
            return this.http.post(`${url}/newentry`, body, options)
                .toPromise()
                .then(this.parseResponse)
                .then(data => data)
                .catch(this.handleError);
            });
    }

    likeTopic(topicId: number): Promise<any> {
        const url = this.getUrl(`/forum/like/updatecount/${topicId}/like?_view=json`),
            options = new RequestOptions({'headers': this.headers});

        return this.http.post(url, '', options)
            .toPromise()
            .then(this.parseResponse)
            .catch(this.handleError);
    }

    subscribeTopic(topicId: number, status: boolean): Promise<any> {
        const url = this.getUrl(ForumsService.API_PATH),
        options = new RequestOptions({'headers': this.headers});

        return this.getNonce().then(data => {
            let params = {
                'nonce': data.nonce,
                'status': status
            };
            let body = this.urlencode(params);
            return this.http.post(`${url}/subscribe`, body, options)
                .toPromise()
                .then(this.parseResponse)
                .then(data => data)
                .catch(this.handleError);
            });
    }

    private getNonce(): Promise<any> {
        const url = this.getUrl(ForumsService.API_PATH);
        return this.http.get(`${url}/nonce`)
            .toPromise()
            .then(this.parseResponse)
            .catch(this.handleError);
    }

    private urlencode(data: any): string {
        const keys = Object.keys(data);
        let searchParams = new URLSearchParams();

        for (let key of keys) {
            searchParams.append(key, data[key]);
        }

        return searchParams.toString();
    }

    private parseResponse(response: Response): Promise<any> {
        const data = response.json().data;
        if (data.error) {
            return Promise.reject(data.error);
        }
        return Promise.resolve(data);
    }

    private handleError(error: any): Promise<any> {
        console.error('API request error', error);
        return Promise.reject(error.message || error);
    }

    private getUrl(path: string): string {
        return `${environment.apiUrl}${path}`;
    }
}
