import { Button, Layout, Menu, Breadcrumb, Table, Space, Alert, notification } from 'antd';
import {useRouter} from 'next/router';
import Link from 'next/link';
import LayoutCustom from '../../../components/layout'
import { deleteEmployee } from '../../../utilitieFunctions/employeeFetchingFunctions'

export async function getServerSideProps(context) {
  console.log('fetching..');
  console.log(context.params);
  try {
    const res = await fetch(`http://localhost:8080/employeeResponder/getEmployees/${context.params.departmentId}` + `.json`, {method: 'GET'});
    const data = await res.json();
    console.log(data);
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


export default function showEmployees(props) {
  const router = useRouter();
  const data = props.data.messageResponse;  
  console.log(data);
  const currentDepartment = data.departmentInformation;

  async function handleDeleteEmployee(id) {
    const grailsResponse = await deleteEmployee(id);
    const data = await grailsResponse.json();
    if (data.status==200) {
      router.push('/employee/showEmployees/'+currentDepartment.departmentid);
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
      <Button type="primary" size="small" onClick={() => {notification.close(key);handleDeleteEmployee(id)}}>
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
        dataIndex: 'employeeid',
        key: 'employeeid',
        render: text => <a>{text}</a>,
      },
      {
        title: 'First name',
        dataIndex: 'firstname',
        key: 'firstname',
      },
      {
        title: 'Last name',
        dataIndex: 'lastname',
        key: 'lastname',
      },
      {
        title: 'AFM',
        dataIndex: 'afm',
        key: 'afm',
        render: text => <a>{text.toString()}</a>,
      },
      {
        title: 'Date of birth',
        dataIndex: 'dob',
        key: 'dob',
      },
      {
        title: 'Deaprtment Name',
        dataIndex: 'departmentid',
        key: 'departmentid',
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button size="small" type="primary" onClick={()=>router.push('/employee/' + text.employeeid)}>
              Edit
            </Button>
            <Button size="small" type="primary" onClick={()=>openNotification(text.employeeid)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ];



  return (
    <LayoutCustom>
        <Table rowKey = "employeeid" columns={columns} dataSource={data.allEmployeesofDepartment} /> 
    </LayoutCustom>
    
  )
}

