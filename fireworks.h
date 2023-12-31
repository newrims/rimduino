
const uint32_t fireworks[][4] = {
	{
		0x0,
		0x0,
		0x100,
		1
	},
	{
		0x0,
		0x0,
		0x100100,
		2
	},
	{
		0x0,
		0x1,
		0x100100,
		3
	},
	{
		0x0,
		0x1001,
		0x100100,
		4
	},
	{
		0x10,
		0x2801001,
		0x100000,
		5
	},
	{
		0x10,
		0x2801001,
		0x0,
		6
	},
	{
		0x10,
		0x2801000,
		0x0,
		7
	},
	{
		0x38,
		0x2803800,
		0x0,
		8
	},
	{
		0x38054,
		0x6c05403,
		0x80000000,
		9
	},
	{
		0x10010,
		0x6c01001,
		0x4,
		10
	},
	{
		0x10038054,
		0xee05403,
		0x80104004,
		11
	},
	{
		0x10028054,
		0xaa05402,
		0x84104000,
		66
	},
	{
		0x10028044,
		0x8204442,
		0x84100000,
		66
	},
	{
		0x1006c044,
		0x82444a6,
		0xc4100000,
		66
	},
	{
		0x38044082,
		0x82e82a4,
		0x4e380000,
		66
	},
	{
		0x10044000,
		0xe93501b4,
		0x5510e000,
		66
	},
	{
		0x10000000,
		0x492401b0,
		0x4104000,
		66
	},
	{
		0x10000400,
		0xe83503b0,
		0x1510e004,
		12
	},
	{
		0x0,
		0xa01500a0,
		0x1500a000,
		13
	},
	{
		0x1,
		0xb01500a0,
		0x1501b000,
		14
	},
	{
		0x401,
		0xb0110200,
		0x1101b204,
		15
	},
	{
		0xe01,
		0x10200200,
		0x2021120e,
		16
	},
	{
		0x401,
		0x10000242,
		0x211004,
		66
	},
	{
		0x400,
		0x2242,
		0x4,
		66
	},
	{
		0x400,
		0x2002200,
		0x4,
		66
	},
	{
		0x20,
		0x2000000,
		0x0,
		66
	},
	{
		0x20050020,
		0x2000000,
		0x0,
		66
	},
	{
		0x70050070,
		0x0,
		0x20,
		66
	},
	{
		0x50000050,
		0x0,
		0x20020,
		66
	},
	{
		0x50088050,
		0x2000000,
		0x20020000,
		66
	},
	{
		0x88000,
		0x2000200,
		0x20000000,
		25
	},
	{
		0x0,
		0x200200,
		0x0,
		26
	},
	{
		0x2005,
		0x200000,
		0x0,
		66
	},
	{
		0x700a80d,
		0x80a80700,
		0x0,
		66
	},
	{
		0x7008808,
		0x80880700,
		0x0,
		66
	},
	{
		0x7008818,
		0xc0880700,
		0x20000000,
		66
	},
	{
		0x500d812,
		0x40d80500,
		0x20000000,
		66
	},
	{
		0x1542da32,
		0x62da1540,
		0xa8020000,
		32
	},
	{
		0x15428a12,
		0x428a1540,
		0xa8400000,
		33
	},
	{
		0x10420210,
		0x42021044,
		0xa8e00400,
		34
	},
	{
		0x10400020,
		0x20001044,
		0x88e20400,
		35
	},
	{
		0x0,
		0x20002000,
		0x0,
		36
	},
	{
		0x200,
		0x72027002,
		0x0,
		37
	},
	{
		0x200200,
		0xf0022020,
		0x0,
		38
	},
	{
		0x10200,
		0x70020000,
		0x20000,
		66
	},
	{
		0x10038010,
		0x20000000,
		0x20070020,
		66
	},
	{
		0x10000,
		0x40000,
		0x50420050,
		66
	},
	{
		0x10,
		0x400e0044,
		0x50e00450,
		39
	},
	{
		0x10038,
		0x1044004,
		0xf20400,
		40
	},
	{
		0x100010,
		0x4,
		0xe00400,
		41
	},
	{
		0x200,
		0x40000000,
		0x400000,
		66
	},
	{
		0x4000000,
		0x40080000,
		0x0,
		42
	},
	{
		0x4008000,
		0x80100,
		0x0,
		66
	},
	{
		0x808010,
		0x100,
		0x20000000,
		66
	},
	{
		0x801110,
		0x2000000,
		0x20040000,
		66
	},
	{
		0x1102,
		0x22004000,
		0x40080,
		66
	},
	{
		0x2,
		0x20404000,
		0x80,
		66
	},
	{
		0x200,
		0x7442e004,
		0x801c0,
		66
	},
	{
		0x20000040,
		0x2440f004,
		0x1400080,
		66
	},
	{
		0x21040000,
		0x400e004,
		0x1002000,
		66
	},
	{
		0x1042180,
		0x4000,
		0x2004,
		66
	},
	{
		0x2184,
		0x20000000,
		0x4,
		52
	},
	{
		0x4,
		0x20840000,
		0x0,
		53
	},
	{
		0x0,
		0x840000,
		0x0,
		66
	},
	{
		0x40000008,
		0x41ce0840,
		0x801,
		66
	},
	{
		0xe0040400,
		0x409f0040,
		0x4821c03,
		66
	},
	{
		0xf1040040,
		0x400e1040,
		0x20070821,
		66
	},
	{
		0xe3849000,
		0x1043a01,
		0x214f8020,
		66
	},
	{
		0x4901c208,
		0x400e1054,
		0x23e71420,
		54
	},
	{
		0x208700,
		0x20050010,
		0x7421001,
		55
	},
	{
		0x200,
		0x10,
		0x3001000,
		56
	},
	{
		0x0,
		0x0,
		0x1000000,
		56
	},
	{
		0x0,
		0x0,
		0x20,
		66
	},
	{
		0x0,
		0x0,
		0x20020,
		66
	},
	{
		0x0,
		0x0,
		0x20020020,
		66
	},
	{
		0x0,
		0x200,
		0x20020000,
		66
	},
	{
		0x0,
		0x200200,
		0x20000000,
		66
	},
	{
		0x2,
		0x700200,
		0x0,
		66
	},
	{
		0x500a,
		0x80700a80,
		0x50000000,
		66
	},
	{
		0xa815408,
		0x81040881,
		0x540a8000,
		66
	},
	{
		0xa810420,
		0x21042021,
		0x40a8050,
		66
	},
	{
		0x8800020,
		0x20002020,
		0x88020,
		66
	},
	{
		0x28a40120,
		0x24212024,
		0x128a124,
		66
	},
	{
		0x60340185,
		0x4218504,
		0x1603104,
		66
	},
	{
		0x80207108,
		0x88a90880,
		0x71802404,
		66
	},
	{
		0x18c17408,
		0x828a0881,
		0x7418c020,
		66
	},
	{
		0x8810400,
		0x2020001,
		0x4088020,
		66
	},
	{
		0x505a0200,
		0x8008000,
		0xa02505,
		66
	},
	{
		0x40180000,
		0x8008000,
		0x800401,
		66
	},
	{
		0x0,
		0x0,
		0x100,
		66
	},
	{
		0x0,
		0x0,
		0x100102,
		72
	},
	{
		0x0,
		0x1,
		0x102122,
		73
	},
	{
		0x0,
		0x1001,
		0x2122020,
		74
	},
	{
		0x0,
		0x1001021,
		0x22020000,
		75
	},
	{
		0x10,
		0x1021520,
		0x70020000,
		76
	},
	{
		0x28038,
		0x51071520,
		0xf8070020,
		77
	},
	{
		0x2807c,
		0x538f1578,
		0x72020000,
		78
	},
	{
		0x29038,
		0x5107852c,
		0x20a82101,
		79
	},
	{
		0x10,
		0x500f0078,
		0x22000100,
		80
	},
	{
		0x80001000,
		0x22074228,
		0x70520380,
		81
	},
	{
		0x10220,
		0x270fa52c,
		0x22850100,
		82
	},
	{
		0x0,
		0x22070228,
		0x70120380,
		66
	},
	{
		0x0,
		0x2020008,
		0x20000100,
		83
	}
};
