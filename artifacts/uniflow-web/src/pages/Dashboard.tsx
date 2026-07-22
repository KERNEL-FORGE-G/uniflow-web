import React from 'react';
import { 
  Users, 
  BookOpen, 
  MapPin, 
  UserCheck, 
  TrendingUp,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { mockChartData, mockActivityFeed, mockScheduleEvents } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const kpis = [
    { title: 'Étudiants Inscrits', value: '4,832', icon: Users, trend: '+12% vs an passé', trendUp: true, color: 'text-blue-500' },
    { title: 'Cours Actifs', value: '127', icon: BookOpen, trend: 'Semestre 1', trendUp: true, color: 'text-indigo-500' },
    { title: 'Salles Disponibles', value: '48/62', icon: MapPin, trend: '77% d\'occupation', trendUp: false, color: 'text-amber-500' },
    { title: 'Présents Aujourd\'hui', value: '3,241', icon: UserCheck, trend: '85% taux moyen', trendUp: true, color: 'text-emerald-500' },
  ];

  const todaySchedule = mockScheduleEvents.filter(e => e.day === 1).sort((a, b) => a.startHour - b.startHour);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">Bienvenue, voici un aperçu de votre université aujourd'hui.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-medium bg-card">Télécharger Rapport</Button>
          <Button className="font-medium">Nouvelle Annonce</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-muted ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground -mr-2 -mt-2">
                <MoreHorizontal size={16} />
              </Button>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold mb-1">{kpi.value}</div>
              <div className="text-sm font-medium text-muted-foreground mb-2">{kpi.title}</div>
              <div className="text-xs font-medium flex items-center gap-1">
                {kpi.trendUp ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingUp size={12} className="text-amber-500 rotate-180" />}
                <span className={kpi.trendUp ? 'text-emerald-500' : 'text-amber-500'}>{kpi.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-heading">Taux de présence hebdomadaire</h2>
              <select className="bg-muted border-none text-sm font-medium rounded-md px-3 py-1 outline-none">
                <option>Cette semaine</option>
                <option>Semaine dernière</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData.attendanceWeekly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Today's Schedule Strip */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-heading">Cours en cours & à venir</h2>
              <Button variant="link" className="text-primary h-auto p-0">Voir l'emploi du temps</Button>
            </div>
            <div className="space-y-4">
              {todaySchedule.map((event, i) => (
                <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center min-w-[60px] text-center border-r border-border pr-4">
                    <span className="text-sm font-bold">{event.startHour}h00</span>
                    <span className="text-xs text-muted-foreground">{event.endHour}h00</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{event.ue} - {event.type}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <MapPin size={12} /> {event.salle} <span className="text-border">•</span> <UserCheck size={12} /> {event.enseignant}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                    i === 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                  }`}>
                    {i === 0 ? 'En cours' : 'À venir'}
                  </div>
                </div>
              ))}
              {todaySchedule.length === 0 && (
                <div className="text-center text-muted-foreground py-4 text-sm">Aucun cours prévu aujourd'hui.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          {/* Donut Chart */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold font-heading mb-6">Répartition par Département</h2>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockChartData.deptBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {mockChartData.deptBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold font-heading mb-6">Activité Récente</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
              {mockActivityFeed.map((activity, i) => (
                <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-card bg-primary text-primary-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
                    {activity.type === 'course_start' && <Clock size={12} />}
                    {activity.type === 'grade_added' && <BookOpen size={12} />}
                    {activity.type === 'student_added' && <Users size={12} />}
                    {activity.type === 'room_issue' && <MapPin size={12} />}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted/30 border border-border p-3 rounded-lg shadow-sm ml-12 md:ml-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-sm text-foreground">{
                        activity.type === 'course_start' ? 'Cours' : 
                        activity.type === 'grade_added' ? 'Notes' : 
                        activity.type === 'student_added' ? 'Inscriptions' : 'Maintenance'
                      }</div>
                      <time className="text-xs font-medium text-muted-foreground">{activity.time}</time>
                    </div>
                    <div className="text-sm text-muted-foreground leading-snug">{activity.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
