import type { DayPlan } from '../types'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface DayCardProps {
    day: DayPlan
}

export default function DayCard({ day }: DayCardProps) {
    return (
        <article className="overflow-hidden rounded-2xl border border-[#123047]/10 bg-white shadow-sm">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#123047]/10 bg-[#FFF9F2] px-5 py-4">
                <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#126E72] text-sm font-bold text-white">
                        {day.day_number}
                    </span>
                    <div>
                        <h3 className="font-bold text-[#123047]">
                            Day {day.day_number}
                        </h3>
                        <p className="text-sm text-[#123047]/65">
                            {day.location}
                        </p>
                    </div>
                </div>
                <p className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#126E72] ring-1 ring-[#126E72]/15">
                    Est. £{day.budget.toLocaleString()}
                </p>
            </header>
            <div className="">
                {[
                    ['Morning', day.morning_plan],
                    ['Afternoon', day.afternoon_plan],
                    ['Evening', day.evening_plan],
                ].map(([period, plan]) => (
                    <section
                        key={period}
                        className="rounded-xl bg-[#FFF9F2]/70 p-4"
                    >
                        <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#126E72]">
                            {period}
                        </h4>
                        <p className="text-sm leading-6 text-[#123047]/80">
                            {/* Custom a html tag css */}
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    a: ({ node: _node, ...props }) => (
                                        <a
                                            {...props}
                                            className="font-medium text-[#126E72] underline decoration-[#126E72]/50 underline-offset-2 hover:text-[#0f5e62] hover:decoration-[#0f5e62]"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    ),
                                }}
                            >
                                {plan}
                            </Markdown>
                        </p>
                    </section>
                ))}
            </div>
        </article>
    )
}
