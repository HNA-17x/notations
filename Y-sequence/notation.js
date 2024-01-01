class notation {
	static title = "Y-sequence";

	static lessOrEqual(a, b) {
		for (let i = 0; i < a.length; i++) {
			if (i >= b.length) return false;
			if (a[i] != b[i]) return a[i] < b[i];
		}
		return a.length <= b.length;
	}

	static expandLimit(n) {
		return [1, n+2];
	}

	static expand(a, n) {
		return notation.fromString(expand(notation.toString(a), n, true));
	}

	static convertToNotation(value) {
		let str = value;
		if (settings.aliases) {
			let alias = findAlias(value);
			if (alias) {
				str += " = " + alias;
			}
		}
		return str;
	}

	static isSuccessor(array) {
		return array.length == 0 || array.at(-1) == 1;
	}

	static toString(array) {
		return JSON.stringify(array).slice(1, -1);
	}

	static fromString(s) {
		return JSON.parse("[" + s + "]");
	}
};

settings.aliases = true;

let Y_aliases = {
	["1,2,4"]: "ε₀",
	["1,2,4,2"]: "ε₀·ω",
	["1,2,4,2,4"]: "ε₀^2",
	["1,2,4,3"]: "ε₀^ω",
	["1,2,4,3,5"]: "ε₀^ε₀",
	["1,2,4,4"]: "ε₁",
	["1,2,4,5"]: "ε_ω",
	["1,2,4,5,7"]: "ε_ε₀",
	["1,2,4,6"]: "ζ₀",
	["1,2,4,6,6"]: "η₀",
	["1,2,4,6,7"]: "ϕ(ω,0)",
	["1,2,4,6,7,9"]: "ϕ(ε₀,0)",
	["1,2,4,6,7,9,11"]: "ϕ(ζ₀,0)",
	["1,2,4,6,8"]: "Γ₀",
	["1,2,4,6,8,9"]: "ψ₀(Ω^Ω^ω)",
	["1,2,4,6,8,10"]: "ψ₀(Ω^Ω^Ω)",
	["1,2,4,7"]: "ψ₀(Ω₂)",
	["1,2,4,7,7"]: "ψ₀(Ω₂·2)",
	["1,2,4,7,8"]: "ψ₀(Ω₂·ω)",
	["1,2,4,7,8,10"]: "ψ₀(Ω₂·ε₀)",
	["1,2,4,7,8,10,13"]: "ψ₀(Ω₂·ψ₀(Ω₂))",
	["1,2,4,7,9"]: "ψ₀(Ω₂·Ω)",
	["1,2,4,7,9,12"]: "ψ₀(Ω₂·ψ₁(Ω₂))",
	["1,2,4,7,10"]: "ψ₀(Ω₂^2)",
	["1,2,4,7,11"]: "ψ₀(Ω₃)",
	["1,2,4,8"]: "ψ₀(Ω_ω)",
	["1,2,4,8,7"]: "ψ₀(Ω_ω+Ω₂)",
	["1,2,4,8,7,12"]: "ψ₀(Ω_ω+ψ₂(Ω_ω))",
	["1,2,4,8,8"]: "ψ₀(Ω_ω·2)",
	["1,2,4,8,9"]: "ψ₀(Ω_ω·ω)",
	["1,2,4,8,9,11"]: "ψ₀(Ω_ω·ε₀)",
	["1,2,4,8,9,11,15"]: "ψ₀(Ω_ω·ψ₀(Ω_ω))",
	["1,2,4,8,10"]: "ψ₀(Ω_ω·Ω)",
	["1,2,4,8,10,14"]: "ψ₀(Ω_ω·ψ₁(Ω_ω))",
	["1,2,4,8,11"]: "ψ₀(Ω_ω·Ω₂)",
	["1,2,4,8,11,16"]: "ψ₀(Ω_{ω·2})",
	["1,2,4,8,12"]: "ψ₀(Ω_{ω²})",
	["1,2,4,8,12,14"]: "ψ₀(Ω_Ω)",
	["1,2,4,8,12,15"]: "ψ₀(Ω_Ω₂)",
	["1,2,4,8,12,15,9"]: "EBO",
	["1,2,4,8,12,15,19"]: "ψ₀(Ω_{I+1})",
	["1,2,4,8,12,15,20"]: "ψ₀(Ω_{I+ω})",
	["1,2,4,8,12,16"]: "ψ₀(I_ω)",
	["1,2,4,8,12,16,15"]: "ψ₀(I(Ω₂,0))",
	["1,2,4,8,12,16,15,19"]: "PTO(KPM)",
	["1,2,4,8,13"]: "1st Back Gear Ordinal",
	["1,2,4,8,13,20"]: "(0,0,0)(1,1,1)(2,2,0)(3,3,1)",
	["1,2,4,8,14"]: "(0,0,0)(1,1,1)(2,2,1)",
	["1,2,4,8,14,15"]: "Small Dropping Ordinal",
	["1,2,4,8,15"]: "Small Bashicu Ordinal",
	["1,2,4,8,16"]: "lim(TSS)",
	["1,2,4,8,16,32"]: "lim(QSS)",
	["1,3"]: "lim(BMS)",
};

function findAlias(value) {
	if (Y_aliases[value]) return Y_aliases[value];
}

document.addEventListener("DOMContentLoaded", () => {
	const aliasesCheckbox = document.getElementById("aliases");
	aliasesCheckbox.addEventListener('change', function() {
		settings.aliases = aliasesCheckbox.checked;
		refreshTerms();
	});
});