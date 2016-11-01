import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import './Paging.scss'
class Paging extends Component {
    constructor(props, context) {
        super(props, context)
    }
    handlePage(e){
        let target = e.target.parentNode;
        const data = this.props.config;
        let cname = target.className;
        let total =  Math.ceil(data.total/data.perNum);
        let pageConfig = {
            currentPage : data.currentPage,
            perNum : data.perNum
        };
        if(cname.indexOf('disagble')!==-1){
            return
        } else if(cname.indexOf('page')!==-1){
            pageConfig = Object.assign({},pageConfig,{
                currentPage : target.textContent
            })
        } else if(cname.indexOf('first')!==-1){
            pageConfig = Object.assign({},pageConfig,{
                currentPage : 1
            })
        } else if(cname.indexOf('pre')!==-1){
            pageConfig = Object.assign({},pageConfig,{
                currentPage : (data.currentPage-1)>0?(data.currentPage-1):1
            })
        } else if(cname.indexOf('next')!==-1){
            pageConfig = Object.assign({},pageConfig,{
                currentPage : (data.currentPage+1)<total?(data.currentPage+1):total
            })
        } else if(cname.indexOf('last')!==-1){
            pageConfig = Object.assign({},pageConfig,{
                currentPage : total
            })
        }
    }
    render() {
        const {currentPage,total,perNum} = this.props.config;
        const pageNum = Math.ceil(total/perNum);
        const pageList = [];
        const showPage = 5;
        if(pageNum < showPage) {
            for(let k=1;k<=pageNum;k++){
                pageList.push({
                    index:k
                })
            }
        } else {
            let start = (currentPage-2>0)?currentPage-2:1;
            let end = (start+4>pageNum)?pageNum:start+4;
            for(let k=start;k<=end;k++){
                pageList.push({
                    index:k
                })
            }
        }
        return (
            <div className="paginationholder">
                <ul className="pagination" onClick={this.handlePage.bind(this)} >
                    <li className={classnames({
                        first:true,
                        disabled:currentPage==1
                    })}><a>&lt;&lt;</a></li>
                    <li className={classnames({
                        pre:true,
                        disabled:currentPage==1
                    })}><a>&lt;</a></li>
                    {pageList.map((item,i) =>
                        <li className={classnames({
                            page:true,
                            active:item.index==currentPage
                        })} key={i}><a>{item.index}</a></li>
                    )}
                    <li className={classnames({
                        next:true,
                        disabled:currentPage==pageNum
                    })}><a>&gt;</a></li>
                    <li className={classnames({
                        last:true,
                        disabled:currentPage==pageNum
                    })}><a>&gt;&gt;</a></li>
                </ul>
            </div>
        )
    }
}

Paging.propTypes = {
    config : PropTypes.object
}

export default Paging
