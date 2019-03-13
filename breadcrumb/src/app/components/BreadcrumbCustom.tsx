import * as React from 'react';
import { Breadcrumb, IBreadcrumbStyles, IDividerAsProps } from 'office-ui-fabric-react/lib/Breadcrumb';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { initializeIcons } from '@uifabric/icons';
initializeIcons();

export class IBreadcrumbCustomProps {
    items: {text: string, href: string}[]
}

export class BreadcrumbCustom extends React.Component<IBreadcrumbCustomProps, any> {
    constructor(props: IBreadcrumbCustomProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
                <Breadcrumb
                    styles={this._getStyleProps}
                    items={this.props.items.map((item, index) => (
                        { 
                            text: item.text, 
                            key: index.toString(), 
                            href: index != this.props.items.length - 1 ? item.href : '#'
                        }))
                    }
                    dividerAs={this._getCustomDivider} />
            </div>
        );
    }

    private _getStyleProps = (): Partial<IBreadcrumbStyles> => { 
        return {
            itemLink:[
                {
                    padding: '0 8px 0 0',
                    selectors: {
                        ':hover': {
                            backgroundColor: 'transparent',
                        }
                    }
                }
            ]
        };
    };

    private _getCustomDivider = (dividerProps: IDividerAsProps): JSX.Element => {
        const tooltipText = dividerProps.item ? dividerProps.item.text : '';
        return (
          <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
           <span style={{ cursor: 'pointer',  }}><Icon style={{ padding: '5px 8px 0px 0px',  }} iconName="CaretHollow" /></span>
          </TooltipHost>
        );
    };
}