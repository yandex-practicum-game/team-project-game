import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {authUser} from '../stores/UserStore/userStore';

const withAuth = (Component: React.FC) => (props: Record<string, unknown>) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {status} = useAppSelector((state) => state.user);

  // did mount
  useEffect(() => {
    dispatch(authUser());
  }, []);

  // hook
  useEffect(() => {
    if (status === 'failed') navigate('/login');
  }, [status]);

  return status === 'loading' ? <div>Loading...</div> : <Component {...props} />;
};

export default withAuth;
