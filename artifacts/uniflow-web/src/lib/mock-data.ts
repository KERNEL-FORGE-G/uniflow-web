// ── Utilisateur connecté ──────────────────────────────────────────────────────
export const mockUser = {
  nom: 'Emma',
  prenom: 'Martin',
  nomComplet: 'Emma Martin',
  initiales: 'EM',
  role: 'Étudiante',
  filiere: 'Informatique',
  niveau: 'Licence 2',
  matricule: '2023042',
  email: 'emma.martin@uniflow.cm',
  telephone: '+237 6XX XX XX XX',
  dateNaissance: '15 mars 2003',
  adresse: 'Yaoundé, Cameroun',
  etablissement: 'Université de Yaoundé 1',
  inscription: '12 septembre 2023',
  langues: 'Français, Anglais',
  statut: 'Actif',
  online: true,
  avatar: null,
};

// ── Dashboard stats ───────────────────────────────────────────────────────────
export const mockDashboardStats = {
  coursInscrits: { value: 12, delta: '+8%', label: 'Cours inscrits' },
  devoirsARendre: { value: 5, delta: '+1', label: 'Devoirs à rendre' },
  prochainCours: { value: '2h30', delta: '+15m', label: 'Prochain cours dans' },
  moyenne: { value: '14.6/20', delta: '+0.8', label: 'Moyenne générale' },
  presences: { value: '87%', delta: '+5%', label: 'Taux de présence' },
};

export const mockDashboardActivity = [
  { id: '1', cours: 'Mathématiques', activite: 'Devoir 1 rendu', time: '10:15', enseignant: 'P. Martin', statut: 'Rendu', couleur: '#1E3A8A' },
  { id: '2', cours: 'Économie', activite: 'Quiz noté', time: '09:40', enseignant: 'Dr. Dubois', statut: 'Terminé', couleur: '#0D9488' },
  { id: '3', cours: 'Histoire', activite: 'Cours à venir', time: '14:00', enseignant: 'Dr. Bernard', statut: 'À venir', couleur: '#F59E0B' },
  { id: '4', cours: 'Physique', activite: 'Document ajouté', time: '16:00', enseignant: 'Dr. Lefèvre', statut: 'Nouveau', couleur: '#8B5CF6' },
  { id: '5', cours: 'Anglais', activite: 'Note publiée', time: '17:00', enseignant: 'Mme Johnson', statut: 'Nouveau', couleur: '#10B981' },
];

export const mockCalendar = {
  mois: 'Mai 2024',
  annee: 2024,
  moisIndex: 4,
  joursAvecEvenements: [7, 13, 15, 19, 22, 26, 28],
  today: 19,
};

export const mockRepartitionNotes = [
  { name: 'Excellent', value: 19 },
  { name: 'Bien', value: 52 },
  { name: 'Assez bien', value: 21 },
  { name: 'Faible', value: 8 },
];

export const mockProchainEvenement = {
  titre: 'Examen Maths',
  heure: '09h00',
  salle: 'A204',
  date: 'Samedi 18 mai 2024',
  dansJours: 5,
};

