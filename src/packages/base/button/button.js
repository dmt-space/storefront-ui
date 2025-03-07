/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from "react";
import {
  BaseButton as StyledBaseButton,
  LoadingSpinner as StyledLoadingSpinner,
  LoadingSpinnerContainer as StyledLoadingSpinnerContainer
} from "./styled-components.js";
import { getSharedProps } from "./utils.js";
import ButtonInternals from "./button-internals.js";
import { getOverrides } from "../helpers/overrides.js";
import { KIND, SHAPE, SIZE } from "./constants.js";

import type { ButtonPropsT } from "./types.js";

export default class Button extends React.Component<ButtonPropsT> {
  static defaultProps = {
    disabled: false,
    isLoading: false,
    isSelected: false,
    kind: KIND.primary,
    overrides: {},
    shape: SHAPE.default,
    size: SIZE.default,
    fitContainer: false
  };

  internalOnClick = (...args: *) => {
    const { isLoading, onClick } = this.props;
    if (isLoading) {
      return;
    }
    onClick && onClick(...args);
  };

  render() {
    const {
      overrides,
      size,
      kind,
      shape,
      isLoading,
      isSelected,
      // Removing from restProps
      startEnhancer,
      endEnhancer,
      children,
      forwardedRef,
      ...restProps
    } = this.props;
    // Get overrides
    const [BaseButton, baseButtonProps] = getOverrides(
      overrides.BaseButton,
      StyledBaseButton
    );

    const [LoadingSpinner, loadingSpinnerProps] = getOverrides(
      overrides.LoadingSpinner,
      StyledLoadingSpinner
    );
    const [
      LoadingSpinnerContainer,
      loadingSpinnerContainerProps
    ] = getOverrides(
      overrides.LoadingSpinnerContainer,
      StyledLoadingSpinnerContainer
    );
    const sharedProps = getSharedProps(this.props);
    return (
      <BaseButton
        data-baseweb="button"
        {...sharedProps}
        {...restProps}
        {...baseButtonProps}
        // Applies last to override passed in onClick
        onClick={this.internalOnClick}
        href={"#"}
      >
        {isLoading ? (
          <React.Fragment>
            {/* This is not meant to be overridable by users */}
            <div style={{ opacity: 0, display: "flex" }}>
              <ButtonInternals {...this.props} />
            </div>
            <LoadingSpinnerContainer {...loadingSpinnerContainerProps}>
              <LoadingSpinner {...sharedProps} {...loadingSpinnerProps} />
            </LoadingSpinnerContainer>
          </React.Fragment>
        ) : (
          <ButtonInternals {...this.props} />
        )}
      </BaseButton>
    );
  }
}
