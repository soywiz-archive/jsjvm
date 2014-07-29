export class Convert {
	static CastI(value: number) { return value | 0; }
	static ConvertIC(value: number) { return (value & 0xFFFF) >>> 0; }
	static ConvertIS(value: number) { return (value & 0xFFFF) | 0; } // @CHECK
}

global['Convert'] = Convert;
