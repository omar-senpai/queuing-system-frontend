export abstract class UrlEndpoints {
    static readonly API_ENDPOINT: string = 'http://localhost:8080/api/v1/';

    static readonly createUser: string = 'users';
    static readonly getUser: string = 'users/'; // + userId
    static readonly getUsers: string = 'users';
    static readonly updateUser: string = 'users/'; // + userId
    static readonly deleteUser: string = 'users/'; // + userId
    static readonly getUserByEmail: string = 'users/email/'; // + email
    static readonly getUserByUsername: string = 'users/username/'; // + username

    static readonly login: string = 'auth'; // POST
}