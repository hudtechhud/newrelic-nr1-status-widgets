import React from 'react';
import NrqlMetric from './bottomNrqlMetric';

export default class BottomMetrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightStatus: null,
      leftStatus: null
    };
  }

  updateState = state => this.setState(state);

  render() {
    const {
      leftMetric,
      rightMetric,
      width,
      mainProps,
      displayTimeline,
      hideLabels,
      fontSizeMultiplier,
      row,
      rows,
      height,
      colSpan
    } = this.props;

    const {
      accountId,
      metricSuffixLeft,
      decimalPlacesLeft,
      metricSuffixRight,
      decimalPlacesRight,
      enableFlashLeft,
      enableFlashRight
    } = mainProps;

    let {
      queryRight,
      queryLeft,
      metricLabelRight,
      metricLabelLeft
    } = mainProps;

    // force null since custom viz props don't clear properly and leave a FROM clause
    if ((queryRight || '').length <= 5) queryRight = null;
    if ((queryLeft || '').length <= 5) queryLeft = null;

    if (queryRight === null && queryLeft === null) {
      return '';
    }

    const fullWidth = !(queryRight && queryLeft);

    // blank gap appears if label is used on one and not the other
    if (metricLabelRight && !metricLabelLeft) metricLabelLeft = '';
    if (metricLabelLeft && !metricLabelRight) metricLabelRight = '';

    if (hideLabels) {
      metricLabelLeft = '';
      metricLabelRight = '';
    }

    // bottom += row === 0 ? 20 : 0;

    const defaultFontSize = 20;

    return (
      <tr style={{ height, maxHeight: height }}>
        {queryLeft && (
          <td colSpan={queryRight ? 1 : 2} style={{ padding: '0px', height }}>
            <div style={{ maxHeight: height }}>
              <NrqlMetric
                height={height}
                direction="left"
                fullWidth={fullWidth}
                fontSizeMultiplier={fontSizeMultiplier}
                width={queryRight ? width / 2 : width}
                query={queryLeft}
                enableFlash={enableFlashLeft}
                accountId={accountId}
                configuration={leftMetric.configuration}
                numberFormat={leftMetric?.numberFormat}
                altConfiguration={rightMetric?.configuration || {}}
                decimalPlaces={decimalPlacesLeft}
                metricSuffix={metricSuffixLeft}
                metricLabel={metricLabelLeft}
                updateState={this.updateState}
                rightStatus={this.state.rightStatus}
                leftStatus={this.state.leftStatus}
                metricLabelRight={metricLabelRight}
                hideLabels={hideLabels}
                displayTimeline={displayTimeline}
              />
            </div>
          </td>
        )}
        {queryRight && (
          <td colSpan={queryLeft ? 1 : 2} style={{ padding: '0px', height }}>
            <div style={{ maxHeight: height }}>
              <NrqlMetric
                height={height}
                direction="right"
                fullWidth={fullWidth}
                fontSizeMultiplier={fontSizeMultiplier}
                width={queryLeft ? width / 2 : width}
                query={queryRight}
                enableFlash={enableFlashRight}
                accountId={accountId}
                configuration={rightMetric.configuration}
                numberFormat={rightMetric?.numberFormat}
                altConfiguration={leftMetric?.configuration || {}}
                decimalPlaces={decimalPlacesRight}
                metricSuffix={metricSuffixRight}
                metricLabel={metricLabelRight}
                updateState={this.updateState}
                rightStatus={this.state.rightStatus}
                leftStatus={this.state.leftStatus}
                metricLabelLeft={metricLabelLeft}
                hideLabels={hideLabels}
                displayTimeline={displayTimeline}
              />
            </div>
          </td>
        )}
      </tr>
    );
  }
}
