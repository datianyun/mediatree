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
                placeholder : config.placeholder,
                tipInfo : config.tipInfo
            }
        }
    }
    handleTypeCount(target){
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
        this.props.inputChange(text);
    }
    handleTypeEmpty(target){
        let config = this.state.config;
        let option = {};
        let text = target.value.trim();
        if(/^\s*$/g.test(text)) {
            option.error = true;
            option.errorInfo = this.props.config.errorInfo;
        } else {
            option.error = false;
            option.errorInfo = '';
        }
        let newConfig = Object.assign({},config,option);
        this.setState({config:newConfig});
        this.props.inputChange(text);
    }
    handleChange(e){
        let target = e.currentTarget;
        let config = this.state.config;
        let type = this.props.type || 'noempty'
        let option = {};
        switch(type) {
            case 'count' :
                this.handleTypeCount(target)
            default :
                this.handleTypeEmpty(target)
        }
    }
    render() {
        const config = this.state.config
        return (
            <div className="controls">
                <input type="text" className="input-xlarge" placeholder={config.placeholder} onBlur={this.handleChange.bind(this)}/>
                <div className="controls-help">
                    <p className="help-block">{config.tipInfo}</p>
                </div>
                <p className={classnames({
                    'help-block' : true,
                    'error' : config.error
                })}>{config.errorInfo}</p>
            </div>
        )
    }
}

InputControl.propTypes = {
    config : PropTypes.object,
    inputChange : PropTypes.func
}

export default InputControl