// ── Cours ─────────────────────────────────────────────────────────────────────
export const mockCours = [
  { id: '1', code: 'INF301', intitule: 'Algorithmique — Mathématiques', filiere: 'INFO', niveau: 'L3', credits: 6, enseignant: 'Dr. Nkam', inscrits: 145, tauxPresence: 85, progression: 75, statut: 'En cours', couleur: '#1E3A8A', imageBg: 'from-blue-900 to-blue-700' },
  { id: '2', code: 'ECO201', intitule: 'Économie', filiere: 'ECO', niveau: 'L2', credits: 4, enseignant: 'Dr. Dubois', inscrits: 210, tauxPresence: 60, progression: 60, statut: 'En cours', couleur: '#0D9488', imageBg: 'from-teal-800 to-teal-600' },
  { id: '3', code: 'INF302', intitule: 'Réseaux Informatiques', filiere: 'INFO', niveau: 'L3', credits: 5, enseignant: 'Dr. Nkam', inscrits: 145, tauxPresence: 45, progression: 45, statut: 'En cours', couleur: '#3B82F6', imageBg: 'from-blue-600 to-indigo-700' },
  { id: '4', code: 'AI401', intitule: 'Intelligence Artificielle', filiere: 'INFO', niveau: 'M1', credits: 6, enseignant: 'Dr. Lefèvre', inscrits: 80, tauxPresence: 87, progression: 87, statut: 'En cours', couleur: '#8B5CF6', imageBg: 'from-violet-800 to-purple-700' },
  { id: '5', code: 'ECO301', intitule: 'Économie Avancée', filiere: 'ECO', niveau: 'L3', credits: 4, enseignant: 'Pr. Fotso', inscrits: 120, tauxPresence: 55, progression: 55, statut: 'À venir', couleur: '#F59E0B', imageBg: 'from-amber-700 to-orange-600' },
  { id: '6', code: 'PHY101', intitule: 'Philosophie', filiere: 'PHYS', niveau: 'L1', credits: 3, enseignant: 'Pr. Bernard', inscrits: 200, tauxPresence: 30, progression: 30, statut: 'À venir', couleur: '#10B981', imageBg: 'from-emerald-700 to-green-600' },
];

export const mockProchainDevoirs = [
  { id: 'd1', ue: 'Algorithmique', dateLimite: 'Dans 4 jours', niveau: 'Devoir 1', urgent: true },
  { id: 'd2', ue: 'Économie', dateLimite: 'Le 22 mai', niveau: 'Devoir 2', urgent: false },
  { id: 'd3', ue: 'Réseaux', dateLimite: 'Le 24 mai', niveau: 'TP noté', urgent: false },
];

// ── Étudiants ─────────────────────────────────────────────────────────────────
export const mockStudents = [
  { id: '1', matricule: '21A001', nom: 'Nkolo Marie', filiere: 'INFO', niveau: 'L3', email: 'm.nkolo@uniflow.cm', statut: 'Inscrit' },
  { id: '2', matricule: '22B014', nom: 'Tchouya Paul', filiere: 'MATH', niveau: 'L2', email: 'p.tchouya@uniflow.cm', statut: 'Inscrit' },
  { id: '3', matricule: '20C105', nom: 'Kamga Celine', filiere: 'PHYS', niveau: 'M1', email: 'c.kamga@uniflow.cm', statut: 'Inscrit' },
  { id: '4', matricule: '23D042', nom: 'Edoa Jean', filiere: 'SVT', niveau: 'L1', email: 'j.edoa@uniflow.cm', statut: 'Inscrit' },
  { id: '5', matricule: '21A019', nom: 'Belinga Arthur', filiere: 'INFO', niveau: 'L3', email: 'a.belinga@uniflow.cm', statut: 'Suspendu' },
  { id: '6', matricule: '19E088', nom: 'Ngo Jeanne', filiere: 'CHIMIE', niveau: 'M2', email: 'j.ngo@uniflow.cm', statut: 'Inscrit' },
  { id: '7', matricule: '22B022', nom: 'Atangana Marc', filiere: 'MATH', niveau: 'L2', email: 'm.atangana@uniflow.cm', statut: 'Inscrit' },
  { id: '8', matricule: '23D101', nom: 'Etoundi Sophie', filiere: 'SVT', niveau: 'L1', email: 's.etoundi@uniflow.cm', statut: 'Inscrit' },
  { id: '9', matricule: '21A111', nom: 'Fouda Yves', filiere: 'INFO', niveau: 'L3', email: 'y.fouda@uniflow.cm', statut: 'Inscrit' },
  { id: '10', matricule: '20C003', nom: 'Mbia Alice', filiere: 'PHYS', niveau: 'M1', email: 'a.mbia@uniflow.cm', statut: 'En attente' },
  { id: '11', matricule: '22A045', nom: 'Njoya Ibrahim', filiere: 'INFO', niveau: 'L2', email: 'i.njoya@uniflow.cm', statut: 'Inscrit' },
  { id: '12', matricule: '23B099', nom: 'Abba Moussa', filiere: 'MATH', niveau: 'L1', email: 'm.abba@uniflow.cm', statut: 'Inscrit' },
  { id: '13', matricule: '19C012', nom: 'Biya Chantal', filiere: 'PHYS', niveau: 'M2', email: 'c.biya@uniflow.cm', statut: 'Inscrit' },
  { id: '14', matricule: '21D076', nom: 'Etoa Alain', filiere: 'SVT', niveau: 'L3', email: 'a.etoa@uniflow.cm', statut: 'Inscrit' },
  { id: '15', matricule: '22E034', nom: 'Ndi Rosalie', filiere: 'CHIMIE', niveau: 'L2', email: 'r.ndi@uniflow.cm', statut: 'Inscrit' },
  { id: '16', matricule: '23A005', nom: 'Mvondo Charles', filiere: 'INFO', niveau: 'L1', email: 'c.mvondo@uniflow.cm', statut: 'Inscrit' },
  { id: '17', matricule: '20B048', nom: 'Talla Hervé', filiere: 'MATH', niveau: 'M1', email: 'h.talla@uniflow.cm', statut: 'Inscrit' },
  { id: '18', matricule: '21C091', nom: 'Kemajou Blandine', filiere: 'PHYS', niveau: 'L3', email: 'b.kemajou@uniflow.cm', statut: 'Suspendu' },
  { id: '19', matricule: '22D011', nom: 'Oumarou Ali', filiere: 'SVT', niveau: 'L2', email: 'a.oumarou@uniflow.cm', statut: 'Inscrit' },
  { id: '20', matricule: '19E002', nom: 'Djoumessi Francine', filiere: 'CHIMIE', niveau: 'M2', email: 'f.djoumessi@uniflow.cm', statut: 'Inscrit' },
];

