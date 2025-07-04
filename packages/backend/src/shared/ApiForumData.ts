// For both, _id is the mongoDB id, the string id is the id given from 
// unique react components

export interface IApiForumData {
  id: string;
  name: string;
  content: string;
  game: string;
  author:string;
  comments: IApiCommentData[]; // Loaded via join/query
}

export interface IApiCommentData {
  id: string;
  profile: string;
  content: string;
}

export const FORUMS = [
  {
    id: "forum-0", name: "The Game is mid.Overhyped. Am I the only one?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    comments: [{
      id: "commid-0",
      profile: "randomuser",
      content: "comment Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    }]
  }, {
    id: "forum-1", name: "Stuck on the first world. Also my switch runs warm on this game",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    comments: [{
      id: "commid-0",
      profile: "randomuser",
      content: "comment Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    }]
  }, {
    id: "forum-2", name: "audio glitches on the menu. anyone got the same issues?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    comments: [{
      id: "commid-0",
      profile: "randomuser",
      content: "comment Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    }]
  }
];
