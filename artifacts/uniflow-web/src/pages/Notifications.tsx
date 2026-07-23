import React, { useState } from 'react';
import { 
  Bell, AlertTriangle, MapPin, BookOpen, MessageSquare, Check, X 
} from 'lucide-react';
import { mockNotifications } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Notifications() {
  const [selectedNotif, setSelectedNotif] = useState(mockNotifications[0]);
  const [activeTab, setActiveTab] = useState('toutes');

  const getIcon = (type: string) => {
    switch(type) {
      case 'cours_annule': return <AlertTriangle className="text-destructive h-5 w-5" />;
      case 'salle_changee': return <MapPin className="text-accent h-5 w-5" />;
      case 'note_publiee': return <BookOpen className="text-primary h-5 w-5" />;
      case 'alerte_presence': return <Bell className="text-secondary h-5 w-5" />;
      default: return <MessageSquare className="text-primary h-5 w-5" />;
    }
  };

  const getBgColor = (type: string) => {
    switch(type) {
      case 'cours_annule': return 'bg-destructive/10';
      case 'salle_changee': return 'bg-accent/10';
      case 'note_publiee': return 'bg-primary/10';
      case 'alerte_presence': return 'bg-secondary/10';
      default: return 'bg-primary/10';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight">Centre de Notifications</h1>
          <p className="text-muted-foreground mt-1">Restez informé des changements importants.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-medium bg-card">
            <Check className="mr-2 h-4 w-4" /> Tout marquer comme lu
          </Button>
        </div>
      </div>

      <div className="flex items-center shrink-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-card border border-border flex h-10 w-fit">
            <TabsTrigger value="toutes">Toutes</TabsTrigger>
            <TabsTrigger value="non_lues" className="relative">
              Non lues
              <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">3</span>
            </TabsTrigger>
            <TabsTrigger value="cours">Cours</TabsTrigger>
            <TabsTrigger value="systeme">Système</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Feed */}
        <div className="md:col-span-1 border border-border bg-card rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1 p-3 space-y-1 scrollbar-thin">
            {['Aujourd\'hui', 'Hier', 'Cette semaine'].map(group => (
              <div key={group} className="mb-6 last:mb-0">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">{group}</h3>
                {mockNotifications.filter(n => n.group === group).map(notif => (
                  <button 
                    key={notif.id}
                    onClick={() => setSelectedNotif(notif)}
                    className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors ${
                      selectedNotif.id === notif.id ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className={`mt-0.5 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notif.type)}`}>
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className={`font-semibold text-sm truncate ${notif.unread ? 'text-foreground' : 'text-foreground/80'}`}>{notif.title}</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{notif.time}</span>
                      </div>
                      <p className={`text-xs truncate ${notif.unread ? 'text-foreground/90 font-medium' : 'text-muted-foreground'}`}>{notif.preview}</p>
                    </div>
                    {notif.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="md:col-span-2 border border-border bg-card rounded-xl shadow-sm overflow-hidden flex flex-col">
          {selectedNotif ? (
            <div className="p-8 h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${getBgColor(selectedNotif.type)}`}>
                    {getIcon(selectedNotif.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-heading">{selectedNotif.title}</h2>
                    <div className="text-sm text-muted-foreground mt-1">{selectedNotif.time}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><X size={18} /></Button>
                </div>
              </div>
              
              <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
                <p className="text-lg leading-relaxed">{selectedNotif.preview}</p>
                <p className="text-muted-foreground mt-4">
                  Veuillez prendre vos dispositions. Si vous avez des questions concernant cette modification, contactez le département concerné ou l'administration centrale.
                </p>
              </div>

              <div className="mt-auto flex gap-3 pt-6 border-t border-border">
                <Button className="font-bold">Voir les détails</Button>
                <Button variant="outline" className="font-bold">Contacter l'enseignant</Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
              <Bell className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium">Sélectionnez une notification pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
