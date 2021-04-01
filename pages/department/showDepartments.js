import { 
  Button,
  Table,
  Space,
  notification
} from 'antd';
import LayoutCustom from '../../components/layout';
import { deleteDepartment, getDepartments } from '../../utilitieFunctions/departmentFetchingFunctions';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';


export default function showDepartments() {

  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  
  async function getAllDepartments () {
    const grailsResponse = await getDepartments();
    const data = await grailsResponse.json();
    if (data.status==200) {
      setTableData(data.responseMessage);
    } else if (data.status==400) {
      setTableData([]);
    }
  }
  
  useEffect(()=> {
    getAllDepartments();
    console.log(tableData);
  },[]);

  async function handleDeleteDepartment (departmentId) {
    const grailsResponse = await deleteDepartment(departmentId);
    const data = await grailsResponse.json();
    if (data.status==200) {
      getAllDepartments();
      router.push('/department/showDepartments');
    } else if (data.status==400) {
      openNotificationFailedDepartmentDelete();
    }
}

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
  const openNotificationDelete = (id) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => {notification.close(key);handleDeleteDepartment(id)}}>
        Διαγραφή
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

  const openNotificationFailedDepartmentDelete = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => {notification.close(key)}}>
        Κατάλαβα
      </Button>
    );
    notification.open({
      message: 'Πρόβλημα διαγραφής',
      description:
        'Η διαγραφή του τμήματος απέτυχε καθώς περιέχει ακόμα ενεργούς υπαλλήλους.',
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
          <Button size="small" type="primary" onClick={()=>openNotificationDelete(text.departmentid)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <LayoutCustom>
        <Table rowKey = "departmentid" columns={columns} dataSource={tableData} />
    </LayoutCustom>
  )
}

