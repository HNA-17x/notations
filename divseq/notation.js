class notation {
	static title = "divseq";

	static lessOrEqual(a, b) {
		for (let i = 0; i < a.length; i++) {
			if (i >= b.length) return false;
			if (a[i] != b[i]) return a[i] < b[i];
		}
		return a.length <= b.length;
	}

	static expandLimit(n) {
		return [0, n+1];
	}

	static expand(a, n) {
		function parent(ind) {
			return a.findLastIndex((v, i) => v == 0 || (i < ind && v < a[ind]));
		}
		let length = a.length;
		let root = parent(length - 1);
		let cutNode = a.pop();
		while (root > 0) {
			let p = parent(root);
			// (cutNode - a[p])/(length - p) < (cutNode - a[root])/(length - root)
			if ((cutNode - a[p])*(length - root) < (cutNode - a[root])*(length - p)) break;
			root = p;
		}
		let delta = cutNode - a[root] - 1;
		let badPart = a.slice(root);
		for (let i = 1; i <= n; i++) {
			a = a.concat(badPart.map(v => v + delta*i));
		}
		return a;
	}

	static isSuccessor(array) {
		return array.length == 0 || array.at(-1) == 0;
	}

	static toString(array) {
		return JSON.stringify(array).slice(1,-1);
	}

	static fromString(s) {
		return JSON.parse("["+s+"]");
	}
};