// ── Emploi du temps ───────────────────────────────────────────────────────────
export const mockScheduleEvents = [
  { id: '1', day: 1, startHour: 8, endHour: 10, type: 'CM', ue: 'Algorithmique', code: 'INF301', salle: 'Amphi A', enseignant: 'Dr. Nkam', couleur: '#DBEAFE', border: '#1E3A8A', texte: '#1E3A8A' },
  { id: '2', day: 1, startHour: 10, endHour: 12, type: 'TD', ue: 'Algorithmique', code: 'INF301', salle: 'Salle TD 101', enseignant: 'M. B', couleur: '#DBEAFE', border: '#1E3A8A', texte: '#1E3A8A' },
  { id: '3', day: 2, startHour: 8, endHour: 11, type: 'TP', ue: 'Réseaux', code: 'INF302', salle: 'Labo Info 1', enseignant: 'Dr. N', couleur: '#D1FAE5', border: '#059669', texte: '#065F46' },
  { id: '4', day: 2, startHour: 14, endHour: 16, type: 'Séminaire', ue: 'IA', code: 'AI401', salle: 'Amphi C', enseignant: 'Dr. L', couleur: '#EDE9FE', border: '#7C3AED', texte: '#5B21B6' },
  { id: '5', day: 3, startHour: 9, endHour: 12, type: 'TD', ue: 'Économie', code: 'ECO201', salle: 'Salle TD 102', enseignant: 'Dr. D', couleur: '#CCFBF1', border: '#0D9488', texte: '#0F766E' },
  { id: '6', day: 3, startHour: 13, endHour: 16, type: 'CM', ue: 'Économie', code: 'ECO201', salle: 'Salle Réseaux C', enseignant: 'Dr. D', couleur: '#CCFBF1', border: '#0D9488', texte: '#0F766E' },
  { id: '7', day: 4, startHour: 8, endHour: 10, type: 'CM', ue: 'Algorithmique', code: 'INF301', salle: 'Amphi A', enseignant: 'Dr. M', couleur: '#DBEAFE', border: '#1E3A8A', texte: '#1E3A8A' },
  { id: '8', day: 4, startHour: 10, endHour: 12, type: 'TP', ue: 'Algorithmique', code: 'INF301', salle: 'Labo SVT', enseignant: 'Dr. M', couleur: '#DBEAFE', border: '#1E3A8A', texte: '#1E3A8A' },
  { id: '9', day: 4, startHour: 16, endHour: 18, type: 'CM', ue: 'Économie', code: 'ECO201', salle: 'Salle 301', enseignant: 'Pr. F', couleur: '#CCFBF1', border: '#0D9488', texte: '#0F766E' },
  { id: '10', day: 5, startHour: 14, endHour: 16, type: 'CM', ue: 'Informatique', code: 'INF101', salle: 'Amphi B', enseignant: 'M. B', couleur: '#FEF3C7', border: '#D97706', texte: '#92400E' },
  { id: '11', day: 4, startHour: 16, endHour: 18, type: 'CM', ue: 'Philosophie', code: 'PHY101', salle: 'Salle 201', enseignant: 'Pr. Be', couleur: '#FCE7F3', border: '#DB2777', texte: '#9D174D' },
  { id: '12', day: 5, startHour: 8, endHour: 10, type: 'CM', ue: 'Anglais', code: 'ANG201', salle: 'Salle L101', enseignant: 'Mme J', couleur: '#F0FDF4', border: '#16A34A', texte: '#14532D' },
];

