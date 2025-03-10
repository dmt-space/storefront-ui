/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import { styled } from "../styles/index.js";
import { KIND, SIZE, SHAPE } from "./constants.js";
import type { ThemeT } from "../styles/index.js";
import type { SharedStylePropsT } from "./types.js";

type StylePropsT = SharedStylePropsT & {
  $theme: ThemeT
};

function getBorderRadii({ $shape, $theme }: StylePropsT) {
  let value = "0px";

  if ($shape === SHAPE.round) {
    value = "50%";
  } else if ($theme.borders.useRoundedCorners) {
    value = $theme.borders.radius200;
  }

  return {
    borderTopRightRadius: value,
    borderBottomRightRadius: value,
    borderTopLeftRadius: value,
    borderBottomLeftRadius: value
  };
}

export const BaseButton = styled(
  "button",
  ({
    $theme,
    $size,
    $kind,
    $shape,
    $isLoading,
    $isSelected,
    $disabled,
    $fitContainer
  }: StylePropsT) => ({
    position: "relative",
    font: $size === SIZE.compact ? $theme.fonts.body2 : $theme.fonts.body1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    ...getBorderRadii({ $shape, $theme }),
    textDecoration: "none",
    outline: "none",
    WebkitAppearance: "none",
    transitionProperty: "background",
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    // ":disabled": {
    //   backgroundColor: $theme.colors.buttonDisabledFill,
    //   color: $theme.colors.buttonDisabledText
    // },
    cursor: $disabled ? "auto" : "pointer",
    // Padding For Shape and Size
    ...getStyleForShape({ $theme, $shape, $size }),
    // Kind style override
    ...getStyleForKind({ $theme, $kind, $isLoading, $isSelected, $disabled }),
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    width: $fitContainer ? "100%" : "auto"
  })
);

export const EndEnhancer = styled("div", ({ $theme }: StylePropsT) => ({
  display: "flex",
  marginLeft: $theme.sizing.scale500
}));

export const StartEnhancer = styled("div", ({ $theme }: StylePropsT) => ({
  display: "flex",
  marginRight: $theme.sizing.scale500
}));

export const LoadingSpinnerContainer = styled("div", {
  // To center within parent
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)"
});

export const LoadingSpinner = styled(
  "div",
  ({ $theme, $kind, $disabled }: StylePropsT) => {
    const { foreground, background } = getLoadingSpinnerColors({
      $theme,
      $kind,
      $disabled
    });
    return {
      height: $theme.sizing.scale600,
      width: $theme.sizing.scale600,
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
      borderStyle: "solid",
      borderWidth: $theme.sizing.scale0,
      borderTopColor: foreground,
      borderLeftColor: background,
      borderBottomColor: background,
      borderRightColor: background,
      animationDuration: $theme.animation.timing700,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationName: {
        to: {
          transform: "rotate(360deg)"
        },
        from: {
          transform: "rotate(0deg)"
        }
      }
    };
  }
);

export function getLoadingSpinnerColors({
  $theme,
  $kind,
  $disabled
}: StylePropsT) {
  return {
    foreground: $disabled
      ? $theme.colors.mono600
      : $kind === KIND.primary
      ? $theme.colors.white
      : $theme.colors.primary,
    background: $disabled
      ? "rgba(179, 179, 179, 0.32)"
      : $kind === KIND.primary
      ? "rgba(255, 255, 255, 0.32)"
      : "rgba(39, 110, 241, 0.32)"
  };
}

export function getStyleForShape({ $theme, $shape, $size }: StylePropsT) {
  if ($shape === SHAPE.round || $shape === SHAPE.square) {
    let padding;

    if ($size === SIZE.compact) {
      padding = $theme.sizing.scale400;
    } else if ($size === SIZE.large) {
      padding = $theme.sizing.scale600;
    } else {
      padding = $theme.sizing.scale400;
    }

    return {
      paddingTop: padding,
      paddingBottom: padding,
      paddingLeft: padding,
      paddingRight: padding
    };
  }

  let paddingHorizontal;
  let paddingVertical;

  if ($size === SIZE.compact) {
    paddingVertical = $theme.sizing.scale300;
    paddingHorizontal = $theme.sizing.scale600;
  } else if ($size === SIZE.large) {
    paddingVertical = $theme.sizing.scale700;
    paddingHorizontal = $theme.sizing.scale900;
  } else {
    paddingVertical = $theme.sizing.scale500;
    paddingHorizontal = $theme.sizing.scale900;
  }

  return {
    paddingTop: paddingVertical,
    paddingBottom: paddingVertical,
    paddingLeft: paddingHorizontal,
    paddingRight: paddingHorizontal
  };
}

export function getStyleForKind({
  $theme,
  $isLoading,
  $isSelected,
  $kind,
  $disabled
}: StylePropsT) {
  if ($disabled) {
    return {
      backgroundColor: $theme.colors.buttonDisabledFill,
      color: $theme.colors.buttonDisabledText
    };
  }

  switch ($kind) {
    case KIND.primary:
      return {
        color: $theme.colors.buttonPrimaryText,
        backgroundColor: $isSelected
          ? $theme.colors.buttonPrimaryHover
          : $theme.colors.buttonPrimaryFill,
        ":hover": {
          backgroundColor: $isLoading
            ? $theme.colors.buttonPrimaryFill
            : $theme.colors.buttonPrimaryHover
        },
        ":focus": {
          backgroundColor: $isLoading
            ? $theme.colors.buttonPrimaryActive
            : $theme.colors.buttonPrimaryHover
        },
        ":active": {
          backgroundColor: $theme.colors.buttonPrimaryActive
        }
      };
    case KIND.secondary:
      return {
        color: $theme.colors.buttonSecondaryText,
        backgroundColor: $isSelected
          ? $theme.colors.buttonSecondaryHover
          : $theme.colors.buttonSecondaryFill,
        ":hover": {
          backgroundColor: $isLoading
            ? $theme.colors.buttonSecondaryActive
            : $theme.colors.buttonSecondaryHover
        },
        ":focus": {
          backgroundColor: $isLoading
            ? $theme.colors.buttonSecondaryActive
            : $theme.colors.buttonSecondaryHover
        },
        ":active": {
          backgroundColor: $theme.colors.buttonSecondaryActive
        }
      };
    case KIND.tertiary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonTertiarySelectedText,
          backgroundColor: $theme.colors.buttonTertiarySelectedFill
        };
      } else {
        return {
          color: $theme.colors.buttonTertiaryText,
          backgroundColor: $theme.colors.buttonTertiaryFill,
          ":hover": {
            backgroundColor: $isLoading
              ? $theme.colors.buttonTertiaryActive
              : $theme.colors.buttonTertiaryHover
          },
          ":focus": {
            backgroundColor: $isLoading
              ? $theme.colors.buttonTertiaryActive
              : $theme.colors.buttonTertiaryHover
          },
          ":active": {
            backgroundColor: $theme.colors.buttonTertiaryActive
          }
        };
      }
    case KIND.minimal:
      return {
        color: $theme.colors.buttonMinimalText,
        backgroundColor: $isSelected
          ? $theme.colors.buttonMinimalHover
          : $theme.colors.buttonMinimalFill,
        ":hover": {
          backgroundColor: $isLoading
            ? $theme.colors.buttonMinimalActive
            : $theme.colors.buttonMinimalHover
        },
        ":focus": {
          backgroundColor: $isLoading
            ? $theme.colors.buttonMinimalActive
            : $theme.colors.buttonMinimalHover
        },
        ":active": {
          backgroundColor: $theme.colors.buttonMinimalActive
        }
      };
    default:
      return {};
  }
}
