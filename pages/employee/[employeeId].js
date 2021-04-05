import { 
    Form, 
    Select, 
    Input,
    Button, 
    DatePicker,
    Row,Col
  } from 'antd';
import {useRouter} from 'next/router';
import LayoutCustom from '../../components/layout';
import { updateEmployee, getEmployeeInformation } from '../../utilitieFunctions/employeeFetchingFunctions';
import moment from 'moment';
import {useState, useEffect} from 'react';

const { Option } = Select;

export async function getServerSideProps(context) {
    console.log('fetching..');
    try {
      const data = context.params.employeeId;
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
    const urlParamsEmployeeId = props.data;
    const [form] = Form.useForm();
    const [formData, setEmployeeInformation] = useState([]);
    

    async function handleGetEmployeeInformation(urlParamsEmployeeId) {
      const grailsResponse = await getEmployeeInformation(urlParamsEmployeeId);
      const data = await grailsResponse.json();
      if (data.status==200) {
        setEmployeeInformation(data.responseMessage);
      }
      else if (data.status==404) {
        setEmployeeInformation([]);
        router.push('/error');
      } else if (grailsResponse.status==401) {
        router.push('/');
      }
    }

    useEffect(()=> {
      handleGetEmployeeInformation(urlParamsEmployeeId);
    },[]);
    
    useEffect(() => {
      console.log('updating form..')
      if(formData.employeeInformation&&formData.allDepartments){
        form.setFieldsValue({
          employeeId: formData.employeeInformation.employeeid,
          firstName: formData.employeeInformation.firstname,
          lastName: formData.employeeInformation.lastname,
          afm: formData.employeeInformation.afm,
          departmentId: formData.employeeInformation.departmentid,
          dob : moment(formData.employeeInformation.dob, 'DD-MM-YYYY')
        });
      }      
     }, [formData])
    
    async function handleUpdateEmployee(values) {
      values.dob = values.dob._d;
      const grailsResponse = await updateEmployee(values);
      const data = await grailsResponse.json();
      if (data.status==200) {
        router.push('/departments/'+values.departmentId);
      } else if(data.status==400) {
        router.push('/error')
      }
    }
    
    return (
      <LayoutCustom>   
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <br/>
            <h1>Ενημέρωση υπαλλήλου</h1>
            <br/>
            </Col>
          <Col span={8}></Col>
        </Row>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <Form form = {form}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  onFinish={handleUpdateEmployee}
                  style= {
                    {height:"100vh"}
                  }                    
            >
              <Form.Item name="employeeId" label="Κωδικός" type="text"  rules={[{ required: true }]} >
                <Input  readOnly />
              </Form.Item>
              <Form.Item name="firstName" label="Όνομα" type="text" rules={[{ required: true }]} >
                <Input  maxLength="50"/>
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
                  {formData.allDepartments?.map((value) => (
                    <Option value={value.departmentid}>{value.departmentname}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }} >
                <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>
                    Ενημέρωση
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


  