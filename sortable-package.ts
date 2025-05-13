type SortablePackageData = {
	widthInCM: number;
	heightInCM: number;
	lengthInCM: number;
	weightInKG: number;
};

export class SortablePackage<T extends SortablePackageData> {
	private static readonly PACKAGE_DIMENSION_THRESHOLD = 150;
	private static readonly PACKAGE_VOLUME_THRESHOLD = 1_000_000;

	private static isBulky(inputPackage: SortablePackageData) {
		return (
			inputPackage.widthInCM >= SortablePackage.PACKAGE_DIMENSION_THRESHOLD ||
			inputPackage.heightInCM >= SortablePackage.PACKAGE_DIMENSION_THRESHOLD ||
			inputPackage.lengthInCM >= SortablePackage.PACKAGE_DIMENSION_THRESHOLD ||
			SortablePackage.calculateVolume(inputPackage) >=
				SortablePackage.PACKAGE_VOLUME_THRESHOLD
		);
	}

	private static calculateVolume(inputPackage: SortablePackageData) {
		return (
			inputPackage.widthInCM * inputPackage.heightInCM * inputPackage.lengthInCM
		);
	}
	private static readonly PACKAGE_WEIGHT_THRESHOLD = 20;
	private static isHeavy(inputPackage: SortablePackageData) {
		return inputPackage.weightInKG >= SortablePackage.PACKAGE_WEIGHT_THRESHOLD;
	}

	private static getSortPile(
		inputPackage: SortablePackageData,
	): "standard" | "special" | "rejected" {
		const isBulky = SortablePackage.isBulky(inputPackage);
		const isHeavy = SortablePackage.isHeavy(inputPackage);

		if (isBulky && isHeavy) {
			return "rejected";
		}
		if (isBulky || isHeavy) {
			return "special";
		}
		return "standard";
	}

	private data: T;
	constructor(data: T) {
		if (
			data.widthInCM <= 0 ||
			data.heightInCM <= 0 ||
			data.lengthInCM <= 0 ||
			data.weightInKG <= 0
		) {
			throw new Error("Invalid package data");
		}
		this.data = data;
	}

	public getSortPile() {
		return SortablePackage.getSortPile(this.data);
	}
}

export class SortablePackageDispatchContext<T extends SortablePackageData> {
	private standardPackages: SortablePackage<T>[] = [];
	private specialPackages: SortablePackage<T>[] = [];
	private rejectedPackages: SortablePackage<T>[] = [];

	public addPackage(inputPackage: SortablePackage<T>) {
		const sortPile = inputPackage.getSortPile();
		switch (sortPile) {
			case "standard":
				this.standardPackages.push(inputPackage);
				break;
			case "special":
				this.specialPackages.push(inputPackage);
				break;
			case "rejected":
				this.rejectedPackages.push(inputPackage);
				break;
		}
	}
}
