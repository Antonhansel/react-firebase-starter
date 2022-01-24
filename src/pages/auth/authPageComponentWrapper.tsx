import React from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Typography,
  Row,
  Divider,
  Col,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/app';
import { useHistory } from 'react-router';
import logo from '../../layout/components/cube.png';
import googleLogo from './google-logo.png';
import { Link } from 'react-router-dom';
import { getUser } from '../../helpers/helpers';
import { gitinfo } from '../../_git_commit';

const createUserData = async (res: firebase.auth.UserCredential) => {
  if (!res.additionalUserInfo?.isNewUser) {
    await firebase.analytics().logEvent('login');
    return;
  }
  const user = getUser();
  if (!user) {
    throw new Error('User not found');
  }

  await firebase.firestore().collection('users').doc(user.uid).set({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lastDashboardUpdate: firebase.firestore.FieldValue.serverTimestamp(),
  });
  await firebase.analytics().logEvent('sign_up');
  await firebase.analytics().logEvent('CompleteRegistration');
};

const AuthPageComponentWrapper = ({ type }: { type: 'signup' | 'login' }) => {
  const { t } = useTranslation(['auth']);
  const history = useHistory();

  const onFinishSignup = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const res = await firebase
        .app()
        .auth()
        .createUserWithEmailAndPassword(username, password);
      await createUserData(res);
    } catch (e) {
      console.log('error signup', e);
      notification.error({
        message: t('auth:error'),
        // @ts-ignore
        description: e.message,
      });
      return;
    }
    history.push('/');
  };

  const onGoogleAuth = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      const res = await firebase.auth().signInWithPopup(provider);
      await createUserData(res);
    } catch (e) {
      notification.open({
        message: t('auth:anErrorOccured'),
        // @ts-ignore
        description: e.message,
      });
    }
  };

  const onFinishLogin = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      await firebase
        .app()
        .auth()
        .signInWithEmailAndPassword(username, password);
    } catch (e) {
      notification.error({
        message: t('auth:error'),
        // @ts-ignore
        description: e.message,
      });
      return;
    }
    await firebase.analytics().logEvent('login');
    history.push('/');
  };

  const loginWithGoogleText = t('auth:Google');
  const signupWithGoogleText = t('auth:Google');

  return (
    <Row
      style={{
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Col xs={{ span: 24, offset: 2 }} lg={{ span: 10, offset: 2 }}>
        <Form
          name='normal_login'
          initialValues={{ remember: true }}
          onFinish={type === 'login' ? onFinishLogin : onFinishSignup}
          style={{
            width: '80%',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={logo}
              alt='Logo'
              style={{
                maxWidth: '12%',
                paddingBottom: '10px',
              }}
            />
          </div>
          <Typography.Title>
            {type === 'signup' ? 'Signup' : 'Login'}
          </Typography.Title>
          <Button
            type='default'
            style={{ width: '100%' }}
            onClick={onGoogleAuth}
          >
            <img
              src={googleLogo}
              style={{ width: 20, height: 20, marginRight: 5 }}
              alt='google-logo'
            />
            {type === 'signup' ? signupWithGoogleText : loginWithGoogleText}
          </Button>
          <Divider></Divider>
          <Form.Item
            name='username'
            rules={[{ required: true, message: t('auth:inputUsernameAdvice') }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder={t('auth:inputUsernamePlaceholder')}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: t('auth:inputPasswordAdvice') }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder={t('auth:inputPasswordPlaceholder')}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
              {type === 'signup' ? t('auth:signup') : t('auth:login')}
            </Button>{' '}
          </Form.Item>
          {type === 'signup'
            ? t('auth:alreadyHaveAnAccount')
            : t('auth:noAccountYet')}{' '}
          {type === 'signup' ? (
            <Link to='/login'>{t('auth:login')}</Link>
          ) : (
            <Link to='/signup'>{t('auth:signup')}</Link>
          )}
          <div>
            {type === 'login' && t('auth:lostPassword')}{' '}
            {type === 'login' && (
              <Link to='/reset-password'>{t('auth:resetPassword')}</Link>
            )}
          </div>
          <div>
            <Typography.Text style={{ color: 'gray' }}>{`v.${
              gitinfo.logMessage.split(' ')[0]
            }`}</Typography.Text>
          </div>
        </Form>
        {/* <div
          style={{ height: 100, width: 100, backgroundColor: "red" }}
          id="sign-in-button"
          // @ts-ignore
          ref={captchaRef}
        ></div> */}
      </Col>
      <Col
        xs={0}
        lg={12}
        style={{
          background: 'linear-gradient(to bottom, #005AA7, #FFFDE4)',
          height: '100vh',
        }}
      ></Col>
    </Row>
  );
};

export default AuthPageComponentWrapper;
