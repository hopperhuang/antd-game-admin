import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Menu, Dropdown, Icon, Form, Input, Button, Radio, Spin } from 'antd';
import { connect } from 'react-redux';
import MakeTable from '../../utils/TableMaker';
import AsyncAction from '../../utils/asyncAction';


const { TabPane } = Tabs;
const RadioGroup = Radio.Group;

// RoleMangementTable
class RoleMangementTable extends React.Component {
  componentDidMount() {
    const gameTypeAsyncAction = new AsyncAction('api/rbac.json', 'get', 'RbacListReducer', 'rbacList', 'rbacList');
    const { dispatch } = this.props;
    dispatch(gameTypeAsyncAction.fetchDataIfNeed());
  }
  render() {
    const status = this.props.rbacList.status;
    if (status === 'WAIT_FOR_FETCHING') {
      return (
        <div className="gamerbacListLoading">
          <Spin />
        </div>
      );
    }
    const dataSource = this.props.rbacList.data;
    const data = {};
    data.title = {
      id: 'ID',
      role: '角色名称',
      description: '角色描述',
      status: '状态',
      action: '操作',
    };
    data.dataSource = dataSource;
    const extrasConditionsrbacList = {
      status: {
        render: (text, record) => <Icon type={record.status} />,
      },
      action: {
        render: (text, record) => {
          const menuUnit = record.action.map((value, index) =>
            <Menu.Item key={value + index}>{value}</Menu.Item>);
          const menu = (
            <Menu>
              {menuUnit}
            </Menu>
          );
          const dropDownMenu = (
            <Dropdown.Button overlay={menu} >
              操作
            </Dropdown.Button>
          );
          return dropDownMenu;
        },
      },
    };
    return MakeTable(data, 'rbacList_columns', 'rbacList_datasource', extrasConditionsrbacList, { bordered: true });
  }
}
RoleMangementTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rbacList: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const RoleMangementTableContainer = connect(state =>
  ({ rbacList: state.RbacListReducer.rbacList }))(RoleMangementTable);


const FormItem = Form.Item;
class AddRole extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }
  componentDidMount() {
    this.props.form.setFieldsValue({ AddRole_sender: 4645464 });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
          // 发送异步请求
          // 等待异步请求返回状态码
          // 改变gamelst数据状态为refresh
          // 跳转到games页面
        this.props.history.push('/games/games');
      }
      console.log(err);
    });
  }
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // const youximingchengError = isFieldTouched('userName') && getFieldError('userName');
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem label="角色名称" >
          {getFieldDecorator('AddRole_roleName', {
            rules: [{ required: true, message: '请输入发件人' }],
          })(
            <Input style={{ width: 200 }} placeholder="请输入发件人" />,
          )}
        </FormItem>
        <FormItem label="角色描述" >
          {getFieldDecorator('AddRole_roleDescription', {
            rules: [{ required: true, message: '请输入发件人' }],
          })(
            <Input type="textarea" style={{ width: 500 }} rows={4} placeholder="请输入发件人" />,
          )}
        </FormItem>
        <FormItem label="状态" >
          {getFieldDecorator('AddRole_status', {
            rules: [{ required: true, message: '状态' }],
          })(
            <RadioGroup >
              <Radio value={1}>开启</Radio>
              <Radio value={2}>禁用</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="提交" >
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

AddRole.propTypes = {
  form: PropTypes.shape({
    getFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func,
    setFieldsValue: PropTypes.func,
    setFields: PropTypes.func,
    validateFields: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
    getFieldError: PropTypes.func,
    getFieldsError: PropTypes.func,
    isFieldValidating: PropTypes.func,
    isFieldTouched: PropTypes.func,
    isFieldsTouched: PropTypes.func,
    resetFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.stirng,
      push: PropTypes.func,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    block: PropTypes.func,
  }).isRequired,
};

const NewForm = Form.create()(AddRole);

const RoleMangementWithTabs = function RoleMangementWithTabs(props) {
  const { history } = props;
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="角色管理" key="1">{<RoleMangementTableContainer />}</TabPane>
      <TabPane tab="添加角色" key="2">{<NewForm history={history} />}</TabPane>
    </Tabs>

  );
};

RoleMangementWithTabs.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.stirng,
      push: PropTypes.func,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    block: PropTypes.func,
  }).isRequired,
};

export default RoleMangementWithTabs;
