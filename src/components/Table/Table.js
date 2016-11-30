import React, {PropTypes, Component} from 'react'
import './Table.scss'

class Table extends Component {
    constructor(props, context) {
        super(props, context)
    }
    /*
     *渲染表单的头部
     */
    renderThead(data){
        return (
            <tr>
                {data.map((text,i)=>
                    <th key={i}>{text}</th>
                )}
            </tr>
        )
    }
    /*
     *渲染表单的内容，考虑内容为html且传入的参数带有array或者Object
     */
    renderTbody(data){
        return (
            <tbody>
                {data.map((item,i)=>
                    <tr key={i}>
                        {item.map((obj,j)=>
                            {if(obj instanceof Object) {
                                {if(obj.type !== 'html') {
                                    return <td key={j} className={obj.className}>{obj.value}</td>
                                } else {
                                    let html = {__html: obj.value};
                                    if(obj.click && obj.click instanceof Function){
                                        return <td onClick={obj.click} key={j} className={obj.className} dangerouslySetInnerHTML={html}></td>
                                    } else {
                                        return <td key={j} className={obj.className} dangerouslySetInnerHTML={html}></td>
                                    }
                                }}
                            } else {
                                return <td key={j}>{obj}</td>
                            }}
                        )}
                    </tr>
                )}
            </tbody>
        )
    }
    render() {
        const{columns,tdata} = this.props
        return (
            <table className="table-b">
                <thead>{this.renderThead(columns)}</thead>
                {this.renderTbody(tdata)}
            </table>
        )
    }
}

Table.propTypes = {
    columns : PropTypes.array.isRequired,
    tdata : PropTypes.array.isRequired
}

export default Table
