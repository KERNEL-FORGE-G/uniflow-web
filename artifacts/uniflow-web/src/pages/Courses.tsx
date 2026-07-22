import React, { useState } from 'react';
import { 
  Plus, BookOpen, Users, BarChart3, Clock, Grid2X2, List
} from 'lucide-react';
import { mockCourses } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Courses() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filiereFilter, setFiliereFilter] = useState('toutes');

  const filteredCourses = mockCourses.filter(c => filiereFilter === 'toutes' || c.filiere === filiereFilter);

  const getFiliereColor = (filiere: string) => {
    switch(filiere) {
      case 'INFO': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'MATH': return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      case 'PHYS': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'CHIMIE': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'SVT': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Unités d'Enseignement</h1>
          <p className="text-muted-foreground mt-1">Gérez le catalogue des cours, les crédits et les affectations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-medium">
                <Plus className="mr-2 h-4 w-4" /> Créer une UE
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer une nouvelle UE</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">Code</Label>
                  <Input id="code" placeholder="Ex: INF305" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="intitule" className="text-right">Intitulé</Label>
                  <Input id="intitule" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="credits" className="text-right">Crédits</Label>
                  <Input id="credits" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="enseignant" className="text-right">Enseignant</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Assigner un enseignant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dr. Nkam</SelectItem>
                      <SelectItem value="2">Pr. Fotso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Créer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between bg-card border border-border p-2 rounded-lg shadow-sm">
        <Select value={filiereFilter} onValueChange={setFiliereFilter}>
          <SelectTrigger className="w-[200px] border-none shadow-none focus:ring-0">
            <SelectValue placeholder="Filtrer par filière" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toutes">Toutes filières</SelectItem>
            <SelectItem value="INFO">Informatique</SelectItem>
            <SelectItem value="MATH">Mathématiques</SelectItem>
            <SelectItem value="PHYS">Physique</SelectItem>
            <SelectItem value="CHIMIE">Chimie</SelectItem>
            <SelectItem value="SVT">SVT</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 border-l border-border pl-2">
          <Button 
            variant={view === 'grid' ? 'secondary' : 'ghost'} 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setView('grid')}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button 
            variant={view === 'list' ? 'secondary' : 'ghost'} 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setView('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline" className={`font-mono font-bold text-sm ${getFiliereColor(course.filiere)}`}>
                  {course.code}
                </Badge>
                <Badge variant="secondary" className="font-bold">{course.credits} Crédits</Badge>
              </div>
              
              <h3 className="text-xl font-heading font-bold mb-2 line-clamp-2">{course.intitule}</h3>
              <div className="text-sm font-medium text-muted-foreground mb-4">Niveau {course.niveau} • {course.filiere}</div>
              
              <div className="mt-auto space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] uppercase font-bold">
                      {course.enseignant.split(' ').map(n=>n[0]).join('')}
                    </div>
                    {course.enseignant}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users size={14} /> {course.inscrits}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-muted-foreground">Taux de présence</span>
                    <span className={course.tauxPresence >= 75 ? 'text-emerald-500' : 'text-amber-500'}>
                      {course.tauxPresence}%
                    </span>
                  </div>
                  <Progress value={course.tauxPresence} className="h-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Code UE</th>
                <th className="px-6 py-4 font-semibold">Intitulé</th>
                <th className="px-6 py-4 font-semibold">Filière / Niveau</th>
                <th className="px-6 py-4 font-semibold">Crédits</th>
                <th className="px-6 py-4 font-semibold">Enseignant</th>
                <th className="px-6 py-4 font-semibold text-right">Présence</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-3 font-mono font-bold text-foreground">
                    <Badge variant="outline" className={getFiliereColor(course.filiere)}>{course.code}</Badge>
                  </td>
                  <td className="px-6 py-3 font-medium">{course.intitule}</td>
                  <td className="px-6 py-3 text-muted-foreground">{course.filiere} - {course.niveau}</td>
                  <td className="px-6 py-3 font-bold">{course.credits}</td>
                  <td className="px-6 py-3">{course.enseignant}</td>
                  <td className="px-6 py-3 text-right">
                    <span className={`font-bold ${course.tauxPresence >= 75 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {course.tauxPresence}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
