import React, {useEffect} from 'react';
import s from './ExamplePage.module.scss';
import withApp, {Component} from '../../hocs/withApp';

// это просто пример, ничего логичного вы здесь не увидите
const ExamplePage: Component = ({async, actions, state, navigate, dispatch}) => {
  const {isLogin} = state.user;
  const {authUser} = async.user;
  const {setSound} = actions.game;

  // component did mount
  useEffect(() => {
    dispatch(authUser());
  }, []);

  // hooks
  useEffect(() => {
    if (isLogin) {
      dispatch(setSound('on'));
      navigate('game/start');
    }
  }, [isLogin]);

  // можно и так
  useEffect(() => {
    if (state.user.isLogin) {
      dispatch(setSound('on'));
      navigate('game/start');
    }
  }, [state.user.isLogin]);

  // functions
  function turnOffSound() {
    dispatch(setSound('off'));
  }

  function turnOnSound() {
    dispatch(setSound('on'));
  }

  return (
    <div className={s.container}>
      <span> ExamplePage </span>
      <button onClick={turnOffSound}>Turn off sound</button>
      <button onClick={turnOnSound}>Turn on sound</button>
    </div>
  );
};

export default withApp(ExamplePage);
