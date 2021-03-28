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


const { Option } = Select;

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
  
  export default function createEmployeeForm(props) {
    const router = useRouter();
    const data = props.data.responseMessage;

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
                  {data.map((value) => (
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