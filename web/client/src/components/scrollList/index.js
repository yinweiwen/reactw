import React from 'react';
import { BackTop,Spin  } from 'antd';

class ScrollList extends React.Component {

    // static propTypes = {
    //     scrollEl: React.PropTypes.oneOfType([
    //         React.PropTypes.object,
    //         React.PropTypes.instanceOf(HTMLElement)
    //     ]),
    //     className: React.PropTypes.string,
    //     LoadMore: React.PropTypes.func,
    //     end: React.PropTypes.bool,
    //     loading: React.PropTypes.bool,
    //     onRefresh: React.PropTypes.func
    // };

    constructor(props) {
        super(props);
        this.state = {
            showTopArrow: false
        }
    }

    componentDidMount() {
        let { loaderMore, scrollEl, onRefresh } = this.props;
        if (scrollEl) {
            scrollEl.addEventListener('scroll', this.shouldLoaderMore)
        }
        if (onRefresh) {
            onRefresh();
        }
    }

    componentWillUnmount() {
        let { scrollEl } = this.props;
        if (scrollEl) {
            scrollEl.removeEventListener('scroll', this.shouldLoaderMore)
        }
    }

    shouldLoaderMore = (e) => {
        console.log('should load more')
        let { scrollEl, loaderMore, end, loading } = this.props;
        if (scrollEl) {
            let target = scrollEl;
            this.setState({ showTopArrow: true });
            if (Math.ceil(target.scrollTop) + target.clientHeight == target.scrollHeight && target.scrollTop !== 0) {
                if (end || loading) return;
                loaderMore()
            }
        }
    };

    render() {
        let { componentList, end, loading, scrollEl } = this.props;
        return (
        <Spin tip='loading' spinning={loading}>
            <div>
                {componentList}
                {end &&
                    <div>
                        {'没有更多内容'}
                    </div>
                }
                {this.state.showTopArrow ? <BackTop target={() => scrollEl} /> : null}
            </div>
        </Spin>
        )
    }
}

export default ScrollList;