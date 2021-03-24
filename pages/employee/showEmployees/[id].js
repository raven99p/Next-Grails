import { Form,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Row,Col,
  Table,
  Space,
  notification
} from 'antd'
import Link from 'next/link'
import LayoutCustom from '../../components/layout'

import {useRouter} from 'next/router';
const content = {
  marginTop: '100px',
}

export async function getServerSideProps(context) {
  console.log('fetching..');
  try {
    const res = await fetch(`http://localhost:8080/employeeResponder/getEmployees/${context.params.id}.json`, {method: 'GET'});
    const data = await res.json();
    if(!data)
    return {
      notFound: true,
    }
    return {
      props:{
        data,
      },
    }}catch(e) {
        console.log(e);
        const error = true
        return {
          props:{
            error,
          },
        }
      }  
}


export default function showDepartments(props) {
  
  const router = useRouter();
  const data = props.data;

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
  const openNotification = (id) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => {notification.close(key);deleteEmp(id)}}>
        Delete
      </Button>
    );
    notification.open({
      message: 'Confirm deletion',
      description:
        'Press delete if you wish to delete this employee ',
      btn,
      key,
      onClose: close,
    });
  };

  const columns = [ 
    {
      title: 'Id',
      dataIndex: 'departmentid',
      key: 'departmentid',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'departmentname',
      key: 'departmentname',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={()=>router.push('/employee/showEmployees' + text.departmentid)}>
            view
          </Button>
          <Button size="small" type="primary" onClick={()=>router.push('/employees/' + text.departmentid)}>
            Edit
          </Button>
          <Button size="small" type="primary" onClick={()=>openNotification(text.departmentid)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];



  return (
    <LayoutCustom>
        <Table columns={columns} dataSource={data} />
    </LayoutCustom>
    
  )
}

