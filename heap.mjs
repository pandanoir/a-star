export default class Heap {
    constructor(comp = (a, b) => a - b) {
        // デフォルトでは最小ヒープ
        this.heap = [];
        this.index = new Map();
        this.comp = comp;
    }
    push(val) {
        // 末尾に追加してup-heapする
        const index = this.heap.length;
        this.heap[index] = val;
        this.index.set(val, index);
        this._upHeap(index);
    }
    pop() {
        // 末尾の要素を先頭に持ってきてdown-heapする
        const res = this.top();
        this.index.set(res, Infinity);
        this.heap[0] = this.heap[this.heap.length - 1];
        this._downHeap(0);
        return res;
    }
    has(val) {
        return this.index.has(val) && this.index.get(val) !== Infinity;
    }
    delete(val) {
        const index = this.index.get(val);
        this.index.set(val, Infinity);

        if (this.heap.length - 1 === index) {
            // 削除する要素が末尾の要素だったら、削除して終了
            this.heap.length -= 1;
            return;
        }
        // 末尾の要素で穴を埋める
        const last = this.heap[this.heap.length - 1]; // 末尾
        this.heap[index] = last;
        this.heap.length -= 1;
        this.index.set(last, index);

        this._downHeap(index);
        if (this.heap[index] !== last)
            this._upHeap(index); // down-heapが起きなかったのでup-heapする
    }
    top() {
        return this.heap[0];
    }
    get size() {
        return this.heap.length;
    }
    _downHeap(index) {
        // indexの位置にある要素を起点にdown-heapする
        const x = this.heap[index];
        let k = index;
        while (k*2 + 1 < this.size) {
            let a = k*2 + 1;
            const b = k*2 + 2;
            if (b < this.size && this.comp(this.heap[b], this.heap[a]) < 0)
                a = b; // 子のうち小さい方を選択
            if (this.comp(x, this.heap[a]) <= 0)
                break; // 着目ノード <= 子ノードとなり条件を満たしている

            this.index.set(this.heap[a], k);
            this.heap[k] = this.heap[a];
            k = a;
        }
        this.index.set(x, k);
        this.heap[k] = x;
    }
    _upHeap(index) {
        // indexの位置にある要素を起点にup-heapする
        let k = index;
        const val = this.heap[k];
        while (0 < k) {
            const parent = Math.floor((k-1) / 2);
            if (this.comp(this.heap[parent], val) <= 0)
                break; // 親ノード <= 着目ノード
            this.index.set(this.heap[parent], k);
            this.heap[k] = this.heap[parent];
            k = parent;
        }
        this.index.set(val, k);
        this.heap[k] = val;
    }
}
