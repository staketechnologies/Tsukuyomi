import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
`;


export default function CircularIndeterminate() {
  return (
    <div>
      <FadeLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={'#FFFFFF'}
          loading={true}
        />
      {//<CircularProgress size={70} className={classes.progress} color="primary" />
      }
    </div>
  );
}
