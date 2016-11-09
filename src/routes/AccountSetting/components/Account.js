import React, {Component,PropTypes} from 'react'
import InputControl from '../../../components/InputControl'
import moment from 'moment'
import Datetime from '../../../components/DateTime'
import Dialog from '../../../components/Dialog'
import './Account.scss'
class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //收益生效时间　
            startDate : moment(),
            //母帐号
            parent:'',
            //子帐号
            child:'',
            //收益归属
            income:'',
            //弹框控制
            modalIsOpen:false
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    handleApply(newDate){
        this.setState({
            startDate: newDate
        })
    }
    parentState(value){
        this.setState({parent:value})
    }
    childState(value){
        this.setState({child:value})
    }

    handlePay(e){
        let target = e.target
        let radioButtons = document.querySelectorAll('.checkbox-inline i')
        radioButtons.forEach(function(item,i){
            item.classList.remove('radio-active')
        });
        if(target.nodeName==='I') {
            target.classList.add('radio-active')
        } else {
            target = target.querySelector('i')
            target.classList.add('radio-active')
        }
        let radios = target.parentNode
        let type = radios.dataset.id
        this.setState({income:type})
    }
    formSubmit(e){
        e.preventDefault()
        let options = this.state
        this.openModal()
    }
    validate(){
        let parent = this.state.parent
        let child = this.state.child
        return (parent!=='') && (child!=='')
    }
    openModal(){
        this.setState({modalIsOpen:true})
    }
    closeModal(){
        this.setState({modalIsOpen:false})
    }
    DialogSaveClicked(){
        let result = this.validate()
        if(result){
            alert('success')
        } else {
            this.closeModal()
        }
    }
    renderDialog(){
        const parent = this.state.parent
        const child = this.state.child
        let result = this.validate()
        if(result){
            return (
                <div className="form-horizontal">
                    <div className="form-group">
                        <p>母账号{parent},绑定子账号{child},是否绑定</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="form-horizontal">
                    <div className="form-group">
                        <p>母帐号或子账号不能为空</p>
                    </div>
                </div>
            )
        }

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
        const timeFormat = true
        const startDate = this.state.startDate
        const isOpen = this.state.modalIsOpen
        return (
            <form className="form-horizontal omregister ng-valid ng-dirty">
                <div className="control-group">
                    <label className="control-label">母账号：</label>
                    <InputControl inputChange={this.parentState.bind(this)} config={parentConfig}/>
                </div>
                <div className="control-group">
                    <label className="control-label">子账号：</label>
                    <InputControl inputChange={this.childState.bind(this)} config={childConfig}/>
                </div>
                <div className="control-group">
                    <label className="control-label"></label>
                    <div className="controls">
                        <div className="checkbox-inline" onClick={this.handlePay.bind(this)}>
                            <label className="ui-radio" data-id="parent">
                                <i className="icon icon-radio radio-active"></i>母帐号接收全部收益
                            </label>
                            <label className="ui-radio" data-id="child">
                                <i className="icon icon-radio"></i>子账号接收全部收益
                            </label>
                        </div>
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label">收益生效时间：</label>
                    <div className="controls">
                        <Datetime locale="zh-cn" onChange={this.handleApply.bind(this)} defaultValue={startDate} timeFormat={timeFormat} />
                        <div className="controls-help">
                            <p className="help-block">说明：母帐号接收全部收益时，当天收益以后裔结算时间为准，即收益结算时间晚于收益生效时间当天收益则归属于母帐号</p>
                        </div>
                    </div>
                </div>
                <div className="control-group">
                    <div className="controls">
                        <button onClick={this.formSubmit.bind(this)} className="btn btn-publish">提交</button>
                    </div>
                </div>
                <Dialog buttonText="确定" handleSaveClicked={this.DialogSaveClicked.bind(this)} openModal={this.openModal.bind(this)} closeModal={this.closeModal.bind(this)}  isOpen={isOpen} renderHTML={this.renderDialog.bind(this)}></Dialog>
            </form>
        )
    }
}

Account.propTypes = {

}

export default Account