// ── Présences ─────────────────────────────────────────────────────────────────
export const mockPresences = [
  { id: '1', etudiant: 'Emma Martin', num: '14052401', presences: 18, absences: 2, retards: 1, taux: 90, justifiees: 1, statut: 'Régulier' },
  { id: '2', etudiant: 'Lucas Bernard', num: '14052402', presences: 16, absences: 3, retards: 1, taux: 80, justifiees: 1, statut: 'Régulier' },
  { id: '3', etudiant: 'Chloé Dubois', num: '14052403', presences: 14, absences: 5, retards: 2, taux: 70, justifiees: 2, statut: 'Attention' },
  { id: '4', etudiant: 'Hugo Leroy', num: '14052404', presences: 10, absences: 8, retards: 3, taux: 50, justifiees: 1, statut: 'Critique' },
  { id: '5', etudiant: 'Sarah Benat', num: '14052405', presences: 16, absences: 3, retards: 2, taux: 80, justifiees: 1, statut: 'Régulier' },
  { id: '6', etudiant: 'Yasmine Khalil', num: '14052406', presences: 14, absences: 4, retards: 2, taux: 70, justifiees: 2, statut: 'Attention' },
];

export const mockPresenceStats = {
  tauxGlobal: 87,
  totalSessions: 156,
  presentsAujourdhui: 12,
  absencesAJustifier: 12,
};

export const mockPresenceChart = [
  { semaine: 'S14', presences: 85, groupe: 78 },
  { semaine: 'S15', presences: 88, groupe: 82 },
  { semaine: 'S16', presences: 82, groupe: 79 },
  { semaine: 'S17', presences: 90, groupe: 85 },
  { semaine: 'S18', presences: 87, groupe: 83 },
  { semaine: 'S19', presences: 85, groupe: 80 },
  { semaine: 'S20', presences: 88, groupe: 84 },
];

// ── Notifications ─────────────────────────────────────────────────────────────
export const mockNotifications = [
  { id: '1', type: 'annonce', titre: 'Annonce importante', apercu: "Changement de salle pour le cours d'Algo de demain (14/05) : Amphi B → Salle B102", expediteur: 'Admin UniFlow', time: 'Il y a 1 min', nonLu: true, body: "Bonjour à tous,\n\nNous vous informons que le cours d'Algorithmique prévu demain mardi 14 mai à 10:00 aura lieu en Salle B102 au lieu de l'Amphi B.\n\nMerci de votre compréhension,\nL'équipe pédagogique" },
  { id: '2', type: 'devoir', titre: 'Nouveau devoir', apercu: 'Bases de données – À rendre avant le 20 mai 23:58', expediteur: 'Dr. Benkamm', time: 'Il y a 3h', nonLu: true, body: "Un nouveau devoir a été ajouté pour le cours de Bases de données.\n\nTitre: Modélisation Entité-Association\nDate limite: 20 mai 2024 à 23:58\n\nBonne chance !" },
  { id: '3', type: 'visio', titre: 'Visioconférence dans 30 min', apercu: 'Algorithmique – Session en ligne à 14:00', expediteur: 'Pr. Martin', time: 'Hier', nonLu: false, body: "La session de visioconférence pour le cours d'Algorithmique aura lieu aujourd'hui à 14:00.\n\nLien de connexion disponible dans la section Cours." },
  { id: '4', type: 'systeme', titre: 'Absence justifiée', apercu: 'Votre absence du 19/05 a été justifiée', expediteur: 'Admin', time: 'Hier', nonLu: false, body: "Votre demande de justification d'absence pour le 19 mai 2024 a été acceptée.\n\nStatut: Justifiée ✓" },
  { id: '5', type: 'systeme', titre: 'Nouvelle annonce système', apercu: 'Maintenance prévue le 25/05 de 02:00 à 04:00', expediteur: 'Admin UniFlow', time: 'Lundi', nonLu: false, body: "Une maintenance système est prévue le 25 mai de 02h00 à 04h00.\n\nLa plateforme sera temporairement indisponible.\n\nMerci de votre compréhension." },
];

