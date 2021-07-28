import { Button } from "../types/button";

export const flip_types = ["disable", "always", "ifPress"] as const;
export type FlipType = typeof flip_types[number];

export class ButtonState {
  button: Button;
  open: boolean;
  flipType: FlipType;
  ifPressButtons: Array<Button>;

  constructor(button: Button, open: boolean) {
    this.button = button;
    this.open = open;
    this.flipType = "disable"
    this.ifPressButtons = []
  };

  openMenu() {
  }

  beDisableFlip() {
  }

  beAlwaysFlip() {
  }

  beAlwaysFlipIfPressSelf(button: Button) {
  }

  beAlwaysFlipIfPressButtons(buttons: Array<Button>) {
  }

  isDisabledFlip() {
  }

  isAlwaysFlip() {
  }

  isFlipIfPressedSelf() {
  }
  isFlipIfPressedSomeButtons() {
  }
}
