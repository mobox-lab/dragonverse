export class UIUtils {

    /**
     * 无限制移动UI中心点到鼠标位置随鼠标
     * @param node 需要移动的UI
     */
    public static moveFree(node: mw.Widget) {
        const viewport = mw.getMousePositionOnViewport().clone();
        const movePos = this.viewport2LocalUpperLeft(node, viewport);
        node.position = (mw.Vector2.subtract(
            // 保持点击点是按钮的中点
            movePos, node.size.clone().divide(2)
        ));
    }

    /**
     * 限制父布局位置与X轴计算UI中心点到鼠标位置随鼠标
     * @param node 需要移动的UI
     * @return 移动后位置在父布局比（0~1）
     */
    public static moveXInParent(node: mw.Widget) {
        const parent = node.parent;
        const viewport = mw.getMousePositionOnViewport().clone();
        const movePos = this.viewport2LocalUpperLeft(node, viewport);
        movePos.y = node.position.y;
        movePos.x -= node.size.x / 2;
        const halfX = node.size.x / 2;
        // 范围限制
        if (movePos.x < -halfX) {
            movePos.x = -halfX
        } else if (movePos.x > parent.size.x - halfX) {
            movePos.x = parent.size.x - halfX;
        }
        node.position = movePos;
        return (movePos.x + halfX) / parent.size.x
    }

    /**
     * 屏幕坐标转换为相对坐标（实验性）
     * @param node 转换节点
     * @param viewport 窗口坐标
     * @returns 转换后坐标
     */
    public static viewport2LocalUpperLeft(node: mw.Widget, viewport: mw.Vector2) {
        // 父节点集位置求取
        let parentsPos = new mw.Vector2();
        let parentNode = node.parent
        while (parentNode) {
            parentsPos.add(parentNode.position.clone());
            parentNode = parentNode.parent;
        }
        return viewport.subtract(parentsPos);
    }
}