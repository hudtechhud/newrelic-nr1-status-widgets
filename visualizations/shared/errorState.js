import React from 'react';
import { Card, CardBody, HeadingText } from 'nr1';

export default class ErrorState extends React.Component {
  render() {
    return (
      <Card className="ErrorState">
        <CardBody className="ErrorState-cardBody">
          <HeadingText
            className="ErrorState-headingText"
            spacingType={[HeadingText.SPACING_TYPE.LARGE]}
            type={HeadingText.TYPE.HEADING_3}
          >
            Oops! Something went wrong.
          </HeadingText>
          {(this.props?.errors || []).map((error, i) => (
            <HeadingText
              key={i}
              spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
              type={HeadingText.TYPE.HEADING_4}
            >
              {error}
            </HeadingText>
          ))}
        </CardBody>
      </Card>
    );
  }
}
