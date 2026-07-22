export const mockStudents = [
  { id: '1', matricule: '21A001', nom: 'Nkolo', prenom: 'Marie', filiere: 'INFO', niveau: 'L3', email: 'm.nkolo@uniflow.cm', statut: 'Inscrit' },
  { id: '2', matricule: '22B014', nom: 'Tchouya', prenom: 'Paul', filiere: 'MATH', niveau: 'L2', email: 'p.tchouya@uniflow.cm', statut: 'Inscrit' },
  { id: '3', matricule: '20C105', nom: 'Kamga', prenom: 'Celine', filiere: 'PHYS', niveau: 'M1', email: 'c.kamga@uniflow.cm', statut: 'Inscrit' },
  { id: '4', matricule: '23D042', nom: 'Edoa', prenom: 'Jean', filiere: 'SVT', niveau: 'L1', email: 'j.edoa@uniflow.cm', statut: 'Inscrit' },
  { id: '5', matricule: '21A019', nom: 'Belinga', prenom: 'Arthur', filiere: 'INFO', niveau: 'L3', email: 'a.belinga@uniflow.cm', statut: 'Suspendu' },
  { id: '6', matricule: '19E088', nom: 'Ngo', prenom: 'Jeanne', filiere: 'CHIMIE', niveau: 'M2', email: 'j.ngo@uniflow.cm', statut: 'Inscrit' },
  { id: '7', matricule: '22B022', nom: 'Atangana', prenom: 'Marc', filiere: 'MATH', niveau: 'L2', email: 'm.atangana@uniflow.cm', statut: 'Inscrit' },
  { id: '8', matricule: '23D101', nom: 'Etoundi', prenom: 'Sophie', filiere: 'SVT', niveau: 'L1', email: 's.etoundi@uniflow.cm', statut: 'Inscrit' },
  { id: '9', matricule: '21A111', nom: 'Fouda', prenom: 'Yves', filiere: 'INFO', niveau: 'L3', email: 'y.fouda@uniflow.cm', statut: 'Inscrit' },
  { id: '10', matricule: '20C003', nom: 'Mbia', prenom: 'Alice', filiere: 'PHYS', niveau: 'M1', email: 'a.mbia@uniflow.cm', statut: 'En attente' },
  { id: '11', matricule: '22A045', nom: 'Njoya', prenom: 'Ibrahim', filiere: 'INFO', niveau: 'L2', email: 'i.njoya@uniflow.cm', statut: 'Inscrit' },
  { id: '12', matricule: '23B099', nom: 'Abba', prenom: 'Moussa', filiere: 'MATH', niveau: 'L1', email: 'm.abba@uniflow.cm', statut: 'Inscrit' },
  { id: '13', matricule: '19C012', nom: 'Biya', prenom: 'Chantal', filiere: 'PHYS', niveau: 'M2', email: 'c.biya@uniflow.cm', statut: 'Inscrit' },
  { id: '14', matricule: '21D076', nom: 'Etoa', prenom: 'Alain', filiere: 'SVT', niveau: 'L3', email: 'a.etoa@uniflow.cm', statut: 'Inscrit' },
  { id: '15', matricule: '22E034', nom: 'Ndi', prenom: 'Rosalie', filiere: 'CHIMIE', niveau: 'L2', email: 'r.ndi@uniflow.cm', statut: 'Inscrit' },
  { id: '16', matricule: '23A005', nom: 'Mvondo', prenom: 'Charles', filiere: 'INFO', niveau: 'L1', email: 'c.mvondo@uniflow.cm', statut: 'Inscrit' },
  { id: '17', matricule: '20B048', nom: 'Talla', prenom: 'Hervé', filiere: 'MATH', niveau: 'M1', email: 'h.talla@uniflow.cm', statut: 'Inscrit' },
  { id: '18', matricule: '21C091', nom: 'Kemajou', prenom: 'Blandine', filiere: 'PHYS', niveau: 'L3', email: 'b.kemajou@uniflow.cm', statut: 'Suspendu' },
  { id: '19', matricule: '22D011', nom: 'Oumarou', prenom: 'Ali', filiere: 'SVT', niveau: 'L2', email: 'a.oumarou@uniflow.cm', statut: 'Inscrit' },
  { id: '20', matricule: '19E002', nom: 'Djoumessi', prenom: 'Francine', filiere: 'CHIMIE', niveau: 'M2', email: 'f.djoumessi@uniflow.cm', statut: 'Inscrit' }
];

