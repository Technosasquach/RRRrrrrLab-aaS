import * as React from 'react';

import Tab from './Tab';
import "./Tabs.less";

class Tabs extends React.Component<{children: any},{activeTab: any}> {

    constructor(props: any) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab: any) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;

        return (
        <div className="tabs division">
            <ol className="tab-list">
                {children.map((child: any) => {
                    const { label } = child.props;

                    return (
                    <Tab
                        activeTab={activeTab}
                        key={label}
                        label={label}
                        onClick={onClickTabItem}
                    />
                    );
                })}
            </ol>
            <div className="tab-content">
            {children.map((child: any) => {
                if (child.props.label !== activeTab) return undefined;
                return child.props.children;
            })}
            </div>
        </div>
        );
    }
}

export default Tabs;