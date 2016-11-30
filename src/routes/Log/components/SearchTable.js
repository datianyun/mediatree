import React, {Component,PropTypes} from 'react'
import Table from '../../../components/Table'
import Paging from '../../../components/Paging'
import classnames from 'classnames'
import {params} from '../../../lib/param'
class SearchTable extends Component {
    constructor(props) {
        super(props)
    }
    combineTdata(lists) {
        let tarray = []
        for (var item of lists) {
            let obj = []
            obj.push(item['Fid'])
            obj.push(item['FopContent'])
            obj.push(item['FparentId'])
            obj.push(item['FchildId'])
            obj.push(item['FopType'])
            obj.push(item['Fdata'])
            obj.push(item['FuserId'])
            obj.push(item['FserverIp'])
            obj.push(item['Ftime'])
            tarray.push(obj);
        }
        return tarray;
    }

    render() {
        const actData = this.props.data
        const pageClick = this.props.fetchData
        let columns = ['ID','操作对象','母帐号','子账号','操作类型','数据变化','操作人','操作人IP','操作时间']

        const tdata = actData.list!=undefined ? this.combineTdata(actData.list) : []
        const config = {
            currentPage : actData.page,
            total : actData.total,
            perNum : 20
        }
        return (
            <div className="search-table">
                <Table columns={columns} tdata={tdata}></Table>
                <Paging onclick={pageClick} config={config}></Paging>
            </div>
        )
    }
}

SearchTable.propTypes = {
    data: PropTypes.object,
    fetchData : PropTypes.func
}

export default SearchTable
