import search from './a-star';

class Node {
    constructor(val) {
        this.adjacency = () => [];
        this.value = val;
    }
};

class Path {
    constructor(target, weight) {
        this.target = target;
        this.weight = weight;
    }
}

const S = new Node('S');
const A = new Node('A');
const B = new Node('B');
const C = new Node('C');
const D = new Node('D');
const E = new Node('E');
const F = new Node('F');
const G = new Node('G');

const e = new WeakMap();

e.set(S, 0).set(A, Infinity).set(B, Infinity).set(C, Infinity)
    .set(D, Infinity).set(E, Infinity).set(F, Infinity).set(G, Infinity);

S.adjacency = () => [new Path(A, 6), new Path(B, 5), new Path(C, 10)];
A.adjacency = () => [new Path(S, 6), new Path(E, 6)];
B.adjacency = () => [new Path(S, 5), new Path(E, 6), new Path(D, 7)];
C.adjacency = () => [new Path(S, 10), new Path(D, 6)];
D.adjacency = () => [new Path(C, 6), new Path(B, 7), new Path(F, 6)];
E.adjacency = () => [new Path(A, 6), new Path(B, 6), new Path(F, 4)];
F.adjacency = () => [new Path(E, 4), new Path(D, 6), new Path(G, 3)];
G.adjacency = () => [new Path(F, 3)];

const h_star = (n) => {
    if (n === S) return 17;
    if (n === A) return 10;
    if (n === B) return 13;
    if (n === C) return 4;
    if (n === D) return 2;
    if (n === E) return 4;
    if (n === F) return 1;
    if (n === G) return 0;
};
const path = new WeakMap();

console.log(search(h_star, e, S, [G], path));


let x = path.get(G);
while (x != S) {
    console.log(x);
    x = path.get(x);
}