// ── Notes / Résultats ─────────────────────────────────────────────────────────
export const mockNotes = [
  { code: 'INF301', intitule: 'Algorithmique Avancée', type: 'Obligatoire', credits: 6, cc: 14, tp: 16, examen: 15, moyenne: 15.2, valide: true },
  { code: 'MAT201', intitule: 'Algèbre Linéaire', type: 'Obligatoire', credits: 4, cc: 12, tp: null, examen: 11, moyenne: 11.5, valide: true },
  { code: 'PHY405', intitule: 'Physique Quantique', type: 'Obligatoire', credits: 6, cc: 9, tp: 8, examen: 10, moyenne: 9.2, valide: false },
  { code: 'INF302', intitule: 'Bases de Données', type: 'Obligatoire', credits: 5, cc: 16, tp: 18, examen: 17, moyenne: 17.0, valide: true },
  { code: 'CHM502', intitule: 'Chimie Organique II', type: 'Optionnel', credits: 5, cc: 13, tp: 14, examen: 12, moyenne: 12.8, valide: true },
];

// ── Devoirs ───────────────────────────────────────────────────────────────────
export const mockDevoirs = [
  { id: '1', ue: 'INF301', couleur: '#1E3A8A', titre: 'Exercices Graphes — Chapitre 7', enseignant: 'Dr. Nkam', dateLimite: '20 mai 2024 — 23:58', statut: 'À faire', urgent: true },
  { id: '2', ue: 'MAT201', couleur: '#0D9488', titre: 'DM2 — Algèbre', enseignant: 'Pr. Fotso', dateLimite: '22 mai 2024', statut: 'À faire', urgent: false },
  { id: '3', ue: 'INF302', couleur: '#7C3AED', titre: 'TP Base de Données — Modélisation', enseignant: 'Dr. Nkam', dateLimite: '25 mai 2024', statut: 'À faire', urgent: false },
  { id: '4', ue: 'INF301', couleur: '#1E3A8A', titre: 'TP Algorithmes de tri', enseignant: 'Dr. Nkam', dateLimite: '10 mai 2024', statut: 'Rendu', urgent: false },
  { id: '5', ue: 'MAT201', couleur: '#0D9488', titre: 'DM1 — Matrices', enseignant: 'Pr. Fotso', dateLimite: '5 mai 2024', statut: 'Rendu', urgent: false },
];

