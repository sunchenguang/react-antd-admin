/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { Form, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class FormItemSelect extends Component {

  render() {
    const { field, getFieldDecorator  } = this.props
    const { title, options, defaultValue, key } = field

    return (
      <FormItem label={title}>
        {
          getFieldDecorator(key, {

          })(
            <Select placeholder="Please select a country">
              {
                options.map((option, index) => {
                  <Option value={option.key}>{option.value}</Option>
                })
              }
              <Option value="china">China</Option>
              <Option value="use">U.S.A</Option>
            </Select>
          )
        }
      </FormItem>
    );
  }
}

FormItemSelect.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormItemSelect.defaultProps = {};

export default FormItemSelect;
