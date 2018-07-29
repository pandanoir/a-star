import Heap from './heap';

export default (h, _e, S, Gs, via = new WeakMap()) => {
    const e = n => _e.has(n) ? _e.get(n) : _e.defaultValue;
    const f = n => h(n) + e(n);
    const queue = new Heap((a, b) => {
        const res = f(a) - f(b);
        if (res === 0) return e(a) - e(b);
        return res;
    });
    S.visited = true;

    for (const path of S.adjacency()) {
        _e.set(path.target, path.weight);
        queue.push(path.target);
        via.set(path.target, S);
    }
    while (queue.size != 0) {
        const target = queue.pop();
        target.visited = true;
        if (Gs.includes(target)) return f(target);
        for (const path of target.adjacency()) {
            // 隣接しているノードのうち
            // * まだ訪れていない
            // * 以前訪れたときよりf(n)の値が小さい
            // いずれかならキューへ
            if (!(!path.target.visited || path.weight + e(target) < e(path.target))) continue;
            if (queue.has(path.target)) queue.delete(path.target);
            path.target.visited = false;
            if (path.weight + e(target) < e(path.target)) {
                _e.set(path.target, path.weight + e(target));
                via.set(path.target, target);
            }
            queue.push(path.target);
        }
    }
    return null;
}
