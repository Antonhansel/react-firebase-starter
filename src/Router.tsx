import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom';
import { Spin } from 'antd';
import NotFound from './layout/components/NotFound';

import AuthPageComponentWrapper from './pages/auth/authPageComponentWrapper';
import ResetPasswordPage from './pages/auth/resetPassword';
import Layout from './layout';
import Dashboard from './pages/dashboard';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import AuthWrapper, {
  nonSignedInAuthorizedRoutes,
} from './pages/auth/authWrapper';
import { LoadingOutlined } from '@ant-design/icons';

const ConnectedApp = () => {
  const history = useHistory();
  if (nonSignedInAuthorizedRoutes.includes(history.location.pathname)) {
    return <></>;
  }

  return (
    <Layout>
      <Route exact path='/'>
        <Dashboard />
      </Route>
    </Layout>
  );
};

export default function MainRouter() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // firebase.app().functions().useEmulator("localhost", 5001);
    // firebase.app().auth().useEmulator("http://localhost:9099");
    // firebase.app().firestore().useEmulator("localhost", 8080);
    firebase.analytics().setAnalyticsCollectionEnabled(true);
    firebase.auth().onAuthStateChanged(function () {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          flex: 1,
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin
          size='large'
          style={{ paddingTop: '50vh', paddingLeft: '50vw' }}
          indicator={<LoadingOutlined />}
        />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <AuthWrapper>
          <Route exact path='/login'>
            <AuthPageComponentWrapper type='login' />
          </Route>
          <Route exact path='/signup'>
            <AuthPageComponentWrapper type='signup' />
          </Route>
          <Route exact path='/reset-password'>
            <ResetPasswordPage />
          </Route>
          <ConnectedApp />
        </AuthWrapper>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
