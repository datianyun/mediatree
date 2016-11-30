import React, {Component,PropTypes} from 'react'
import Table from '../../../components/Table'
import Paging from '../../../components/Paging'
import InputControl from '../../../components/InputControl'
import moment from 'moment'
import Datetime from '../../../components/DateTime'
import classnames from 'classnames'
import Dialog from '../../../components/Dialog'
import ImageUpload from '../../../components/Upload'
import {params} from '../../../lib/param'
import '../../AccountSetting/components/Account.scss'
class SearchTable extends Component {
    constructor(props) {
        super(props)
        const gtype = g_userInfo.site
        this.state = {
            dialogConfig : {
                renderType : 'edit',
                title : '修改',
                buttonText : '确定'
            },
            type : gtype === 'tree_government' ? 'gov' : 'om',
            startDate : moment().add(1, "days"),
            //母帐号
            parent:'',
            //子帐号
            child:'',
            //收益归属
            income:'1',
            //弹框控制
            modalIsOpen:false,
            img: '',
            delete : '0',
            files : []
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
    validate(){
        let parent = this.state.parent
        let child = this.state.child
        return (parent!=='') && (child!=='')
    }
    accountOpt(e){
        let target = e.target
        let classes = target.classList
        let income = target.dataset.status
        let origin = this.state.dialogConfig
        let tr = e.currentTarget.parentNode
        let parent = tr.childNodes[0].innerText
        let child = tr.childNodes[3].innerText
        let config = {}
        if(classes.contains('edit')){
            let gtype = this.state.type
            if(gtype === 'gov') {
                config = Object.assign({}, origin, {
                    type : 'edit',
                    title : '删文权限',
                    buttonText : '确定'
                })
            } else {
                config = Object.assign({}, origin, {
                    type : 'edit',
                    title : '收益重置',
                    buttonText : '确定'
                })
            }
        } else if(classes.contains('remove')) {
            config = Object.assign({}, origin, {
                type : 'remove',
                title : '解除绑定',
                buttonText : '确定'
            })
        } else if(classes.contains('add')) {
            config = Object.assign({}, origin, {
                type : 'add',
                title : '帐号绑定',
                buttonText : '提交'
            })
        } else {
            return
        }
        this.setState({dialogConfig:config,parent:parent,child:child,income:income})
        this.openModal()
    }

    combineTdata(lists) {
        let tarray = [];
        const gtype = this.state.type
        for (var item of lists) {
            let obj = []
            obj.push(item['Fparent_id'])
            obj.push(item['Fparent_name'])
            obj.push(item['Fparent_regemail'])
            obj.push(item['Fchild_id'])
            obj.push(item['Fchild_name'])
            obj.push(item['Fchild_regemail'])
            if(gtype==='gov') {

            } else {
                obj.push(item['ad_status_cn'])
            }
            if(item['Fstatus'] =='-1'){
                obj.push('已解绑')
            } else {
                obj.push('已绑定')
            }
            obj.push(item['Fupdator'])
            let action = {
                className : 'col-action clearfix',
                type : 'html',
                click : this.accountOpt.bind(this),
                value : ''
            }
            for(var button in item['op_str']){
                let className = item['op_str'][button].ename
                let textName = item['op_str'][button].sname
                let fstatus = item['Fad_status']
                action.value += '<a class="label '+className+'"' + ' data-status="' + fstatus+'">' +textName+'</a>';
            }
            obj.push(action);
            tarray.push(obj);
        }
        return tarray;
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
    openModal(){
        this.setState({modalIsOpen:true})
    }
    closeModal(){
        this.setState({modalIsOpen:false})
    }
    submit(option){
        let self = this
        this.closeModal()
        fetch(option.url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params(option.data)
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            if(json.response.code===0){
                alert(json.response.msg)
                self.props.fetchData()
            }else{
                alert(json.response.msg)
            }
        }).catch(function(ex) {
            alert(ex)
        })
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
    DialogSaveClicked(){
        let result = true
        let self = this
        if(result){
            let dialogType = this.state.dialogConfig.type
            if(dialogType==='edit'){
                let gtype = this.state.type
                let option = {
                    url : '/mediaTree/changeAd ',
                    data : {
                        parent : self.state.parent,
                        child : self.state.child,
                        ad : self.state.income
                    }
                }
                if(gtype ==='gov') {
                    option = {
                        url : '/mediaTree/changeSetting',
                        data : {
                            parent : self.state.parent,
                            child : self.state.child,
                            delarticle : this.state.delete
                        }
                    }
                }
                this.submit(option)
            } else if(dialogType==='remove'){
                let option = {
                    url : '/mediaTree/removeTree',
                    data : {
                        parent : self.state.parent,
                        child : self.state.child
                    }
                }
                this.submit(option)
            } else if(dialogType==='add'){
                let gtype = this.state.type
                let option = {
                    url : '/mediaTree/addTree',
                    data : {
                        parent : this.state.parent,
                        child : this.state.child,
                        ad : this.state.income,
                        date : this.state.startDate,
                        pic : this.state.img
                    }
                }
                if(gtype ==='gov') {
                    option = {
                        url : '/mediaTree/addTree',
                        data : {
                            parent : this.state.parent,
                            child : this.state.child,
                            delarticle : this.state.delete
                        }
                    }
                }
                this.submit(option)
            }
        } else {
            this.closeModal()
        }
    }
    renderDialog(){
        const parent = this.state.parent
        const child = this.state.child
        let dialogType = this.state.dialogConfig.type

        const timeFormat = false
        const uploadUrl = '/mediaTree/uploadImg'
        const startDate = this.state.startDate
        const income = this.state.income
        if(dialogType==='edit'){
            let gtype = this.state.type
            if(gtype ==='gov') {
                return (
                    <div className="control-group">
                        <label className="control-label"></label>
                        <div className="controls">
                            <div className="checkbox-inline" onClick={this.handleDelete.bind(this)}>
                                <label className="ui-radio">
                                    <i className="icon icon-radio"></i>母帐号开通对子账号的删文权限
                                </label>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="controls notin">
                        <div className="checkbox-inline" onClick={this.handlePay.bind(this)}>
                            <label className="ui-radio" data-id="1">
                                <i className={classnames({
                                    'icon icon-radio' :true,
                                    'radio-active': income == 1
                                })}></i>母帐号接收全部收益
                            </label>
                            <label className="ui-radio" data-id="0">
                                <i  className={classnames({
                                    'icon icon-radio' :true,
                                    'radio-active': income == 0
                                })}></i>子账号接收全部收益
                            </label>
                        </div>
                        <p className="info">说明：重置后次日生效</p>
                    </div>
                )
            }

        } else if(dialogType==='remove'){
            return (
                <div className="form-horizontal">
                    <div className="form-group">
                        <p>确定要解除帐号的子母关系么?</p>
                    </div>
                </div>
            )
        } else if(dialogType==='add'){
            const childConfig = {
                title : '子帐号',
                type  : 'noempty',
                tipInfo : '说明：只可填写政府类或其他机构帐号',
                placeholder : '请输入子账号id或注册邮箱',
                errorInfo : '子帐号不能为空'
            }
            let gtype = this.state.type
            if(gtype ==='gov') {
                return (
                    <form className="form-horizontal omregister">
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
                    </form>
                )
            } else {
                const childConfig = {
                    title : '子帐号',
                    type  : 'noempty',
                    tipInfo : '',
                    placeholder : '请输入子账号id或注册邮箱',
                    errorInfo : '子帐号不能为空'
                }
                return (
                    <div className="form-horizontal omregister">
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
                                <ImageUpload uploadUrl={uploadUrl} onDrop={this.onDrop.bind(this)}/>
                                {this.showFiles()}
                            </div>
                        </div>
                    </div>
                )
            }

        }

    }
    render() {
        const actData = this.props.data
        const pageClick = this.props.fetchData
        const gtype = this.state.type
        let columns
        if(gtype === 'gov') {
            columns = ['母帐号ID','母帐号媒体名','母帐号注册邮箱','子账号id','子账号媒体名','子账号注册邮箱','状态','绑定人','操作']
        } else {
            columns = ['母帐号ID','母帐号媒体名','母帐号注册邮箱','子账号id','子账号媒体名','子账号注册邮箱','收益情况','状态','绑定人','操作']
        }

        const tdata = actData.list!=undefined ? this.combineTdata(actData.list) : []
        const config = {
            currentPage : actData.page,
            total : actData.total,
            perNum : 20
        }
        const dialogConfig = this.state.dialogConfig
        const isOpen = this.state.modalIsOpen
        return (
            <div className="search-table">
                <Table columns={columns} tdata={tdata}></Table>
                <Paging onclick={pageClick} config={config}></Paging>
                <Dialog title={dialogConfig.title} buttonText={dialogConfig.buttonText} handleSaveClicked={this.DialogSaveClicked.bind(this)} openModal={this.openModal.bind(this)} closeModal={this.closeModal.bind(this)}  isOpen={isOpen} renderHTML={this.renderDialog.bind(this)}></Dialog>
            </div>
        )
    }
}

SearchTable.propTypes = {
    data: PropTypes.object,
    fetchData : PropTypes.func
}

export default SearchTable
