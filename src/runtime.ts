export class JavaRuntime {
	static CastI(value: number) { return value | 0; }
	static ConvertIC(value: number) { return (value & 0xFFFF) >>> 0; }
	static ConvertIS(value: number) { return (value & 0xFFFF) | 0; } // @CHECK
	static arraylength(value: any[]) { return value.length; }
}

global['JavaRuntime'] = JavaRuntime;
