import * as React from 'react';
import Header from './components/Header';

import { Layout as AntdLayout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from './components/Sider';
const { Sider: AntdSider, Header: AntdHeader } = AntdLayout;

interface Props {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: Props) {
  const [isSiderClosed, setIsSiderClosed] = React.useState(true);
  const [isMobileDevice, setIsMobileDevice] = React.useState(true);

  return (
    <AntdLayout style={{ height: '100%', backgroundColor: '#f7f7fc' }}>
      <AntdSider
        breakpoint={'md'}
        collapsed={isSiderClosed}
        theme={'light'}
        collapsedWidth={isMobileDevice ? 1 : 80}
        onBreakpoint={(broken) => {
          setIsMobileDevice(broken);
        }}
      >
        <Sider isSiderClosed={isSiderClosed} />
      </AntdSider>
      <AntdLayout style={{ position: 'relative', backgroundColor: '#FFF' }}>
        <AntdHeader>
          <Header
            isSiderClosed={isSiderClosed}
            setIsSiderClosed={setIsSiderClosed}
          />
        </AntdHeader>
        <Content
          style={{
            padding: isMobileDevice ? '5px' : '25px',
            paddingTop: '15px',
            backgroundColor: '#f7f7fc',
          }}
        >
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
}

export default Layout;
