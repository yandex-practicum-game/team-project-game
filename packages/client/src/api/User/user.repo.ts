import axios from 'axios';
import apiConfig from '../config';

import {UserResponse, SearchUserRequest} from './user.type';
import {UpdatePasswordRequest, UpdateProfileRequest} from './user.type';

const instance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {'Content-Type': 'application/json'},
});

const User = {
  updateProfile: (body: UpdateProfileRequest): Promise<string> => {
    return instance.put('/user/profile', body);
  },
  updatePassword: (body: UpdatePasswordRequest): Promise<string> => {
    return instance.put('/user/password', body);
  },
  updatePhoto: (body: FormData): Promise<UserResponse> => {
    return instance.put('/user/profile/avatar', body, {headers: {}});
  },
  searchUsers: (body: SearchUserRequest): Promise<UserResponse[]> => {
    return instance.post('/user/search', body);
  },
};

export default User;
