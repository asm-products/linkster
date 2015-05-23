/// <reference path="tsd.d.ts" />

module linkster.checks {
	export function MaxLengthString(maxLength: number) {
		return Match.Where ((x: string) => {
			check(x, String);
			return x.length <= maxLength;
		});
	}
	
	export function MinLengthString(minLength: number) {
		return Match.Where ((x: string) => {
			check(x, String);
			return x.length >= minLength;
		});
	}
	
	export function MinAndMaxLengthString(minLength: number, maxLength: number) {
		return Match.Where((x: string) => {
			check(x, String);
			return x.length >= minLength && x.length <= maxLength;
		});
	}
	
	export var NonEmptyString = MinLengthString(1);
	
	export function NonEmptyAndMaxLengthString(maxLength: number) {
		return MinAndMaxLengthString(1, maxLength);
	}
	
	export var FolderName = NonEmptyAndMaxLengthString(50);
}