import { Form,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Row,Col,
  notification
} from 'antd'
import jwt_decode from "jwt-decode";
import Link from 'next/link'
import React, { useState } from 'react';
import { verification, logout } from '../utilitieFunctions/authenticationFetchingFunctions'
import {useRouter} from 'next/router';
const { Header, Content, Footer } = Layout;
const content = {
  marginTop: '100px',
}

export default function login() {

  const router = useRouter();
  
  async function handleLogin (values) {
    const grailsResponse = await verification(values);
    const data = await grailsResponse.json();
    console.log(data);
    if (data.status==200) {
      router.push('/department/showDepartments')
    }else {
      openNotification()
    }
  }

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => {notification.close(key);}}>
        Κατάλαβα
      </Button>
    );
    notification.open({
      message: 'Λάθος στοιχεία',
      description:
        'Εισάγατε λάθος στοιχεία, παρακαλώ δοκιμάστε ξανά',
      btn,
      key,
      onClose: close,
    });
  };



  return (
    <Layout className="layout">

      <title>Postem</title>
    
    <Header>
      <div className="logo" />
      
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link href="/">
                <a> Σύνδεση </a>
          </Link>
        </Menu.Item>    
        <div style={{float:'right'}}>
          Δεν είστε συνδεδεμένος.
        </div>

      </Menu>
      
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Row>
          <Col span={8}></Col>
          <Col span={8}><br/></Col>
          <Col span={8}></Col>
        </Row>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
          <Form
            onFinish = {handleLogin}
          >
            <Form.Item
              name="username"
              label="username"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }} >
              <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>
                Σύνδεση
              </Button>
            </Form.Item>
          </Form>

        </Col>
        <Col span={8}></Col>
      </Row>

        <Row>
          <Col span={8}></Col>
          <Col span={8}></Col>
          <Col span={8}></Col>
        </Row>
      </Breadcrumb.Item>


      </Breadcrumb>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Postem ©2021</Footer>
  </Layout>
    
  )
}