export const mockCourses = [
  { id: '1', code: 'INF301', intitule: 'Algorithmique Avancée', filiere: 'INFO', niveau: 'L3', credits: 6, enseignant: 'Dr. Nkam', inscrits: 145, tauxPresence: 85 },
  { id: '2', code: 'MAT201', intitule: 'Algèbre Linéaire', filiere: 'MATH', niveau: 'L2', credits: 4, enseignant: 'Pr. Fotso', inscrits: 210, tauxPresence: 72 },
  { id: '3', code: 'PHY405', intitule: 'Physique Quantique', filiere: 'PHYS', niveau: 'M1', credits: 6, enseignant: 'Dr. Eboa', inscrits: 45, tauxPresence: 91 },
  { id: '4', code: 'CHM502', intitule: 'Chimie Organique II', filiere: 'CHIMIE', niveau: 'M2', credits: 5, enseignant: 'Pr. Nguema', inscrits: 28, tauxPresence: 88 },
  { id: '5', code: 'SVT101', intitule: 'Biologie Cellulaire', filiere: 'SVT', niveau: 'L1', credits: 4, enseignant: 'Dr. Manga', inscrits: 320, tauxPresence: 65 },
  { id: '6', code: 'INF302', intitule: 'Bases de Données', filiere: 'INFO', niveau: 'L3', credits: 5, enseignant: 'Dr. Nkam', inscrits: 145, tauxPresence: 78 },
  { id: '7', code: 'MAT205', intitule: 'Probabilités', filiere: 'MATH', niveau: 'L2', credits: 4, enseignant: 'Dr. Tchuente', inscrits: 205, tauxPresence: 70 },
  { id: '8', code: 'INF101', intitule: 'Introduction à l\'Informatique', filiere: 'INFO', niveau: 'L1', credits: 4, enseignant: 'M. Belinga', inscrits: 400, tauxPresence: 60 }
];

export const mockScheduleEvents = [
  { id: '1', day: 1, startHour: 8, endHour: 10, type: 'Cours Magistral', ue: 'INF301', salle: 'Amphi A', enseignant: 'Dr. N' },
  { id: '2', day: 1, startHour: 10, endHour: 12, type: 'TD', ue: 'INF301', salle: 'Salle TD 101', enseignant: 'M. B' },
  { id: '3', day: 1, startHour: 13, endHour: 15, type: 'Cours Magistral', ue: 'MAT201', salle: 'Amphi B', enseignant: 'Pr. F' },
  { id: '4', day: 2, startHour: 8, endHour: 11, type: 'TP', ue: 'INF302', salle: 'Labo Info 1', enseignant: 'Dr. N' },
  { id: '5', day: 2, startHour: 14, endHour: 17, type: 'Cours Magistral', ue: 'PHY405', salle: 'Amphi C', enseignant: 'Dr. E' },
  { id: '6', day: 3, startHour: 9, endHour: 12, type: 'TD', ue: 'MAT205', salle: 'Salle TD 102', enseignant: 'Dr. T' },
  { id: '7', day: 3, startHour: 13, endHour: 16, type: 'Examen', ue: 'CHM502', salle: 'Amphi A', enseignant: 'Pr. N' },
  { id: '8', day: 4, startHour: 8, endHour: 10, type: 'Cours Magistral', ue: 'SVT101', salle: 'Amphi A', enseignant: 'Dr. M' },
  { id: '9', day: 4, startHour: 10, endHour: 12, type: 'TP', ue: 'SVT101', salle: 'Labo SVT', enseignant: 'Dr. M' },
  { id: '10', day: 5, startHour: 14, endHour: 16, type: 'Cours Magistral', ue: 'INF101', salle: 'Amphi B', enseignant: 'M. B' },
];

