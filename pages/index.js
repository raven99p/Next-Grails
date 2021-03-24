import { Form,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Row,Col
} from 'antd'
import Link from 'next/link'
import React, { useState } from 'react';
import { verification, logout } from '../utilitieFunctions/authenticationFetchingFunctions'
import {useRouter} from 'next/router';
const { Header, Content, Footer } = Layout;
const content = {
  marginTop: '100px',
}

/*async function getServerSideProps() { 
  console.log('fetching..');
  try {
    const res = await fetch(`http://localhost:8080/authenticationResponder/verify.json`, {method: 'POST'});
    const data = await res.json();
    if(!data)
    return {
      responde: res,
    }
    return {
      props:{
        data,
      },
    }}catch(e) {
        console.log(e)
      }
}*/

export default function login() {


  const router = useRouter();
  async function handleRegister (values) {
    const grailsResponse = await verification(values);
    const data = await grailsResponse.json();
    console.log('this is the data in page')
    console.log(data);
    if (data.status=200) {
      router.push('/department/showDepartments')
    }else {
      //message user not found
    }
    
    
    console.log(values);
  }

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
            onFinish = {handleRegister}
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

