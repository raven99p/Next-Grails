import { Layout, Menu, Breadcrumb} from 'antd';
import Link from 'next/link'

const { Header, Content, Footer } = Layout;

export default function LayoutCustom({ children}) {
  return (
    <Layout className="layout">

      <title>Postem</title>
    
    <Header>
      <div className="logo" />
      
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link href="/">
                <a> Postem </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/">
                <a> Δημιουργία υπαλλήλου </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/">
                <a> Δημιουργία τμήματος </a>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          {children}
        </Breadcrumb.Item> 
      </Breadcrumb>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  )
}
