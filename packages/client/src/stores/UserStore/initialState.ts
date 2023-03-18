import UserState from './interfaces';

const initialState: UserState = {
  user: null,
  isLogin: false,
  searchedUsers: [],
  status: 'idle',
};

export default initialState;
