import React, {Component,PropTypes} from 'react'
import SearchBar from './SearchBar'
import Table from '../../../components/Table'
import Paging from '../../../components/Paging'
import './Manager.scss'
class Manager extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    combineTdata(lists) {
        let tarray = [];
        for (var item of lists) {
            let obj = [];
            obj.push(item['Fid']);
            obj.push(item['Ftitle']);
            obj.push(item['Fend_time']);
            obj.push(item['Fdeadline_time'] === null ? '-' : item['Fdeadline_time']);
            obj.push(item['Forg_name']);
            obj.push(item['Fcreator_name']);
            obj.push(item['Fgoods_totalnum']);
            obj.push(item['Fgoods_ordernum']);
            let status = {
                type : 'html',
                value : ''
            }
            if(item['Fstatus'] === '已发布'){
                status.value = '<a class="success">'+item['Fstatus']+'</a>';
            }else if(item['Fstatus'] === '未通过'){
                status.value = '<a class="danger">'+item['Fstatus']+'</a>';
            }else if(item['Fstatus'] === '待审核'){
                status.value = '<a class="info">'+item['Fstatus']+'</a>';
            }else{
                status.value = '<a class="over">'+item['Fstatus']+'</a>';
            }
            obj.push(status);
            let action = {
                className : 'col-action clearfix',
                type : 'html',
                value : ''
            }
            for(var button in item['op_str']){
                let className = item['op_str'][button].ename;
                let textName = item['op_str'][button].sname;
                action.value += '<a class="label '+className+'">'+textName+'</a>';
            }
            obj.push(action);
            tarray.push(obj);
        }
        return tarray;
    }
    render() {
        const actData = this.props.actData;
        const columns = ['体验ID','体名称','报名截止时间','文章截止时间','运营商','体验发布人','体验资格数量','申请人数','申请状态','操作'];
        const tdata = this.combineTdata(search.data.list);
        const config = {
            currentPage : 1,
            total : 200,
            perNum : 20
        }
        return (
            <div>
                <Table columns={columns} tdata={tdata}></Table>
                <Paging config={config}></Paging>
            </div>
        )
    }
}

Manager.propTypes = {

}

export default Manager
