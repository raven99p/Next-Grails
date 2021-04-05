import { Button, Table, Space, notification } from 'antd';
import {useRouter} from 'next/router';
import LayoutCustom from '../../components/layout';
import { deleteEmployee, getEmployees } from '../../utilitieFunctions/employeeFetchingFunctions';
import {useState, useEffect} from 'react';
export async function getServerSideProps(context) {
  try {
    const data = context.params.departmentId;
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
  const urlParamsDepartmentId = props.data;  
  const [tableData, setTableData] = useState([]);


  async function GetAllEmployees(urlParamsDepartmentId) {
    const grailsResponse = await getEmployees(urlParamsDepartmentId);
      const data = await grailsResponse.json();
      if (data.status==200) {
        setTableData(data.responseMessage);
      } else if (grailsResponse.status==401) {
        router.push('/');
      } else if (data.status==404) {
        router.push('/error');
      }
  }
  
  useEffect(()=> {
    GetAllEmployees(urlParamsDepartmentId);
  },[]);

  useEffect(()=> {
  },[tableData]);

  async function handleDeleteEmployee(id) {
    const grailsResponse = await deleteEmployee(id);
    const data = await grailsResponse.json();
    if (data.status==200) {
      GetAllEmployees(urlParamsDepartmentId);
    } else if (data.status==400){
      router.push('/error');
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
        title: 'Κωδικός',
        dataIndex: 'employeeid',
        key: 'employeeid',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Όνομα',
        dataIndex: 'firstname',
        key: 'firstname',
      },
      {
        title: 'Επώνυμο',
        dataIndex: 'lastname',
        key: 'lastname',
      },
      {
        title: 'ΑΦΜ',
        dataIndex: 'afm',
        key: 'afm',
        render: text => <a>{text.toString()}</a>,
      },
      {
        title: 'Ημερομηνία γέννησης',
        dataIndex: 'dob',
        key: 'dob',
      },
      {
        title: 'Όνομα Τμήματος',
        dataIndex: 'departmentid',
        key: 'departmentid',
      },
      {
        title: 'Επιλογές',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button size="small" type="primary" onClick={()=>router.push('/employee/' + text.employeeid)}>
              Επεξεργασία
            </Button>
            <Button size="small" type="primary" onClick={()=>openNotification(text.employeeid)}>
              Διαγραφή
            </Button>
          </Space>
        ),
      },
    ];



  return (
    <LayoutCustom>
        <Table rowKey = "employeeid" columns={columns} dataSource={tableData.allEmployeesofDepartment} /> 
    </LayoutCustom>
  )
}

