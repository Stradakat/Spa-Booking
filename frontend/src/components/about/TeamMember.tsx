import React from 'react';
import { User } from 'lucide-react';
import Card from '../common/Card';
import './TeamMember.css';

interface TeamMemberProps {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, specialty, bio }) => {
  return (
    <Card className="team-member">
      <div className="team-member__image">
        {/* Placeholder for now - in a real app, you'd use actual images */}
        <div className="team-member__image-placeholder">
          <User size={48} />
        </div>
      </div>
      
      <div className="team-member__content">
        <h3 className="team-member__name">{name}</h3>
        <h4 className="team-member__role">{role}</h4>
        <p className="team-member__specialty">{specialty}</p>
        <p className="team-member__bio">{bio}</p>
      </div>
    </Card>
  );
};

export default TeamMember;
