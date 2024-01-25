type GoalDifficulty = 'easy' | 'medium' | 'hard' | 'theory';
type GoalState = 'To Do' | 'Doing' | 'Finished';
type GoalStateContext = 'New' | 'Redo';

export interface Goal {
  goal_name: string;
  goal_description: string;
  difficulty: GoalDifficulty;
  skill_points: number;
  atrophy_points: number;
  current_state: GoalState;
  current_goal_context: GoalStateContext;
  last_updated: Date;
}
