export type TeamSubmitForm = {
  name: string;
  leader: string;
  member: any;
  intern: any;
};

export type TeamType = {
  name: string;
  users: any;
};

export interface EditTeamProps {
  onClick: any;
  deleteTeam: any;
}

export interface TeamProps {
  team: TeamType;
  onClick: any;
}
