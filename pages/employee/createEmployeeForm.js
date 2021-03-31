import { 
    Form, 
    Select, 
    Input,
    Button, 
    DatePicker,
    Row,Col
  } from 'antd';
import {useRouter} from 'next/router';
import LayoutCustom from '../../components/layout'
import { createEmployee } from '../../utilitieFunctions/employeeFetchingFunctions'
import { getDepartments } from '../../utilitieFunctions/departmentFetchingFunctions'
import {useState, useEffect} from 'react'
const { Option } = Select;



  
export default function createEmployeeForm() {
    const router = useRouter();
    const [selectData, setSelectData] = useState([]);

  async function getAllDepartments () {
    const grailsResponse = await getDepartments();
    const data = await grailsResponse.json();
    console.log(data);
    if (data.status==200) {
      setSelectData(data.responseMessage);
    } else if (data.status==400) {
      setSelectData([]);
    }
  }

  useEffect(()=> {
    getAllDepartments();
    console.log(selectData);
  },[]);

    async function handleCreateEmployee(values) {
      values.dob = values.dob._d;
      const grailsResponse = await createEmployee(values);
      const data = await grailsResponse.json();
      if (data.status==200) {
        router.push('/employee/showEmployees/'+values.departmentId);
      }
    }
    

    return (
      <LayoutCustom>   
        
        <Row>
          <Col span={8}></Col>
          <Col span={8}><br/></Col>
          <Col span={8}></Col>
        </Row>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <Form labelCol={{ span: 8 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  onFinish={handleCreateEmployee}
            >
              <Form.Item name="firstName" label="Όνομα" type="text" rules={[{ required: true }]} >
                <Input maxLength="50" />
              </Form.Item>
              <Form.Item name="lastName" label="Επώνυμο" type="text" rules={[{ required: true }]}>
                <Input maxLength="50"/>
              </Form.Item>
              <Form.Item name="afm" label="ΑΦΜ" rules={[{ required: true }]}>
                <Input maxLength="9"/>
              </Form.Item>
              <Form.Item name="dob" label="Ημερομηνία γέννησης" rules={[{ required: true }]}>
                <DatePicker />
              </Form.Item>
              <Form.Item name="departmentId" label="Τμήμα"  rules={[{ required: true }]}>
                <Select>
                  {selectData.map((value) => (
                    <Option value={value.departmentid}>{value.departmentname}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }} >
                <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>
                    Δημιουργία
                </Button>
              </Form.Item> 
            </Form>

        </Col>
        <Col span={6}></Col>
      </Row>

        <Row>
          <Col span={8}></Col>
          <Col span={8}></Col>
          <Col span={8}></Col>
        </Row>
        
          
          
        
      
    </LayoutCustom>
    )
  }