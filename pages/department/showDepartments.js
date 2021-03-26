import { 
  Button,
  Table,
  Space,
  notification
} from 'antd'

import LayoutCustom from '../../components/layout'
import { deleteDepartment } from '../../utilitieFunctions/departmentFetchingFunctions'
import {useRouter} from 'next/router';
const content = {
  marginTop: '100px',
}

export async function getServerSideProps() {
  console.log('fetching..');
  try {
    const res = await fetch(`http://localhost:8080/departmentResponder/getDepartments.json`, {method: 'GET'});
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
  const data = props.data.responseMessage;


  async function handleDeleteDepartment (departmentId) {
    console.log(departmentId);
    const grailsResponse = await deleteDepartment(departmentId);
    const data = await grailsResponse.json();
    console.log(data);
    if (data.status==200) {
      router.push('/department/showDepartments');
    }
}

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
  const openNotification = (id) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => {notification.close(key);handleDeleteDepartment(id)}}>
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
          <Button size="small" type="primary" onClick={()=>router.push('/employee/showEmployees/' + text.departmentid)}>
            view
          </Button>
          <Button size="small" type="primary" onClick={()=>router.push('/department/editDepartmentForm/' + text.departmentid)}>
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
        <Table rowKey = "departmentid" columns={columns} dataSource={data} />
    </LayoutCustom>
    
  )
}

