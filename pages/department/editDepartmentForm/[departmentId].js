import { 
    Form, 
    Input,
    Button, 
    Row,Col
  } from 'antd';
import LayoutCustom from '../../../components/layout'
import {useRouter} from 'next/router'
import { updateDepartment } from '../../../utilitieFunctions/departmentFetchingFunctions'


export async function getServerSideProps(context) {
    console.log('fetching..');
    console.log(context.params);
    try {
      const res = await fetch(`http://localhost:8080/departmentResponder/updateDepartmentForm/${context.params.departmentId}` + `.json`, {method: 'GET'});
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


export default function editDepartmentForm(props) {

    const router = useRouter();
    const data = props.data.responseMessage;

    async function handleEditDepartment (values) {
        console.log(values);
        const grailsResponse = await updateDepartment(values);
        const data = await grailsResponse.json();
        console.log(data);
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
                    <Form labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            onFinish={handleEditDepartment}   
                            initialValues={
                              { 
                              departmentId: data.departmentid,
                              departmentName: data.departmentname
                              }
                          }                        
                    >
                        <Form.Item name="departmentId" label="departmentId" rules={[{ required: true }]} readOnly>
                            <Input name = "departmentId" id="departmentId" readOnly />
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