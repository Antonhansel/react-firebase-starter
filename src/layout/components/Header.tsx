import * as React from 'react';
import { Button, Dropdown, Menu, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';

import { Layout as AntdLayout } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import i18next from 'i18next';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const { Header: AntdHeader } = AntdLayout;

const SAntdHeader = styled(AntdHeader)`
  display: flex;
  justify-content: space-between;
  left: 0;
  position: absolute;
  right: 0;
  color: white;
  background-color: white;
  padding-left: 25px;
  padding-right: 25px;
  @supports (backdrop-filter: blur(2px)) {
    backdrop-filter: blur(2px);
  }
`;

const languages = [
  {
    label: 'English',
    id: 'en',
  },
  { label: 'Français', id: 'fr' },
];

function Header({
  isSiderClosed,
  setIsSiderClosed,
}: {
  isSiderClosed: boolean;
  setIsSiderClosed: (status: boolean) => void;
}) {
  const { t } = useTranslation(['layout']);
  const user = firebase.app().auth().currentUser as firebase.User;

  const history = useHistory();

  const currentLanguage = i18next.language;

  const languagesMenu = (
    <Menu key={'languagesMenu'}>
      {languages.map(({ label, id }) => (
        <Menu.Item
          key={id}
          onClick={() => {
            moment.locale(id);
            i18next.changeLanguage(id);
          }}
        >
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const currentLanguageLabel = languages.find(
    ({ id }) => id === currentLanguage
  )?.label;
  const menu = (
    <Menu key={'userMenu'}>
      <Menu.Item>
        <Typography.Title
          level={5}
          style={{ alignSelf: 'center', paddingTop: '3px' }}
        >
          {user?.email?.split('@')[0]}
        </Typography.Title>
      </Menu.Item>
      <Menu.Item>
        <Button
          type='ghost'
          onClick={() => {
            firebase.app().auth().signOut();
            history.push('/login');
          }}
        >
          {t('layout:disconnect')}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Dropdown overlay={languagesMenu}>
          <span style={{ fontSize: 15, color: 'black' }}>
            <Button>{currentLanguageLabel}</Button>
          </span>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );

  return (
    <SAntdHeader>
      <MenuOutlined
        style={{
          color: 'black',
          alignSelf: 'center',
          fontSize: 20,
        }}
        onClick={() => setIsSiderClosed(!isSiderClosed)}
      />
      <Row>
        <div style={{ paddingRight: '10px', paddingLeft: '10px' }}>
          <Dropdown overlay={menu}>
            <span>
              <Avatar size={32} icon={<UserOutlined />} />
            </span>
          </Dropdown>
        </div>
      </Row>
    </SAntdHeader>
  );
}

export default Header;
