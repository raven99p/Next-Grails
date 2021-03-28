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
import { updateEmployee } from '../../utilitieFunctions/employeeFetchingFunctions'
import moment from 'moment';

const { Option } = Select;

export async function getServerSideProps(context) {
    console.log('fetching..');
    try {
      const res = await fetch(`http://localhost:8080/employeeResponder/updateEmployeeForm/${context.params.employeeId}.json`, {method: 'GET'});
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
  
  export default function createEmployeeForm(props) {
    const router = useRouter();
    const data = props.data.responseMessage;
    console.log(data);

    async function handleUpdateEmployee(values) {
      values.dob = values.dob._d;
      console.log(values);
      const grailsResponse = await updateEmployee(values);
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
                  onFinish={handleUpdateEmployee}
                  initialValues={
                    { 
                    employeeId: data.employeeInformation.employeeid,
                    firstName: data.employeeInformation.firstname,
                    lastName: data.employeeInformation.lastname,
                    afm: data.employeeInformation.afm,
                    departmentId: data.employeeInformation.departmentid,
                    dob : moment(data.employeeInformation.dob, 'DD-MM-YYYY')
                    }
                }   
            >
              <Form.Item name="employeeId" label="Id" type="text" rules={[{ required: true }]} >
                <Input  readOnly/>
              </Form.Item>
              <Form.Item name="firstName" label="Όνομα" type="text" rules={[{ required: true }]} >
                <Input  />
              </Form.Item>
              <Form.Item name="lastName" label="Επώνυμο" type="text" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="afm" label="ΑΦΜ" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="dob" label="Ημερομηνία γέννησης" rules={[{ required: true }]}>
                <DatePicker />
              </Form.Item>
              <Form.Item name="departmentId" label="Τμήμα"  rules={[{ required: true }]}>
                <Select>
                  {data.allDepartments.map((value) => (
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