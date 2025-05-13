import { describe, expect, test } from "bun:test";
import {
	SortablePackage,
	SortablePackageDispatchContext,
} from "./sortable-package";

describe("SortablePackage", () => {
	// Core functionality tests
	describe("Core functionality", () => {
		test("should correctly identify standard packages", () => {
			const package1 = new SortablePackage({
				widthInCM: 100,
				heightInCM: 50,
				lengthInCM: 30,
				weightInKG: 10,
			});

			expect(package1.getSortPile()).toBe("standard");
		});

		test("should correctly identify bulky packages (dimension)", () => {
			const package1 = new SortablePackage({
				widthInCM: 151,
				heightInCM: 50,
				lengthInCM: 30,
				weightInKG: 10,
			});

			expect(package1.getSortPile()).toBe("special");
		});

		test("should correctly identify bulky packages (volume)", () => {
			const package1 = new SortablePackage({
				widthInCM: 100,
				heightInCM: 100,
				lengthInCM: 100,
				weightInKG: 10,
			});

			expect(package1.getSortPile()).toBe("special");
		});

		test("should correctly identify heavy packages", () => {
			const package1 = new SortablePackage({
				widthInCM: 50,
				heightInCM: 50,
				lengthInCM: 50,
				weightInKG: 25,
			});

			expect(package1.getSortPile()).toBe("special");
		});

		test("should correctly identify rejected packages (both bulky and heavy)", () => {
			const package1 = new SortablePackage({
				widthInCM: 151,
				heightInCM: 50,
				lengthInCM: 30,
				weightInKG: 25,
			});

			expect(package1.getSortPile()).toBe("rejected");
		});
	});

	// Edge cases tests
	describe("Edge cases", () => {
		test("should throw error for zero dimensions", () => {
			expect(
				() =>
					new SortablePackage({
						widthInCM: 0,
						heightInCM: 50,
						lengthInCM: 30,
						weightInKG: 10,
					}),
			).toThrow("Invalid package data");
		});

		test("should throw error for negative dimensions", () => {
			expect(
				() =>
					new SortablePackage({
						widthInCM: -10,
						heightInCM: 50,
						lengthInCM: 30,
						weightInKG: 10,
					}),
			).toThrow("Invalid package data");
		});

		test("should throw error for zero weight", () => {
			expect(
				() =>
					new SortablePackage({
						widthInCM: 50,
						heightInCM: 50,
						lengthInCM: 30,
						weightInKG: 0,
					}),
			).toThrow("Invalid package data");
		});

		test("should throw error for negative weight", () => {
			expect(
				() =>
					new SortablePackage({
						widthInCM: 50,
						heightInCM: 50,
						lengthInCM: 30,
						weightInKG: -5,
					}),
			).toThrow("Invalid package data");
		});

		test("should handle threshold boundary values correctly (dimension)", () => {
			const packageAtThreshold = new SortablePackage({
				widthInCM: 150,
				heightInCM: 50,
				lengthInCM: 30,
				weightInKG: 10,
			});

			expect(packageAtThreshold.getSortPile()).toBe("special");
		});

		test("should handle threshold boundary values correctly (weight)", () => {
			const packageAtThreshold = new SortablePackage({
				widthInCM: 50,
				heightInCM: 50,
				lengthInCM: 30,
				weightInKG: 20,
			});

			expect(packageAtThreshold.getSortPile()).toBe("special");
		});

		test("should handle threshold boundary values correctly (volume)", () => {
			// Creating a package with exactly 1,000,000 cm³ volume
			const packageAtThreshold = new SortablePackage({
				widthInCM: 100,
				heightInCM: 100,
				lengthInCM: 100,
				weightInKG: 10,
			});

			expect(packageAtThreshold.getSortPile()).toBe("special");
		});
	});
});

describe("SortablePackageDispatchContext", () => {
	test("should correctly sort packages into appropriate piles", () => {
		const dispatchContext = new SortablePackageDispatchContext();

		const standardPackage = new SortablePackage({
			widthInCM: 50,
			heightInCM: 50,
			lengthInCM: 50,
			weightInKG: 10,
		});

		const specialPackage = new SortablePackage({
			widthInCM: 160,
			heightInCM: 50,
			lengthInCM: 50,
			weightInKG: 10,
		});

		const rejectedPackage = new SortablePackage({
			widthInCM: 160,
			heightInCM: 50,
			lengthInCM: 50,
			weightInKG: 25,
		});

		dispatchContext.addPackage(standardPackage);
		dispatchContext.addPackage(specialPackage);
		dispatchContext.addPackage(rejectedPackage);

		// Note: We'd need getters in the class to properly test this
		// This test is incomplete without a way to check the contents of each pile
	});
});
