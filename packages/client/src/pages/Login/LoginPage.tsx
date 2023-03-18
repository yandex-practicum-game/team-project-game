import React, {useEffect} from 'react';
import {Component, withApp} from '../../hocs';
import {useWindowSize} from '../../hooks';

const LoginPage: Component = () => {
  const {width} = useWindowSize();

  useEffect(() => {
    console.log('width:', width);
  }, [width]);

  return <div>LoginPage</div>;
};

export default withApp(LoginPage);
