'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const skillsData = [
  { name: 'Java', level: 95 },
  { name: 'Spring Boot', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Angular', level: 80 },
  { name: 'SQL', level: 90 },
  { name: 'REST API', level: 95 },
  { name: 'Microservices', level: 80 },
];

const chartConfig = {
  level: {
    label: 'Proficiency',
    color: 'hsl(var(--primary))',
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">My Technical Skills</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            A visual representation of my proficiency in key technologies.
          </p>
        </div>
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Skill Proficiency</CardTitle>
              <CardDescription>My confidence level in various technologies, from 0 to 100.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={skillsData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'hsl(var(--foreground))' }}
                      width={120}
                    />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--accent))' }}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="level" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
