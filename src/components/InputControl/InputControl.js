import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'
import './InputControl.scss'
class InputControl extends Component {
    constructor(props, context) {
        super(props, context);
        const config = this.props.config;
        this.state = {
            config : {
                maxLen : config.maxLen,
                minLen : config.minLen,
                title : config.title,
                curLen : 0,
                error : false,
                errorInfo : '',
                tipInfo : '最大长度' + config.maxLen + '个字(必填)'
            }
        }
    }
    handleChange(e){
        let target = e.currentTarget;
        let config = this.state.config;
        let option = {};
        let curLen = target.value.length;
        if(curLen < config.minLen) {
            option.error = true;
            option.errorInfo = config.title + '不能少于' + config.minLen + '个字';
        } else if(curLen > config.maxLen) {
            option.error = true;
            option.errorInfo = config.title + '不能多于' + config.maxLen + '个字';
        } else {
            option.error = false;
            option.errorInfo = '';
        }
        option.curLen = curLen;
        let newConfig = Object.assign({},config,option);
        this.setState({config:newConfig});
    }
    render() {
        const config = this.state.config
        return (
            <div className="form-control">
                <div className="input-control input-control-count">
                    <input type="text" className="input-text title"  onChange={this.handleChange.bind(this)}/>
                    <div className="count">{config.curLen}/{config.maxLen}</div>
                </div>
                <p className={classnames({
                    'help-block' : true,
                    'v_title' : true,
                    'help-error' : config.error
                })}>{config.errorInfo}</p>
                <p className="help-block">{config.tipInfo}</p>
            </div>
        )
    }
}

InputControl.propTypes = {
    config : PropTypes.object
}

export default InputControl
