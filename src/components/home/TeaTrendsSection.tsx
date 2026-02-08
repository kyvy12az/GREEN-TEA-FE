import { TrendingUp, Users, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
import teaBackground from '@/assets/green-tea-leaves.jpg';

const comparisonData = [
    { category: 'Trà xanh', vietnam: 45, japan: 65 },
    { category: 'Matcha', vietnam: 15, japan: 55 },
    { category: 'Ô long', vietnam: 25, japan: 20 },
    { category: 'Trà túi lọc', vietnam: 35, japan: 30 },
    { category: 'Trà hoa', vietnam: 30, japan: 15 },
];

const teaTrendData = [
    { year: '2018', vietnam: 5.2, japan: 8.1 },
    { year: '2019', vietnam: 6.1, japan: 8.5 },
    { year: '2020', vietnam: 7.8, japan: 9.2 },
    { year: '2021', vietnam: 9.2, japan: 9.8 },
    { year: '2022', vietnam: 10.5, japan: 10.2 },
    { year: '2023', vietnam: 12.1, japan: 10.8 },
    { year: '2024', vietnam: 14.3, japan: 11.5 },
];

const stats = [
    {
        value: '175%',
        label: 'Tăng trưởng tiêu thụ trà xanh Việt Nam từ 2018-2024',
        icon: TrendingUp,
    },
    {
        value: '14.3',
        label: 'Triệu tấn trà tiêu thụ tại Việt Nam năm 2024',
        icon: Leaf,
    },
    {
        value: '68%',
        label: 'Người Việt uống trà mỗi ngày',
        icon: Users,
    },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl px-4 py-3 shadow-2xl">
            <p className="text-white font-semibold mb-2">{label}</p>

            <div className="space-y-1">
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm text-white/90">
                        <span className="inline-flex items-center gap-2">
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ background: entry.color }}
                            />
                            {entry.name}:
                        </span>{' '}
                        <span className="font-bold text-white">{entry.value}</span>
                        {entry.dataKey.includes('vietnam') || entry.dataKey.includes('japan')
                            ? ' triệu tấn'
                            : '%'}
                    </p>
                ))}
            </div>
        </div>
    );
};

export const TeaTrendsSection = () => {
    return (
        <section className="relative overflow-hidden py-16 md:py-24">
            {/* Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-[1.03]"
                    style={{ backgroundImage: `url(${teaBackground})` }}
                />

                {/* Làm ảnh rõ hơn (không bị chìm) */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Lớp gradient để nội dung nổi hơn */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/75" />

                {/* Glow xanh nhẹ cho vibe trà */}
                <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-emerald-500/15 blur-[90px]" />
                <div className="absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full bg-lime-400/10 blur-[110px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-tea-300 text-sm font-medium shadow-lg">
                            <TrendingUp className="w-4 h-4" />
                            Xu hướng thị trường
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-semibold font-decoration leading-tight text-white"
                    >
                        Xu hướng thưởng trà <br />
                        <span className="text-tea-300">tại Việt Nam và Nhật Bản</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-white/75 text-base md:text-lg leading-relaxed font-decoration"
                    >
                        So sánh văn hóa uống trà giữa hai quốc gia với sự ưa chuộng đặc trưng của{' '}
                        <span className="text-tea-200 font-semibold">trà xanh Thái Nguyên</span> và{' '}
                        <span className="text-amber-200 font-semibold">matcha Uji cao cấp</span>.
                    </motion.p>
                </div>

                {/* Charts */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-5 md:p-6 border-b border-white/10">
                            <h3 className="text-white font-semibold text-lg md:text-xl">
                                Sản lượng tiêu thụ qua các năm
                            </h3>
                            <p className="text-white/60 text-sm mt-1">
                                Thể hiện mức tăng trưởng giữa Việt Nam và Nhật Bản.
                            </p>

                            <div className="mt-4 flex items-center gap-5">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded bg-emerald-400" />
                                    <span className="text-white/70 text-sm">Việt Nam</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded bg-amber-400" />
                                    <span className="text-white/70 text-sm">Nhật Bản</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-6">
                            <div className="h-[280px] md:h-[320px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={teaTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorVietnam" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0.45} />
                                                <stop offset="95%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0.05} />
                                            </linearGradient>
                                            <linearGradient id="colorJapan" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.45} />
                                                <stop offset="95%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.05} />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.12)" />

                                        <XAxis
                                            dataKey="year"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                                            dx={-10}
                                        />

                                        <Tooltip content={<CustomTooltip />} />

                                        <Area
                                            type="monotone"
                                            dataKey="vietnam"
                                            name="Việt Nam"
                                            stroke="hsl(142, 76%, 45%)"
                                            strokeWidth={3}
                                            fill="url(#colorVietnam)"
                                            dot={false}
                                            activeDot={{ r: 6, strokeWidth: 2, stroke: 'rgba(0,0,0,0.25)' }}
                                        />

                                        <Area
                                            type="monotone"
                                            dataKey="japan"
                                            name="Nhật Bản"
                                            stroke="hsl(38, 92%, 55%)"
                                            strokeWidth={3}
                                            fill="url(#colorJapan)"
                                            dot={false}
                                            activeDot={{ r: 6, strokeWidth: 2, stroke: 'rgba(0,0,0,0.25)' }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bar */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-5 md:p-6 border-b border-white/10">
                            <h3 className="text-white font-semibold text-lg md:text-xl">
                                So sánh mức độ yêu thích (%)
                            </h3>
                            <p className="text-white/60 text-sm mt-1">
                                Phân loại theo nhóm trà phổ biến.
                            </p>

                            <div className="mt-4 flex items-center gap-5">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded bg-emerald-400" />
                                    <span className="text-white/70 text-sm">Việt Nam</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded bg-amber-400" />
                                    <span className="text-white/70 text-sm">Nhật Bản</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-6">
                            <div className="h-[280px] md:h-[320px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.12)" />

                                        <XAxis
                                            dataKey="category"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                                            dx={-10}
                                        />

                                        <Tooltip content={<CustomTooltip />} />

                                        <Bar dataKey="vietnam" name="Việt Nam" fill="hsl(142, 76%, 45%)" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="japan" name="Nhật Bản" fill="hsl(38, 92%, 55%)" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 + index * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:border-white/20 transition"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-3xl md:text-4xl font-bold text-emerald-200">
                                        {stat.value}
                                    </p>
                                    <p className="mt-2 text-white/70 text-sm leading-relaxed">
                                        {stat.label}
                                    </p>
                                </div>

                                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                                    <stat.icon className="w-5 h-5 text-emerald-200" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
