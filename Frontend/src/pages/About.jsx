import React from 'react';
import { Users, Target, Calendar, Leaf, Github, Instagram, Zap, Heart, Code, Database, Palette, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import * as Avatar from '@radix-ui/react-avatar';
import * as Separator from '@radix-ui/react-separator';
import Header from "../components/Header.jsx";
import githubIcon from "../assets/github.png";
import "./About.css";

function About() {
    const team = [
        { name: "Pol LAMOTHE", initials: "PL", role: "Product Owner & Dev Team", responsibilities: "Responsable Technique, Backend & Base de données", icon: <Database />, color: "blue" },
        { name: "Julien PITRE", initials: "JP", role: "Scrum Master & Dev Team", responsibilities: "Responsable Frontend", icon: <Code />, color: "purple" },
        { name: "Kyllian ARNAUD", initials: "KA", role: "Dev Team", responsibilities: "Co-Responsable Frontend", icon: <Palette />, color: "pink" },
        { name: "Anouar EL KHATBI IMANI", initials: "AE", role: "Dev Team", responsibilities: "Responsable Communication & Développeur", icon: <Users />, color: "orange" }
    ];

    const milestones = [
        { date: "13 Oct 2025", event: "Lancement du projet", description: "Début du projet dans le cadre du cours de Gestion de Projet Écologique" },
        { date: "23 Oct - 10 Nov", event: "Sprint 1 : Socle technique", description: "Mise en place de l'architecture et des fondations du projet" },
        { date: "10 Nov - 17 Nov", event: "Sprint 2 : Profils utilisateurs", description: "Développement des fonctionnalités de personnalisation des profils" },
        { date: "17 Nov - 24 Nov", event: "Sprint 3 : Matching & Trajets", description: "Implémentation de l'algorithme de matching et du système de trajets" },
        { date: "24 Nov - 1 Déc", event: "Sprint 4 : Déploiement & Ouverture", description: "Mise en production et ouverture aux étudiants" }
    ];

    const objectives = [
        { title: "Spécifique & Mesurable", items: ["PWA déployée et accessible", "Inscription et profils personnalisés", "Matching automatique (ICS + Géolocalisation)", "Système de demande/acceptation de trajets", "Au moins 1 trajet réel réalisé via l'app"], icon: "🎯" },
        { title: "Écologique & Fun", items: ["Réduction directe des émissions de GES", "Compteur de CO₂ économisé par trajet", "Sensibilisation de la communauté étudiante", "UX moderne et engageante"], icon: "🌱" },
        { title: "Atteignable & Réaliste", items: ["Contrainte 'Coût 0€' respectée", "Stack 100% Open Source", "Hébergement sur infrastructure personnelle", "Méthodologie Agile Scrum"], icon: "⚡" },
        { title: "Temporisé", items: ["Début : 13 octobre 2025", "Deadline : 1er décembre 2025", "4 sprints de 1-2 semaines", "Déploiement continu en production"], icon: "⏱️" }
    ];

    return (
        <div className="about-container">
            <Header />

            <div className="about-hero">
                <div className="about-hero-content">
                    <h1>À propos de POLYRIDE</h1>
                    <p>L'histoire d'un projet étudiant né pour transformer les déplacements quotidiens en une expérience collaborative et écologique.</p>
                </div>
            </div>

            <div className="about-wrapper">

                <section className="section-block">
                    <div className="section-title"><Heart /> <h2>Notre Histoire</h2></div>
                    <div className="card">
                        <p style={{ textAlign: "justify", paddingBottom: "1rem" }}>
                            PolyRide est né dans le cadre du cours de <strong>Gestion de Projet Écologique</strong> à
                            Polytech Nantes. Face au constat que les solutions de covoiturage classiques échouent pour les trajets étudiants
                            à cause de la <strong>rigidité et variabilité des horaires</strong>, nous avons décidé d'innover.
                        </p>
                        <p style={{ textAlign: "justify", paddingBottom: "1rem" }}>
                            Notre intuition ? <strong>Automatiser la mise en relation</strong> en synchronisant
                            directement les emplois du temps (via fichiers .ics) et la géolocalisation. Plus besoin de chercher manuellement :
                            l'algorithme trouve pour vous les étudiants qui partent au même moment, du même quartier, vers le même campus.
                        </p>
                        <div style={{ textAlign: "justify", paddingBottom: "1rem" }}>
                            <p>
                                <Leaf style={{marginRight: "1rem"}}/>
                                Notre mission : <strong>réduire l'empreinte carbone des trajets étudiants</strong> tout
                                en créant du lien social entre les membres de la communauté universitaire.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="section-block">
                    <div className="section-title"><Target /> <h2>Nos Objectifs SMARTEF</h2></div>

                    <Tabs.Root defaultValue="tab1" className="tabs-root">
                        <Tabs.List className="tabs-list">
                            {objectives.map((obj, idx) => (
                                <Tabs.Trigger key={idx} value={`tab${idx + 1}`} className="tabs-trigger">
                                    <span>{obj.icon}</span> {obj.title}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>

                        {objectives.map((obj, idx) => (
                            <Tabs.Content key={idx} value={`tab${idx + 1}`} className="tabs-content">
                                <h3><span>{obj.icon}</span> {obj.title}</h3>
                                <ul>
                                    {obj.items.map((item, i) => (<li key={i}>✓ {item}</li>))}
                                </ul>
                            </Tabs.Content>
                            ))}
                    </Tabs.Root>
                </section>

                <section className="section-block">
                    <div className="section-title"><Calendar /> <h2>Notre Parcours</h2></div>

                    <Accordion.Root type="single" collapsible className="timeline-root">
                        {milestones.map((m, idx) => (
                            <Accordion.Item key={idx} value={`item-${idx}`} className="timeline-item">
                                <Accordion.Header>
                                    <Accordion.Trigger className="timeline-trigger">
                                        <div className="timeline-icon">{idx + 1}</div>
                                        <div>
                                            <div className="timeline-date">{m.date}</div>
                                            <div className="timeline-event">{m.event}</div>
                                        </div>
                                        <ChevronDown />
                                    </Accordion.Trigger>
                                </Accordion.Header>
                                <Accordion.Content className="timeline-content">
                                    <Separator.Root className="separator" />
                                    <p>{m.description}</p>
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </section>

                <section className="section-block">
                    <div className="section-title"><Users /> <h2>L'Équipe</h2></div>
                    <div className="team-grid">
                        {team.map((m, idx) => (
                            <div key={idx} className="team-card">
                                <div className={`avatar avatar-${m.color}`}>{m.initials}</div>
                                <span><strong>{m.name}</strong></span>
                                <p className="team-role">{m.icon} {m.role}</p>
                                <Separator.Root className="separator" />
                                <p className="team-desc">{m.responsibilities}</p>
                            </div>
                        ))}
                    </div>
                </section>


                <section className="contact-section">
                    <h2>Suivez Notre Aventure</h2>
                    <p>Restez connectés</p>
                    <div className="contact-links">
                        <a href="https://www.instagram.com/polyride_nantes/"><Instagram /> Instagram</a>
                        <a href="https://github.com/PolLamothe/PolyRide" target="_blank" rel="noopener noreferrer">
                            <img src={githubIcon} alt="GitHub" className="github-icon-img" /> GitHub
                        </a>
                    </div>
                </section>

            </div>

            <footer className="footer">PolyRide • Projet Gestion de Projet Écologique</footer>
        </div>
    );
}

export default About;