// ── Messages ──────────────────────────────────────────────────────────────────
export const mockMessages = [
  {
    id: '1', contact: 'Dr. Nkam', initiales: 'DN', couleur: '#1E3A8A',
    role: 'Algorithmique · L3 INFO', dernierMsg: 'Bonne note ! Continuez ainsi.', time: '10:15', nonLu: 1,
    messages: [
      { id: 'm1', de: 'Dr. Nkam', texte: "Bonjour Emma, j'ai reçu votre rendu du TP.", time: '10:10' },
      { id: 'm2', de: 'Emma', texte: 'Merci beaucoup Docteur !', time: '10:12' },
      { id: 'm3', de: 'Dr. Nkam', texte: 'Bonne note ! Continuez ainsi.', time: '10:15' },
    ],
  },
  {
    id: '2', contact: 'Pr. Fotso', initiales: 'PF', couleur: '#0D9488',
    role: 'Mathématiques · L2', dernierMsg: "N'oubliez pas le DM2.", time: 'Hier', nonLu: 0,
    messages: [
      { id: 'm4', de: 'Pr. Fotso', texte: 'Rappel : le DM2 est à rendre avant le 22 mai.', time: 'Hier 08:30' },
      { id: 'm5', de: 'Pr. Fotso', texte: "N'oubliez pas le DM2.", time: 'Hier 14:00' },
    ],
  },
  {
    id: '3', contact: 'Délégué (Emma B.)', initiales: 'EB', couleur: '#8B5CF6',
    role: 'Déléguée L2 INFO', dernierMsg: 'Réunion annulée ce soir.', time: 'Lun', nonLu: 0,
    messages: [
      { id: 'm6', de: 'Emma B.', texte: 'La réunion de ce soir est annulée.', time: 'Lun 14:00' },
    ],
  },
  {
    id: '4', contact: 'Admin UniFlow', initiales: 'AU', couleur: '#F59E0B',
    role: 'Administration', dernierMsg: 'Votre compte a été mis à jour.', time: 'Mar', nonLu: 0,
    messages: [
      { id: 'm7', de: 'Admin UniFlow', texte: 'Bonjour, votre compte a été mis à jour.', time: 'Mar 09:00' },
    ],
  },
];

// ── Salles ────────────────────────────────────────────────────────────────────
export const mockRooms = [
  { id: '1', nom: 'Amphi A', capacite: 800, type: 'Amphithéâtre', statut: 'Occupée', equipements: ['Projecteur', 'Climatisation', 'WiFi'] },
  { id: '2', nom: 'Amphi B', capacite: 500, type: 'Amphithéâtre', statut: 'Libre', equipements: ['Projecteur', 'WiFi'] },
  { id: '3', nom: 'Amphi C', capacite: 300, type: 'Amphithéâtre', statut: 'Libre', equipements: ['Projecteur', 'Climatisation'] },
  { id: '4', nom: 'Salle TD 101', capacite: 40, type: 'Salle de TD', statut: 'Occupée', equipements: ['Tableau blanc'] },
  { id: '5', nom: 'Salle TD 102', capacite: 40, type: 'Salle de TD', statut: 'Libre', equipements: ['Tableau blanc', 'WiFi'] },
  { id: '6', nom: 'Labo Info 1', capacite: 30, type: 'Laboratoire', statut: 'Maintenance', equipements: ['Ordinateurs', 'Projecteur', 'WiFi'] },
  { id: '7', nom: 'Labo Info 2', capacite: 30, type: 'Laboratoire', statut: 'Libre', equipements: ['Ordinateurs', 'WiFi'] },
  { id: '8', nom: 'Labo SVT', capacite: 25, type: 'Laboratoire', statut: 'Libre', equipements: ['Microscopes', 'Évier'] },
];

// ── Visioconférence ───────────────────────────────────────────────────────────
export const mockVideoParticipants = [
  { id: '1', nom: 'Emma Martin', initiales: 'EM', isSelf: true },
  { id: '2', nom: 'Sarah K.', initiales: 'SK', isSelf: false },
  { id: '3', nom: 'Yasmine L.', initiales: 'YL', isSelf: false },
  { id: '4', nom: 'Lino M.', initiales: 'LM', isSelf: false },
];

export const mockVideoChat = [
  { id: '1', auteur: 'Emma Martin', initiales: 'EM', texte: 'Pouvez-vous répéter la partie sur les graphes ?', time: '10:15', moi: true },
  { id: '2', auteur: 'Prof. Dubois', initiales: 'PD', texte: 'Bien sûr, je reviens dessus', time: '10:15', moi: false },
  { id: '3', auteur: 'Lucas Bernard', initiales: 'LB', texte: "J'ai la même question que Emma", time: '10:16', moi: false },
];
