import search from './a-star';

const map = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];
const width = map[0].length;
const height = map.length;

const pool = [];
class Node {
    constructor(x, y) {
        if (!pool[x]) pool[x] = [];
        if (pool[x][y]) return pool[x][y];
        this.x = x;
        this.y = y;
        this.adjacency = () => {
            const res = []; // [Node, Node, ...]
            for (let dx = -1; dx <= 1; dx++) {
                if (width <= x + dx || x + dx < 0) continue; // はみ出したとき
                for (let dy = -1; dy <= 1; dy++) {
                    if (height <= y + dy || y + dy < 0) continue; // はみ出したとき
                    if (dx == 0 && dy == 0) continue;
                    if (map[y + dy][x + dx] == 0)
                        res.push( new Path(new Node(x+dx, y+dy), Math.sqrt(dx**2 + dy**2)) );
                }
            }
            return res;
        };
        pool[x][y] = this;
    }
};
class Path {
    constructor(target, weight) {
        this.target = target;
        this.weight = weight;
    }
}


const S = new Node(1, 1), G = new Node(4, 4);
const e = new WeakMap();
e.defaultValue = Infinity;
e.set(S, 0);
const path = new WeakMap();
const h_star = (n) => Math.sqrt( (n.x-G.x)**2 + (n.y-G.y)**2 );

console.log(search(h_star, e, S, [G], path));

for (let x = 0; x < width; x++) {
    const res = [];
    for (let y = 0; y < height; y++) {
        res.push((e.get(new Node(x, y)) || 0).toFixed(2));
    }
    console.log(res.join('\t'));
}


let x = path.get(G);
while (x != S) {
    console.log(x);
    x = path.get(x);
}
