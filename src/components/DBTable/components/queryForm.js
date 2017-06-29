/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Icon,
  Radio,
  InputNumber,
  Checkbox,
  Cascader,
  Button,
} from 'antd';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class QueryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  /**
   * 将schema解析为对应的antd组件
   * @param schema
   */
  parse(schema) {
    const { getFieldDecorator } = this.props.form
    const formItems = []
    schema.forEach((field, index) => {
      let formItem

      switch (field.showType) {
        case 'input':
        case 'cascader':
        case 'between':
        case 'datePicker':
        case 'inputNumber':
        case 'select':
        case 'radio':
        case 'checkbox': {
          let fieldShowType = capitalizeFirstLetter(field.showType)
          let FormItemComponent = require(`./formItem/form${fieldShowType}`).default
          // console.log(FormItemComponent)
          formItem = <FormItemComponent key={field.key}
                                        field={field}
                                        getFieldDecorator={getFieldDecorator} />
          break
        }

        default:
          break
      }
      formItems.push(formItem)
    })
    return formItems
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);

        // console.log(this.props.form.getFieldsValue())
        // this.props.handleSubmit()
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let formRows = this.parse(this.props.schema)

    return (
        <Form layout='horizontal' onSubmit={this.handleSubmit}>
          {formRows}
          <Button type="primary" htmlType="submit"><Icon type="search"/>查询</Button>
        </Form>
    );
  }
}

QueryForm.propTypes = {
  tableName: PropTypes.string,
  schema: PropTypes.array,
  form: PropTypes.object,
};
QueryForm.defaultProps = {};

export default Form.create()(QueryForm);
