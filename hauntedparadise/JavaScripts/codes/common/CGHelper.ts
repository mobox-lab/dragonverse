InputUtil.onKeyDown(Keys.Enter, () => {
    UIService.setAllMiddleAndBottomPanelVisible(false);
});

InputUtil.onKeyDown(Keys.RightControl, () => {
    UIService.setAllMiddleAndBottomPanelVisible(true);
});