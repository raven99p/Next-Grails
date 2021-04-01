import { Layout, Menu, Breadcrumb, Button} from 'antd';
import Link from 'next/link';
import { getSessionVariable, logout} from '../utilitieFunctions/authenticationFetchingFunctions';
const { Header, Content, Footer } = Layout;
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

export default function LayoutCustom({ children}) {
  const router = useRouter();
  const [session, setSession] = useState('');
  async function handleLogout() {
    const grailsResponse = await logout();
    const data = await grailsResponse.json();
    if (data.status==200) {
      setSession('');
      router.push('/');
    } else if (data.status==400) {
      return [];
    }
  }  

  async function Session() {
    const grailsResponse = await getSessionVariable();
    const data = await grailsResponse.json();
    setSession(data.sessionVariable);
  }

  useEffect(()=> {
    Session();
  },[]);


  return (
    <Layout className="layout">

      <title>Postem</title>
    
    <Header>
      <div className="logo" />
      
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link href="/department/showDepartments">
                <a> Postem </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/employee/createEmployeeForm">
                <a> Δημιουργία υπαλλήλου </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/department/createDepartmentForm">
                <a> Δημιουργία τμήματος </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4" style={{float: 'right'}}>
          <a> Συνδεδεμένος ως  {session}</a>
        </Menu.Item>
        <Menu.Item key="5" style={{float: 'right'}}>
          <Button type="link" onClick={handleLogout}>Αποσύνδεση </Button>          
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
    <Footer style={{ textAlign: 'center',position:'absolute',bottom:"0",width:"100%"}}>Postem ©2021</Footer>
  </Layout>
  )
}
