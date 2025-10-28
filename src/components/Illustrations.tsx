// This file was previously a placeholder. Content has been added to resolve module import errors.
import React from 'react';
import { styled } from 'styled-components';

// A generic card for word illustrations
const WordIllustrationCardContainer = styled.div<{ $colors: string[] }>`
    width: 140px;
    height: 140px;
    border-radius: 12px;
    background: linear-gradient(135deg, ${props => props.$colors[0]} 0%, ${props => props.$colors[1]} 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);

    svg {
        width: 44px;
        height: 44px;
        margin-bottom: 0.5rem;
    }
`;

const WordIllustrationText = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
`;

interface WordIllustrationCardProps {
    text: string;
    colors: string[];
    icon: React.ReactNode;
}

export const WordIllustrationCard: React.FC<WordIllustrationCardProps> = ({ text, colors, icon }) => (
    <WordIllustrationCardContainer $colors={colors}>
        {icon}
        <WordIllustrationText>{text}</WordIllustrationText>
    </WordIllustrationCardContainer>
);

// Generic topic illustration
const TopicIllustrationContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        width: 80%;
        height: 80%;
    }
`;

// Placeholder Topic Illustrations
export const LearningTopicIllustration = () => <TopicIllustrationContainer><svg viewBox="0 0 100 100"><text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="12">Learning</text></svg></TopicIllustrationContainer>;
export const SportsTopicIllustration = () => <TopicIllustrationContainer><svg viewBox="0 0 100 100"><text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="12">Sports</text></svg></TopicIllustrationContainer>;
export const EnvironmentalTopicIllustration = () => <TopicIllustrationContainer><svg viewBox="0 0 100 100"><text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="12">Environment</text></svg></TopicIllustrationContainer>;
export const CityTopicIllustration = () => <TopicIllustrationContainer><svg viewBox="0 0 100 100"><text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="12">City</text></svg></TopicIllustrationContainer>;
export const EntertainmentTopicIllustration = () => <TopicIllustrationContainer><svg viewBox="0 0 100 100"><text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="12">Entertainment</text></svg></TopicIllustrationContainer>;
export const GeneralTopicIllustration = () => <TopicIllustrationContainer><svg viewBox="0 0 100 100"><text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="12">General</text></svg></TopicIllustrationContainer>;
export const WorkTopicIllustration = () => <TopicIllustrationContainer><svg viewBox="0 0 100 100"><text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="12">Work</text></svg></TopicIllustrationContainer>;
export const PracticeTopicIllustration = () => <TopicIllustrationContainer><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg></TopicIllustrationContainer>;

export const SkillsTopicIllustration = () => (
     <TopicIllustrationContainer>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
    </TopicIllustrationContainer>
);

// Placeholder Icon Components
export const PlayIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>;
export const BookIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" /></svg>;
export const BatteryIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 4h-3V2h-4v2H7v18h10V4z" /></svg>;
export const WeightIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 10h14v4H5z" /></svg>;
export const TangleIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c1.46 0 2.82-.39 4-1.07" /></svg>;
export const LeafIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V7h2v4h3v2h-3v4h-2z" /></svg>;

export const StretchIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6h-5.18l-3.23 4.29 2.59 2.59L21 6zM4.41 4.41L3 5.82 7.18 10H3v8h8v-4.18L15.18 21l1.41-1.41L4.41 4.41z" /></svg>;
export const KickIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4l-4 4h4zM8.41 4L3 9.41l1.41 1.41L10 5.82z" /></svg>;
export const ScoreIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm4-4H7V7h8v2z" /></svg>;
export const CatchIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>;
export const CrawlIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 11.5L4.5 10.25l7.5 3.33 7.5-3.33L12 13.5z" /></svg>;
export const HitIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6.83L17.17 4 14 7.17 16.83 10 20 6.83zM4 20.83L10.83 14 8 11.17 4 15.17V20.83z" /></svg>;
export const OpponentIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>;
export const RefereeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>;
export const TournamentIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" /></svg>;
export const MuscleIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17h18v-2H3v2zm0-5h18v-2H3v2zm0-5h18V5H3v2z" /></svg>;

