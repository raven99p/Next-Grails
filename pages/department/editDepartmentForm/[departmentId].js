import { 
    Form, 
    Input,
    Button, 
    Row,Col
  } from 'antd';
import LayoutCustom from '../../../components/layout'
import {useRouter} from 'next/router'
import { updateDepartment, getDepartmentInformation } from '../../../utilitieFunctions/departmentFetchingFunctions'
import { useState, useEffect} from 'react'

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


export default function editDepartmentForm(props) {
    const router = useRouter();
    const urlParamsDepartmentId = props.data;
    const [form] = Form.useForm();
    const [formData, setDepartmentInformation] = useState([]);

    async function handleGetDepartmentInformation(urlParamsDepartmentId) {
      const grailsResponse = await getDepartmentInformation(urlParamsDepartmentId);
      const data = await grailsResponse.json();
      if (data.status==200) {
        setDepartmentInformation(data.responseMessage);
      }
    }

    useEffect(()=> {
      handleGetDepartmentInformation(urlParamsDepartmentId);
    },[]);
    
    useEffect(() => {
      console.log('updating form')
      form.setFieldsValue({
        departmentId: formData.departmentid,
        departmentName: formData.departmentname
      });
     }, [formData])
    
    


    async function handleEditDepartment (values) {
        const grailsResponse = await updateDepartment(values);
        const data = await grailsResponse.json();
        if (data.status==200) {
          router.push('/department/showDepartments');
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
                    <Form   form={form}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            onFinish={handleEditDepartment}                    
                    >
                        <Form.Item name="departmentId" label="departmentId" rules={[{ required: true }]} readOnly>
                            <Input name = "departmentId" id="departmentId" value={formData.departmentid}readOnly />
                        </Form.Item>

                        <Form.Item name="departmentName" label="departmentName" rules={[{ required: true }]}>
                            <Input name = "departmentName" id="departmentName" />
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