export const mockRooms = [
  { id: '1', name: 'Amphi A', capacity: 800, type: 'Amphithéâtre', status: 'Occupee', equipment: ['projector', 'ac', 'wifi'] },
  { id: '2', name: 'Amphi B', capacity: 500, type: 'Amphithéâtre', status: 'Libre', equipment: ['projector', 'wifi'] },
  { id: '3', name: 'Amphi C', capacity: 300, type: 'Amphithéâtre', status: 'Libre', equipment: ['projector', 'ac'] },
  { id: '4', name: 'Salle TD 101', capacity: 40, type: 'Salle de TD', status: 'Occupee', equipment: ['board'] },
  { id: '5', name: 'Salle TD 102', capacity: 40, type: 'Salle de TD', status: 'Libre', equipment: ['board', 'wifi'] },
  { id: '6', name: 'Labo Info 1', capacity: 30, type: 'Laboratoire', status: 'Maintenance', equipment: ['computer', 'projector', 'ac', 'wifi'] },
  { id: '7', name: 'Labo Info 2', capacity: 30, type: 'Laboratoire', status: 'Libre', equipment: ['computer', 'ac', 'wifi'] },
  { id: '8', name: 'Labo SVT', capacity: 25, type: 'Laboratoire', status: 'Libre', equipment: ['microscope', 'sink'] },
];

export const mockNotifications = [
  { id: '1', type: 'cours_annule', title: 'Cours Annulé: INF301', preview: 'Le cours du Dr. Nkam est annulé aujourd\'hui.', time: 'Il y a 10 min', unread: true, group: 'Aujourd\'hui' },
  { id: '2', type: 'salle_changee', title: 'Changement de Salle: MAT201', preview: 'Le cours de MAT201 est déplacé à l\'Amphi B.', time: 'Il y a 1h', unread: true, group: 'Aujourd\'hui' },
  { id: '3', type: 'note_publiee', title: 'Notes Publiées: PHY405', preview: 'Les notes de CC1 sont disponibles.', time: 'Il y a 3h', unread: false, group: 'Aujourd\'hui' },
  { id: '4', type: 'alerte_presence', title: 'Alerte Présence', preview: 'Taux de présence anormalement bas en SVT101.', time: 'Hier, 14:30', unread: false, group: 'Hier' },
  { id: '5', type: 'message_systeme', title: 'Mise à jour Système', preview: 'Maintenance prévue ce weekend.', time: 'Hier, 09:00', unread: false, group: 'Hier' },
  { id: '6', type: 'note_publiee', title: 'Notes Publiées: CHM502', preview: 'Notes de fin de semestre.', time: 'Lundi, 10:00', unread: false, group: 'Cette semaine' },
  { id: '7', type: 'cours_annule', title: 'Cours Annulé: INF101', preview: 'Raison: Maladie enseignant.', time: 'Mardi, 08:00', unread: false, group: 'Cette semaine' },
];

export const mockActivityFeed = [
  { id: '1', type: 'course_start', message: 'INF301 a commencé en Amphi A', time: '08:05' },
  { id: '2', type: 'grade_added', message: 'Pr. Fotso a publié les notes de MAT201', time: 'Hier' },
  { id: '3', type: 'student_added', message: '12 nouveaux étudiants inscrits en L1 INFO', time: 'Hier' },
  { id: '4', type: 'room_issue', message: 'Maintenance déclarée pour Labo Info 1', time: 'Il y a 2 jours' },
  { id: '5', type: 'course_start', message: 'SVT101 a commencé en Amphi B', time: 'Il y a 2 jours' },
];

export const mockChartData = {
  attendanceWeekly: [
    { day: 'Lun', rate: 82 },
    { day: 'Mar', rate: 78 },
    { day: 'Mer', rate: 85 },
    { day: 'Jeu', rate: 70 },
    { day: 'Ven', rate: 65 },
    { day: 'Sam', rate: 40 },
  ],
  deptBreakdown: [
    { name: 'INFO', value: 450, fill: 'var(--color-chart-1)' },
    { name: 'MATH', value: 300, fill: 'var(--color-chart-2)' },
    { name: 'PHYS', value: 200, fill: 'var(--color-chart-3)' },
    { name: 'CHIMIE', value: 150, fill: 'var(--color-chart-4)' },
    { name: 'SVT', value: 350, fill: 'var(--color-chart-5)' },
  ],
  roomOccupancy: [
    { room: 'Amphi A', occupancy: 85 },
    { room: 'Amphi B', occupancy: 60 },
    { room: 'Amphi C', occupancy: 40 },
    { room: 'Labo Info 1', occupancy: 95 },
    { room: 'Salle TD 101', occupancy: 70 },
  ]
};