export const HelmetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 3.58 8 8 8h4c4.42 0 8-3.58 8-8a10 10 0 0 0-10-10z"></path><path d="M17 12a5 5 0 1 1-10 0"></path></svg>;
export const RegularIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M7 14h.01"></path><path d="M12 14h.01"></path><path d="M17 14h.01"></path><path d="M7 18h.01"></path><path d="M12 18h.01"></path><path d="M17 18h.01"></path></svg>;
export const RoutineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h10"></path><path d="M6 12h12"></path><path d="M4 18h14"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path></svg>;
export const SelfDisciplineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;

export const RecycleIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" /></svg>;
export const PollutionIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>;
export const PlanetIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-9c-.83 0-1.5-.67-1.5-1.5S9.17 4.5 10 4.5s1.5.67 1.5 1.5S10.83 6.5 10 6.5zm5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></svg>;
export const SolarIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>;

export const BuildingIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>;
export const MetroIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>;
export const CrowdedIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>;
export const CommuteIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" /></svg>;

// New City Icons
export const InfrastructureIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v2h2v11h16V9h2V7L12 2zM8 18H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V8h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z" /></svg>;
export const SuburbIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm-2 15v-4h4v4H10z" /></svg>;
export const AvenueIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,22H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2H20a2,2,0,0,1,2,2V20A2,2,0,0,1,20,22ZM11,4v4h2V4Zm0,6v4h2V10Zm0,6v4h2V16Z"/></svg>;
export const CrossroadIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4h-2v5h-4V4H8v5H4v4h4v4H4v4h4v-5h4v5h4v-4h4v-4h-4z" /></svg>;
export const SquareIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" /></svg>;
export const CrosswalkIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18v-2H3v2zM3 13h18v-2H3v2zM3 5h18V3H3v2z" /></svg>;
export const TunnelIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 21H2v-2h20v2zM12 2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8s8 3.59 8 8h2c0-5.52-4.48-10-10-10z" /></svg>;
export const NightlifeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 7h-2.1l-6.9 9-2.1-3L21 5m-2.1-2.1c.6.6.6 1.5 0 2.1L17.5 8.4l-3-3L18.9 4c.6-.6 1.5-.6 2.1 0zM3 3v5.5L10.5 21h3L6.5 10.5l-3-3L3 3z"/></svg>;

// New Icons
export const PrivacyIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>;
export const CelebrityIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>;
export const FameIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zm-7 5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>;
export const DopamineIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z" /></svg>;
export const EndorphinIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 14.7l-2.1-2c-.5-.5-1.2-.5-1.7 0s-.5 1.2 0 1.7l3.5 3.5c.5.5 1.2.5 1.7 0L12 12V9c0-.6-.4-1-1-1s-1.2.1-1.2.1zM19 13c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" /></svg>;
export const ReleaseStressIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>;

export const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;

// New Work Icons
export const FirefighterIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 14H8v-2h2v2zm7-7h-1V5.5c0-.83-.67-1.5-1.5-1.5S13 4.67 13 5.5V7h-2V5.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5V7h-1v10h1v2H7v-2h1V7zm-7 5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/></svg>;
export const ConstructionIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6.4 6.4 9 1.6 4.2C.5 6.6.9 9.6 2.9 11.5c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.4-2.4c.4-.4.4-1.1 0-1.5z"/></svg>;
export const PromotionIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>;
export const EmployeeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
export const ColleagueIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;

// New Icons for Skills
export const OpinionIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>;
export const AgreeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
export const DisagreeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>;
export const PerspectiveIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>;
export const ExampleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h10"></path><path d="M6 12h12"></path><path d="M4 18h14"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path></svg>;
export const CompareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a12 12 0 0 0 0 24c0-5 4-9 4-9s4 4 4 9a12 12 0 0 0 0-24" /><path d="M12 3C4 3 4 9 4 9s4 4 4 9" /></svg>;
export const SuggestIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
export const FeelingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5-2 4-2 4 2 4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>;
export const ClarifyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
export const StructureIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>;