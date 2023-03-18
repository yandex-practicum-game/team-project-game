import React from 'react';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {useLocation, useNavigate, useParams, Params, Location} from 'react-router-dom';
import {actions, async, RootState} from '../stores';
import {Action, AsyncThunkAction, Dispatch} from '@reduxjs/toolkit';
import {NavigateFunction} from 'react-router';

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export type Component = React.FC<{
  dispatch(actions: Action | AsyncThunkAction<unknown, unknown, AsyncThunkConfig>): typeof useAppDispatch;
  navigate: NavigateFunction;
  state: RootState;
  actions: typeof actions;
  async: typeof async;
  params: Readonly<Params<string>>;
  location: Location;
  children: React.ReactNode;
}>;

const withApp = (Component: Component) => (props: Record<string, unknown>) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const state = useAppSelector((state) => state);
  const params = useParams();
  const location = useLocation();

  return (
    <Component
      dispatch={dispatch}
      state={state}
      actions={actions}
      navigate={navigate}
      params={params}
      async={async}
      location={location}
      children={props.children as React.ReactNode}
      {...props}
    />
  );
};

export default withApp;
