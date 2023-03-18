import {UserResponse} from './../../api/User/user.type';

export default interface UserState {
  status: 'idle' | 'loading' | 'failed';
  isLogin: boolean;
  user: UserResponse | null;
  searchedUsers: UserResponse[];
}
