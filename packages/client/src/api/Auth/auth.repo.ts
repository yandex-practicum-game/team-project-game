import axios from 'axios';
import apiConfig from '../config';

import {UserIdResponse, UserResponse} from '../User/user.type';
import {SigninRequest, SingupRequest} from './auth.type';

const instance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {'Content-Type': 'application/json'},
});

const Auth = {
  signin: (body: SigninRequest): Promise<string> => {
    return instance.post('/auth/signin', body);
  },
  signup: (body: SingupRequest): Promise<UserIdResponse> => {
    return instance.post('/auth/signup', body);
  },
  logout: (): Promise<void> => {
    return instance.post('/auth/logout');
  },
  user: (): Promise<UserResponse> => {
    return instance.get('/auth/user');
  },
};

export default Auth;
