import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, Menu, Row } from 'antd';

import { useTranslation } from 'react-i18next';
import logoOnly from './cube.png';
import logoAndtext from './cube.png';
import { LineChartOutlined } from '@ant-design/icons';

function Sider({ isSiderClosed }: { isSiderClosed: boolean }) {
  const { t } = useTranslation(['layout']);

  return (
    <>
      <Row
        style={{
          paddingBottom: '5px',
          paddingLeft: '20px',
          backgroundColor: 'white',
        }}
      >
        <Col span={22}>
          {isSiderClosed && (
            <img
              src={logoOnly}
              alt='Logo'
              style={{
                paddingTop: '5px',
                paddingRight: '8px',
                maxWidth: '100%',
              }}
            />
          )}
          {!isSiderClosed && (
            <img
              src={logoAndtext}
              alt='Logo'
              style={{
                paddingTop: '5px',
                maxWidth: '100%',
              }}
            />
          )}
        </Col>
      </Row>
      <Menu
        mode='inline'
        inlineCollapsed={isSiderClosed}
        theme={'light'}
        defaultSelectedKeys={['dashboard']}
      >
        <Menu.Item key='dashboard' icon={<LineChartOutlined />}>
          <Link to='/'>{t('layout:dashboard')}</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sider;
