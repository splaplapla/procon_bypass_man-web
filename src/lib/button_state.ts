import { Button } from "../types/button";

export class ButtonState {
  constructor(button: Button) {
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
