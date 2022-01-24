import React from 'react';
import { Form, Input, Button, notification, Typography, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/app';
import { useHistory } from 'react-router';
import logo from '../../layout/components/cube.png';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { t } = useTranslation(['auth']);
  const history = useHistory();

  const onFinishResetPassword = async ({ email }: { email: string }) => {
    await firebase.app().auth().sendPasswordResetEmail(email);
    notification.open({
      message: t('auth:passwordResetNotificationTitleSuccess'),
      description: t('auth:passwordResetNotificationDescriptionSuccess'),
    });
    history.push('/');
  };

  return (
    <Row
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Col xs={{ span: 18 }} lg={{ span: 12 }}>
        <Form
          name='reset-password'
          initialValues={{ remember: true }}
          onFinish={onFinishResetPassword}
          style={{
            width: '100%',
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
                maxWidth: '10%',
              }}
            />
          </div>
          <Typography.Title>{t('auth:title')}</Typography.Title>
          <Form.Item
            name='email'
            rules={[{ required: true, message: t('auth:email') }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder={t('auth:emailPlaceHolder')}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
              {t('auth:resetPasswordSubmit')}
            </Button>
          </Form.Item>
        </Form>
        <Link to='/login'>{t('auth:backToLogin')}</Link>
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;
