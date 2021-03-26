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



  
  
  export default function Hire(props) {
    const router = useRouter();
      
      
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
            >
              <Form.Item label="Όνομα">
                <Input />
              </Form.Item>
              <Form.Item label="Επώνυμο">
                <Input />
              </Form.Item>
              <Form.Item label="ΑΦΜ">
                <Input />
              </Form.Item>
              
              <Form.Item label="Ημερομηνία γέννησης">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Τμήμα">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button size="large" type="primary">
                  Hire
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