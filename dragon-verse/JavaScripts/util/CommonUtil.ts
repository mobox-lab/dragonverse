



/**
 * 数组转换成旋转
 * @param rot 
 */
export function arrayToRot(rot: number[]): mw.Rotation {
    if (rot.length < 3) return mw.Rotation.zero;
    return new mw.Rotation(rot[0], rot[1], rot[2]);
}


/**
 * 数组转换成向量
 * @param rot 
 */
export function arrayToVec(vec: number[]): mw.Vector {
    if (vec.length < 3) return mw.Vector.zero;
    return new mw.Vector(vec[0], vec[1], vec[2]);
}