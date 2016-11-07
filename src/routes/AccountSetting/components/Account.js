import React, {Component,PropTypes} from 'react'
import InputControl from '../../../components/InputControl'
import './Account.scss'
class Account extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        const parentConfig = {
            title : '母帐号',
            type  : 'noempty',
            tipInfo : '说明：非个人账号，母账号将对子账号有收益管理权限',
            placeholder : '请输入母账号id或注册邮箱',
            errorInfo : '母帐号不能为空'
        };
        const childConfig = {
            title : '子帐号',
            type  : 'noempty',
            tipInfo : '',
            placeholder : '请输入子账号id或注册邮箱',
            errorInfo : '子帐号不能为空'
        };
        return (
            <form className="form-horizontal omregister ng-valid ng-dirty">
                <div className="control-group">
                    <label className="control-label">母账号：</label>
                    <InputControl config={parentConfig}/>
                </div>
                <div className="control-group">
                    <label className="control-label">子账号：</label>
                    <InputControl config={childConfig}/>
                </div>
                <div className="control-group">
                    <label className="control-label">收益方：</label>
                    <div className="controls">
                        <div className="checkbox-inline">
                            <label className="ui-radio" data-id="single">
                                <i className="icon icon-radio radio-active"></i>单图
                            </label>
                            <label className="ui-radio" data-id="multi">
                                <i className="icon icon-radio"></i>三图
                            </label>
                            <label className="ui-radio" data-id="auto">
                                <i className="icon icon-radio"></i>自动
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

Account.propTypes = {

}

export default Account
