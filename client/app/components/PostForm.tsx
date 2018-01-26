import * as React from "react"
import {Form, Input, Button} from 'antd'
import {FormComponentProps} from "antd/lib/form/Form";
const FormItem = Form.Item

import {robins} from '../robin'

const {posts, postsCol} = robins

export const PostForm = Form.create()(class PostForm extends React.Component<FormComponentProps>{

    render(){
        const { getFieldDecorator } = this.props.form
        
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          }

        return <Form onSubmit={ evt => {
            evt.preventDefault();

            postsCol.create(this.props.form.getFieldsValue())
        }}>
            <FormItem {...formItemLayout} label="Author">
            {getFieldDecorator('author')(<Input type="text"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="Title">
            {getFieldDecorator('title')(<Input type="text"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="Text">
            {getFieldDecorator('text')(<Input type="text"/>)}
            </FormItem>
            <div style={{textAlign : "center", padding  :'2rem'}}>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </div>
        </Form>
    }
})