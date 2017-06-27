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
} from 'antd';
import FormItemSelect from './formItem/formItemSelect'

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
    let formItems = []
    schema.forEach((field, index) => {
      let formItem

      switch(field.showType) {
        case 'select': {
          formItem = <FormItemSelect field={field} getFieldDecorator={getFieldDecorator} />
          break
        }

        default:
          break;
      }
      formItems.push(formItem)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let formRows = this.parse(this.props.schema)

    return (
      <div>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          {formRows}
        </Form>
      </div>
    );
  }
}

QueryForm.propTypes = {
  tableName: PropTypes.string,
  schema: PropTypes.object,
  form: PropTypes.object,
};
QueryForm.defaultProps = {};

export default Form.create()(QueryForm);
