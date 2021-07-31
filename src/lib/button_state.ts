import { Button } from "../types/button";
import { Flip, Macro, Remap } from "../types/buttons_setting_type";

export const flip_types = ["disable", "always", "ifPress"] as const;
export type FlipType = typeof flip_types[number];

// (1) menuへの開閉には関与しない
//     開閉するとrenderが必要になっていて、contextを変更する必要があるから
export class ButtonState {
  button: Button;
  flip?: Flip;
  macro?: Macro;
  remap?: Remap;

  constructor(button: Button, flip?: Flip, macro?: Macro, remap?: Remap) {
    this.button = button;
    this.flip = flip;
    this.macro = macro;
    this.remap = remap;
  };

  isDisabledFlip(): boolean {
    if(!this.flip) { return false }
    return this.flip && !this.flip?.enable;
  }

  isAlwaysFlip(): boolean {
    if(this.isDisabledFlip()) { return false };
    return this.flip?.if_pressed?.length === 0;
  }

  isFlipIfPressedSelf(): boolean {
    if(this.isDisabledFlip() || this.isAlwaysFlip() || !this.flip || !this.flip.if_pressed) { return false }
    return this.flip.if_pressed.length === 1 && this.flip.if_pressed[0] === this.button;
  }

  isFlipIfPressedSomeButtons(): boolean {
    if(this.isDisabledFlip() || this.isAlwaysFlip() || this.isFlipIfPressedSelf()) { return false }
    return true;
  }
}
