import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter, Info
} from 'lucide-react';
import { mockScheduleEvents } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';

export default function Schedule() {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const hours = Array.from({length: 13}, (_, i) => i + 7); // 7h to 19h

  const getEventStyle = (type: string) => {
    switch(type) {
      case 'Cours Magistral': return 'bg-blue-500/20 text-blue-500 border-blue-500/30 hover:bg-blue-500/30';
      case 'TD': return 'bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30';
      case 'TP': return 'bg-purple-500/20 text-purple-500 border-purple-500/30 hover:bg-purple-500/30';
      case 'Examen': return 'bg-red-500/20 text-red-500 border-red-500/30 hover:bg-red-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Emploi du temps</h1>
          <p className="text-muted-foreground mt-1">Plannings hebdomadaires des cours, TD et examens.</p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border p-1 rounded-lg">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft size={18} /></Button>
          <div className="font-semibold text-sm px-2 flex items-center gap-2">
            <CalendarIcon size={16} className="text-primary" />
            Semaine du 14 Octobre
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight size={18} /></Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="tous" className="w-full max-w-[600px]">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tous">Tous</TabsTrigger>
            <TabsTrigger value="enseignant">Par Enseignant</TabsTrigger>
            <TabsTrigger value="salle">Par Salle</TabsTrigger>
            <TabsTrigger value="filiere">Par Filière</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button variant="outline" className="hidden md:flex bg-card">
          <Filter className="mr-2 h-4 w-4" /> Filtres avancés
        </Button>
      </div>

      {/* Schedule Grid */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header row (Days) */}
            <div className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr] border-b border-border bg-muted/50">
              <div className="py-3 px-2 text-center text-xs font-semibold text-muted-foreground border-r border-border">Heure</div>
              {days.map((day, i) => (
                <div key={day} className="py-3 px-4 text-center font-bold text-sm border-r border-border last:border-0">
                  {day} <span className="text-muted-foreground font-normal ml-1">1{4+i}/10</span>
                </div>
              ))}
            </div>

            {/* Grid Body */}
            <div className="relative">
              {/* Background grid lines */}
              {hours.map(hour => (
                <div key={`bg-${hour}`} className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr] border-b border-border/50 h-16">
                  <div className="py-2 text-center text-xs font-medium text-muted-foreground border-r border-border relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card px-1">{hour}h</span>
                  </div>
                  {days.map(day => (
                    <div key={`bg-${hour}-${day}`} className="border-r border-border/50 last:border-0 relative"></div>
                  ))}
                </div>
              ))}

              {/* Events Layer */}
              <div className="absolute inset-0 grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr] pointer-events-none">
                <div></div> {/* Spacer for hours column */}
                {days.map((day, dayIndex) => {
                  const dayEvents = mockScheduleEvents.filter(e => e.day === dayIndex + 1);
                  return (
                    <div key={`events-${day}`} className="relative h-full border-r border-transparent">
                      {dayEvents.map(event => {
                        const top = (event.startHour - 7) * 64; // 64px = 4rem = h-16
                        const height = (event.endHour - event.startHour) * 64;
                        
                        return (
                          <div 
                            key={event.id}
                            className="absolute w-full px-1 py-0.5 pointer-events-auto"
                            style={{ top: `${top}px`, height: `${height}px` }}
                          >
                            <Popover>
                              <PopoverTrigger asChild>
                                <button className={`w-full h-full rounded-md border text-left p-2 overflow-hidden transition-colors flex flex-col shadow-sm ${getEventStyle(event.type)}`}>
                                  <div className="text-xs font-bold font-mono tracking-tight mb-0.5">{event.ue}</div>
                                  <div className="text-[10px] font-medium opacity-90 truncate">{event.type}</div>
                                  <div className="mt-auto pt-1 flex justify-between items-end text-[10px] font-bold opacity-80">
                                    <span>{event.salle}</span>
                                    <span>{event.enseignant}</span>
                                  </div>
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-4" align="start">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-bold text-lg font-heading">{event.ue}</h4>
                                      <Badge variant="outline" className="mt-1 bg-muted">{event.type}</Badge>
                                    </div>
                                    <div className="text-right text-sm">
                                      <div className="font-bold text-primary">{event.startHour}h00 - {event.endHour}h00</div>
                                      <div className="text-muted-foreground">{days[dayIndex]}</div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border text-sm">
                                    <div>
                                      <span className="text-muted-foreground block text-xs mb-1">Salle</span>
                                      <span className="font-medium flex items-center gap-1"><Info size={14}/> {event.salle}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground block text-xs mb-1">Enseignant</span>
                                      <span className="font-medium">{event.enseignant}</span>
                                    </div>
                                  </div>
                                  <Button className="w-full mt-2" size="sm" variant="secondary">Voir la liste de présence</Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
