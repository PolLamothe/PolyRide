import pandas as pd
import numpy as np
from datetime import date, timedelta

# Définition des Sprints selon task.md (avec gestion des chevauchements : jour de fin = deadline)
sprints = {
    'Sprint 1': {'start': date(2025, 10, 23), 'end': date(2025, 11, 10), 'points': 30},
    'Sprint 2': {'start': date(2025, 11, 11), 'end': date(2025, 11, 24), 'points': 60}, # Début le 11 pour éviter chevauchement dans la colonne
    'Sprint 3': {'start': date(2025, 11, 25), 'end': date(2025, 12, 1), 'points': 45}   # Début le 25
}

# Génération de toutes les dates
all_dates = []
sprint_labels = []
ideal_points = []

for sprint_name, data in sprints.items():
    sprint_dates = pd.date_range(start=data['start'], end=data['end'], freq='D')
    all_dates.extend(sprint_dates)
    sprint_labels.extend([sprint_name] * len(sprint_dates))
    # Ideal burn pour ce sprint
    ideal = np.linspace(data['points'], 0, len(sprint_dates))
    ideal_points.extend(ideal)

# Création du DataFrame
df = pd.DataFrame({
    'Date': all_dates,
    'Sprint': sprint_labels,
    'Idéal (Sprint)': ideal_points,
    'Réel (Points Restants)': np.nan # À remplir par l'utilisateur
})

# Initialisation des points de départ réels pour chaque sprint (facultatif, mais aide à visualiser)
# On met le max de points au premier jour de chaque sprint
for sprint_name, data in sprints.items():
    start_date_idx = df[df['Date'] == pd.Timestamp(data['start'])].index[0]
    df.loc[start_date_idx, 'Réel (Points Restants)'] = data['points']

# Formatage
df['Date'] = df['Date'].dt.strftime('%d/%m/%Y')

# Export Excel
file_name_global = 'Burndown_Chart_Global_Sprints.xlsx'
with pd.ExcelWriter(file_name_global, engine='openpyxl') as writer:
    df.to_excel(writer, sheet_name='Suivi Global', index=False)
    # Ajustements esthétiques basiques via pandas/openpyxl si nécessaire (déjà correct par défaut)

print(f"Fichier créé : {file_name_global}")