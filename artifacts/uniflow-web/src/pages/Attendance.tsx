import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, ChevronDown, CheckCircle2, XCircle, AlertCircle, Download
} from 'lucide-react';
import { mockCourses, mockStudents } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Attendance() {
  const [date, setDate] = useState<Date>(new Date());
  const formattedDate = format(date, 'EEEE d MMMM yyyy', { locale: fr });
  
  // Create heatmap data mock
  const heatmapData = Array.from({ length: 30 }).map((_, i) => ({
    date: i + 1,
    rate: Math.floor(Math.random() * 40) + 60 // 60-100%
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Suivi des Présences</h1>
          <p className="text-muted-foreground mt-1">Gérez les appels et analysez l'assiduité des étudiants.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-medium bg-card">
            <CalendarIcon className="mr-2 h-4 w-4" /> {formattedDate}
          </Button>
          <Button className="font-medium">
            <Download className="mr-2 h-4 w-4" /> Rapport PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-bold font-heading mb-4">Cours du jour</h2>
          
          {mockCourses.slice(0, 3).map((course, idx) => (
            <Collapsible key={course.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden" defaultOpen={idx === 0}>
              <CollapsibleTrigger className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold font-mono text-sm border border-primary/20">
                    {course.code.replace(/[0-9]/g, '')}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{course.intitule}</h3>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span className="font-medium text-foreground">08h00 - 10h00</span> • Amphi A • {course.filiere} {course.niveau}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex flex-col items-end">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Taux de présence</div>
                    <div className="flex items-center gap-2 w-32">
                      <Progress value={course.tauxPresence} className="h-2 flex-1" />
                      <span className="text-sm font-bold">{course.tauxPresence}%</span>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border bg-muted/10 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-sm">Liste d'appel</h4>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs h-8">Tout marquer présent</Button>
                      <Button size="sm" className="text-xs h-8">Valider l'appel</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                    {mockStudents.filter(s => s.filiere === course.filiere && s.niveau === course.niveau).map((student) => (
                      <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-card border border-border rounded-lg gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold uppercase">
                            {student.nom[0]}{student.prenom[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{student.nom} {student.prenom}</div>
                            <div className="text-xs font-mono text-muted-foreground">{student.matricule}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
                          <button className="flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-bold bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-1 transition-all">
                            <CheckCircle2 size={14} /> Présent
                          </button>
                          <button className="flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-bold text-muted-foreground hover:bg-card hover:text-red-500 transition-all">
                            Absent
                          </button>
                          <button className="flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-bold text-muted-foreground hover:bg-card hover:text-amber-500 transition-all">
                            Excusé
                          </button>
                        </div>
                      </div>
                    ))}
                    {mockStudents.filter(s => s.filiere === course.filiere && s.niveau === course.niveau).length === 0 && (
                      <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg">
                        Aucun étudiant inscrit dans cette filière/niveau.
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-bold font-heading mb-4 text-muted-foreground uppercase tracking-wider">Statistiques du jour</h2>
            <div className="text-4xl font-heading font-extrabold text-primary mb-2">82.5%</div>
            <p className="text-sm text-muted-foreground mb-6">Taux de présence global sur le campus aujourd'hui.</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 font-medium text-emerald-500"><CheckCircle2 size={16} /> Présents</span>
                <span className="font-bold">3,241</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 font-medium text-red-500"><XCircle size={16} /> Absents</span>
                <span className="font-bold">642</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 font-medium text-amber-500"><AlertCircle size={16} /> Excusés</span>
                <span className="font-bold">45</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-bold font-heading mb-4 text-muted-foreground uppercase tracking-wider">Tendance du mois</h2>
            <div className="grid grid-cols-7 gap-1">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                <div key={i} className="text-center text-[10px] font-bold text-muted-foreground mb-1">{d}</div>
              ))}
              {Array.from({length: 3}).map((_, i) => <div key={`empty-${i}`} />)}
              {heatmapData.map((day) => (
                <div 
                  key={day.date} 
                  className={`aspect-square rounded-sm ${
                    day.rate > 90 ? 'bg-primary' : 
                    day.rate > 80 ? 'bg-primary/70' : 
                    day.rate > 70 ? 'bg-primary/40' : 'bg-primary/20'
                  }`}
                  title={`${day.date} - ${day.rate}%`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-3 font-medium">
              <span>Moins</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                <div className="w-3 h-3 bg-primary/40 rounded-sm"></div>
                <div className="w-3 h-3 bg-primary/70 rounded-sm"></div>
                <div className="w-3 h-3 bg-primary rounded-sm"></div>
              </div>
              <span>Plus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
