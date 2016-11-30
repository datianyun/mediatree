import React, {Component,PropTypes} from 'react'
import InputControl from '../../../components/InputControl'
import moment from 'moment'
import Datetime from '../../../components/DateTime'
import Dialog from '../../../components/Dialog'
import ImageUpload from '../../../components/Upload'
import {params} from '../../../lib/param'
import parseJson from 'parse-json'
import 'whatwg-fetch'
import './Account.scss'
class Account extends Component {
    constructor(props) {
        super(props)
        const gtype = g_userInfo.site
        this.state = {
            //类型
            type : gtype === 'tree_government' ? 'gov' : 'om',
            //收益生效时间　
            startDate : moment().add(1, "days").format('YYYY-MM-DD'),
            //母帐号
            parent:'',
            //子帐号
            child:'',
            //收益归属
            income:'1',
            //弹框控制
            modalIsOpen:false,
            img: '',
            delete:'0',
            files : []
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    handleApply(newDate){
        this.setState({
            startDate: newDate.format('YYYY-MM-DD')
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
    handleDelete(e){
        let target = e.currentTarget
        let label = target.querySelector('.icon-radio')
        if(label.classList.contains('radio-active')){
            label.classList.remove('radio-active')
            this.setState({delete:0})
        } else {
            label.classList.add('radio-active')
            this.setState({delete:1})
        }
    }
    formSubmit(e){
        e.preventDefault()
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
        let self = this
        let options = {}
        if(this.state.type==='gov'){
            options = {
                parent : this.state.parent,
                child : this.state.child,
                delarticle : this.state.delete
            }
        } else {
            options = {
                parent : this.state.parent,
                child : this.state.child,
                ad : this.state.income,
                date : this.state.startDate,
                pic : this.state.img
            }
        }
        this.closeModal()
        if(result) {
            fetch('/mediaTree/addTree', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params(options)
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                if(json.response.code===0){
                    alert(json.response.msg)
                }else{
                    alert(json.response.code+json.response.msg + json.data.msg)
                }
            }).catch(function(ex) {
                alert(ex)
            })
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
                        <p>母帐号、子账号不能为空</p>
                    </div>
                </div>
            )
        }
    }
    showFiles () {
        if (this.state.files.length <= 0) {
            return ''
        }
        let files = this.state.files
        let self = this
        return (
            <div className='dropped-files' >
                <ul>
                {[].map.call(files, function (f, i) {
                    let preview = ''
                    if (/image/.test(f.type)) {
                        preview = <img src={f.preview} />
                        f.uploadPromise.then(function(res){
                            let rs = JSON.parse(res.text)
                            if(rs.response.code=='0') {
                                let origin = self.state.img
                                if(rs.data !== origin) {
                                    self.setState({img:rs.data})
                                }
                            }
                        })
                    }
                    return <li key={i}>{preview}<a className="remove" onClick={self.cleanFiles.bind(self)}>删除</a></li>;
                })}
                </ul>
            </div>
        )
    }
    onDrop(files) {
        this.setState({
            files: files
        })
    }

    cleanFiles(){
        this.setState({
            files: [],
            img:''
        })
    }
    render() {
        const timeFormat = false
        const startDate = this.state.startDate
        const isOpen = this.state.modalIsOpen
        const uploadUrl = '/mediaTree/uploadImg'
        const gtype = g_userInfo.site
        if(gtype === 'tree_government') {
            const parentConfig = {
                title : '母帐号',
                type  : 'noempty',
                tipInfo : '说明：只可填写政府类帐号',
                placeholder : '请输入母账号id或注册邮箱',
                errorInfo : '母帐号不能为空'
            }
            const childConfig = {
                title : '子帐号',
                type  : 'noempty',
                tipInfo : '说明：只可填写政府类或其他机构帐号',
                placeholder : '请输入子账号id或注册邮箱',
                errorInfo : '子帐号不能为空'
            }
            return (
                <form className="form-horizontal omregister">
                    <div className="control-group">
                        <label className="control-label">母账号：</label>
                        <InputControl inputChange={this.parentState.bind(this)} config={parentConfig}/>
                    </div>
                    <div className="control-group">
                        <label className="control-label">子账号：</label>
                        <InputControl inputChange={this.childState.bind(this)} config={childConfig}/>
                    </div>
                    <div className="control-group hide">
                        <label className="control-label"></label>
                        <div className="controls">
                            <div className="checkbox-inline" onClick={this.handleDelete.bind(this)}>
                                <label className="ui-radio">
                                    <i className="icon icon-radio"></i>母帐号开通对子账号的删文权限
                                </label>
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
        } else {
            const parentConfig = {
                title : '母帐号',
                type  : 'noempty',
                tipInfo : '说明：非个人账号，母账号将对子账号有收益管理权限',
                placeholder : '请输入母账号id或注册邮箱',
                errorInfo : '母帐号不能为空'
            }
            const childConfig = {
                title : '子帐号',
                type  : 'noempty',
                tipInfo : '',
                placeholder : '请输入子账号id或注册邮箱',
                errorInfo : '子帐号不能为空'
            }
            return (
                <form className="form-horizontal omregister">
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
                                <label className="ui-radio" data-id="1">
                                    <i className="icon icon-radio radio-active"></i>母帐号接收全部收益
                                </label>
                                <label className="ui-radio" data-id="0">
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
                        <label className="control-label">上传关系及收益归属文件：</label>
                        <div className="controls">
                            <ImageUpload uploadUrl={uploadUrl} onDrop={this.onDrop.bind(this)} />
                            {this.showFiles()}
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
}

Account.propTypes = {

}

export default Account
