import { ButtonState } from "./button_state";

describe('flip, macro, remapがundefined', () => {
  it('全部falseを返す', () => {
    const buttonState = new ButtonState("y");

    expect(buttonState.isDisabledFlip()).toBe(true);
    expect(buttonState.isAlwaysFlip()).toBe(false);
    expect(buttonState.isFlipIfPressedSelf()).toBe(false);
    expect(buttonState.isFlipIfPressedSomeButtons()).toBe(false);
    expect(buttonState.hasFlipSetting()).toBe(false);
    expect(buttonState.isRemap()).toBe(false);
  })
});

describe('flipに値がある時', () => {
  describe('enableがtrueの時', () => {
    describe('if_pressedがundefinedの時', () => {
      it('isAlwaysFlip()がtrueを返す', () => {
        const buttonState = new ButtonState("y", { if_pressed: undefined, enable: true });
        expect(buttonState.isDisabledFlip()).toBe(false);
        expect(buttonState.isAlwaysFlip()).toBe(true);
        expect(buttonState.isFlipIfPressedSelf()).toBe(false);
        expect(buttonState.isFlipIfPressedSomeButtons()).toBe(false);
        expect(buttonState.hasFlipSetting()).toBe(true);
        expect(buttonState.isRemap()).toBe(false);
      })
    })
    describe('if_pressedが空配列の時', () => {
      it('isAlwaysFlip()がtrueを返す', () => {
        const buttonState = new ButtonState("y", { if_pressed: [], enable: true });
        expect(buttonState.isDisabledFlip()).toBe(false);
        expect(buttonState.isAlwaysFlip()).toBe(true);
        expect(buttonState.isFlipIfPressedSelf()).toBe(false);
        expect(buttonState.isFlipIfPressedSomeButtons()).toBe(false);
        expect(buttonState.hasFlipSetting()).toBe(true);
        expect(buttonState.isRemap()).toBe(false);
      })
    })
    describe('if_pressedに2つの値が入っている時', () => {
      it('isFlipIfPressedSomeButtons()がtrueを返す', () => {
        const buttonState = new ButtonState("y", { if_pressed: ["l", "zr"], enable: true });
        expect(buttonState.isDisabledFlip()).toBe(false);
        expect(buttonState.isAlwaysFlip()).toBe(false);
        expect(buttonState.isFlipIfPressedSelf()).toBe(false);
        expect(buttonState.isFlipIfPressedSomeButtons()).toBe(true);
        expect(buttonState.hasFlipSetting()).toBe(true);
        expect(buttonState.isRemap()).toBe(false);
      })
    })
    describe('if_pressedに1つの値が入っている時', () => {
      it('isFlipIfPressedSomeButtons()がtrueを返す', () => {
        const buttonState = new ButtonState("y", { if_pressed: ["l"], enable: true });
        expect(buttonState.isDisabledFlip()).toBe(false);
        expect(buttonState.isAlwaysFlip()).toBe(false);
        expect(buttonState.isFlipIfPressedSelf()).toBe(false);
        expect(buttonState.isFlipIfPressedSomeButtons()).toBe(true);
        expect(buttonState.hasFlipSetting()).toBe(true);
        expect(buttonState.isRemap()).toBe(false);
      })
    })
    describe('if_pressedにbuttonと同じ1つの値が入っている時', () => {
      it('isFlipIfPressedSelf()がtrueを返す', () => {
        const buttonState = new ButtonState("y", { if_pressed: ["y"], enable: true });
        expect(buttonState.isDisabledFlip()).toBe(false);
        expect(buttonState.isAlwaysFlip()).toBe(false);
        expect(buttonState.isFlipIfPressedSelf()).toBe(true);
        expect(buttonState.isFlipIfPressedSomeButtons()).toBe(false);
        expect(buttonState.hasFlipSetting()).toBe(true);
        expect(buttonState.isRemap()).toBe(false);
      })
    })
  })

  describe('enableがfalseの時', () => {
    it('isDisabledFlip()がfalseを返す', () => {
      const buttonState = new ButtonState("y", { if_pressed: [], enable: false });
      expect(buttonState.isDisabledFlip()).toBe(true);
      expect(buttonState.isAlwaysFlip()).toBe(false);
      expect(buttonState.isFlipIfPressedSelf()).toBe(false);
      expect(buttonState.isFlipIfPressedSomeButtons()).toBe(false);
      expect(buttonState.hasFlipSetting()).toBe(false);
      expect(buttonState.isRemap()).toBe(false);
    })
  })
});

describe('remapに値がある時', () => {
  describe("flipに無効な値がある", () => {
    it('isRemap()がtrueを返す', () => {
      const buttonState = new ButtonState("y", { if_pressed: [], enable: false }, { to: ["y"] });
      expect(buttonState.isDisabledFlip()).toBe(true);
      expect(buttonState.isAlwaysFlip()).toBe(false);
      expect(buttonState.isFlipIfPressedSelf()).toBe(false);
      expect(buttonState.isFlipIfPressedSomeButtons()).toBe(false);
      expect(buttonState.hasFlipSetting()).toBe(false);
      expect(buttonState.isRemap()).toBe(true);
    })
  })
  describe("flipがundefined", () => {
    it('isRemap()がtrueを返す', () => {
      const buttonState = new ButtonState("y", undefined, { to: ["y"] });
      expect(buttonState.isDisabledFlip()).toBe(true);
      expect(buttonState.isAlwaysFlip()).toBe(false);
      expect(buttonState.isFlipIfPressedSelf()).toBe(false);
      expect(buttonState.isFlipIfPressedSomeButtons()).toBe(false);
      expect(buttonState.hasFlipSetting()).toBe(false);
    })
  })
})
