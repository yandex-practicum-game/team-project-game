import React from 'react';
import {withAuth, withApp, Component} from '../../../hocs';

const GamePage: Component = () => {
  return <div>GamePage</div>;
};

export default withAuth(withApp(GamePage));
