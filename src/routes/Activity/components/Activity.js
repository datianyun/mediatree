import React, {Component,PropTypes} from 'react'
import './Activity.scss'
import InputControl from '../../../components/InputControl'
import ImageUpload from '../../../components/Upload'
class Manager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files : []
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    onDrop(files) {
        this.setState({
            files: files
        });
    }

    cleanFiles(){
        this.setState({
            files: []
        });
    }

    showFiles () {
        if (this.state.files.length <= 0) {
            return '';
        }
        let files = this.state.files;
        let self = this;
        return (
            <div className='dropped-files' >
                <ul>
                {[].map.call(files, function (f, i) {
                    let preview = '';
                    if (/image/.test(f.type)) {
                        preview = <img src={f.preview} />;
                    }
                    return <li key={i}>{preview}<a className="remove" onClick={self.cleanFiles.bind(self)}>删除</a></li>;
                })}
                </ul>
            </div>
        );
    }

    renderSelect(data){
        let arr = [];
        for (let key in data) {
            arr.push({
                value:key,
                text:data[key]
            })
        }
        return(
            <select  name="select" className="form-select">
                {arr.map((status,i)=>
                    <option key={i} value={status.value}>{status.text}</option>
                )}
            </select>
        )
    }

    render() {
        const inputConfig = {
            title : '标题',
            minLen : 5,
            maxLen : 30
        };
        const type = {
            1 : '到店体验',
            2 : '商品试用',
            3 : '约稿活动'
        };
        const category = {
            1 : '新闻',
            2 : '体育',
            3 : '财经'
        };
        return (
            <div>
                <div className="main-heading bor-bottom">
                    <h2>体验活动管理</h2>
                </div>
                <div className="breadcrumb-mod">
                    <ol className="breadcrumb">
                        <li><a href="/actManager">体验活动管理</a></li>
                        <li><span className="text-char">&gt;</span></li>
                        <li className="creat active">创建体验活动</li>
                    </ol>
                </div>
                <div className="form-horizontal">
                    <div className="form-container clearfix">
                        <div className="form-group">
                            <label className="form-label"><span className="star-mark">*</span>标题</label>
                            <InputControl config={inputConfig}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label"><span className="star-mark">*</span>页面头图</label>
                            <ImageUpload onDrop={this.onDrop.bind(this)}/>
                            {this.showFiles()}
                        </div>
                        <div className="form-group">
                            <label className="form-label"><span className="star-mark">*</span>体验形式</label>
                            <div className="form-control">
                                {this.renderSelect(type)}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label"><span className="star-mark">*</span>体验类别</label>
                            <div className="form-control">
                                {this.renderSelect(category)}
                            </div>
                        </div>
                    </div>
                    <div className="form-action">
                        <button type="button" className="btn btn-primary wancheng-btn">提交</button>
                    </div>
                </div>
            </div>
        )
    }
}

Manager.propTypes = {

}

export default Manager
